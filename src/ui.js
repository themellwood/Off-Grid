// App shell: onboarding, the build grid, live meters, and the share card.
import { SITES } from './sites.js';
import { CATALOG, CATALOG_BY_ID } from './catalog.js';
import { CONFIG } from './config.js';
import { simulate, fmt } from './sim.js';
import { buildShareCard } from './share.js';

const GRID_COLS = 8;
const GRID_ROWS = 6;
const CELLS = GRID_COLS * GRID_ROWS;

const state = {
  siteKey: null,
  netWorth: 450000,
  people: 4,
  willingHours: CONFIG.household.defaultWillingHours,
  cells: new Array(CELLS).fill(null), // each = objId or null
  tool: 'cabin', // selected palette item, or 'remove'
};

const el = (id) => document.getElementById(id);
const app = el('app');

// ---------- Onboarding ----------
function renderOnboarding() {
  app.innerHTML = `
    <div class="screen onboard">
      <h1>Off-Grid</h1>
      <p class="tag">Design the off-grid life you want — and find out if you could actually pull it off.</p>

      <label class="field">
        <span>What are you worth? <b id="nwLabel">$${fmt(state.netWorth)}</b></span>
        <input id="nw" type="range" min="100000" max="2000000" step="10000" value="${state.netWorth}">
      </label>

      <label class="field">
        <span>How many of you? <b id="ppLabel">${state.people}</b></span>
        <input id="pp" type="range" min="1" max="8" step="1" value="${state.people}">
      </label>

      <label class="field">
        <span>Hours a week you'll work the land <b id="whLabel">${state.willingHours}</b></span>
        <input id="wh" type="range" min="2" max="40" step="1" value="${state.willingHours}">
      </label>

      <h2>Pick your land</h2>
      <div class="sites">
        ${Object.entries(SITES).map(([k, s]) => `
          <button class="site-card" data-site="${k}">
            <div class="site-name">${s.name}</div>
            <div class="site-blurb">${s.blurb}</div>
            <div class="site-tags">${s.tags.map((t) => `<span>${t}</span>`).join('')}</div>
            <div class="site-price">Land ~ $${fmt(s.landPrice)}</div>
          </button>`).join('')}
      </div>
    </div>`;

  el('nw').oninput = (e) => { state.netWorth = +e.target.value; el('nwLabel').textContent = '$' + fmt(state.netWorth); };
  el('pp').oninput = (e) => { state.people = +e.target.value; el('ppLabel').textContent = state.people; };
  el('wh').oninput = (e) => { state.willingHours = +e.target.value; el('whLabel').textContent = state.willingHours; };
  for (const b of document.querySelectorAll('.site-card')) {
    b.onclick = () => { state.siteKey = b.dataset.site; renderGame(); };
  }
}

// ---------- Game ----------
function renderGame() {
  const site = SITES[state.siteKey];
  app.innerHTML = `
    <div class="screen game">
      <header class="topbar">
        <div>
          <div class="region">${site.name}</div>
          <div class="region-sub">${site.tags.join(' · ')}</div>
        </div>
        <div class="top-actions">
          <button id="restart" class="btn ghost">↺ New</button>
          <button id="share" class="btn">Share</button>
        </div>
      </header>

      <div id="meters" class="meters"></div>

      <div class="grid-wrap">
        <div id="grid" class="grid" style="grid-template-columns:repeat(${GRID_COLS},1fr)"></div>
      </div>

      <div id="verdict" class="verdict"></div>

      <div class="palette" id="palette">
        ${CATALOG.map((o) => `
          <button class="tool" data-tool="${o.id}" title="${o.blurb}">
            <span class="tool-icon">${o.icon}</span>
            <span class="tool-name">${o.name}</span>
            <span class="tool-cost">$${fmt(o.cost)}</span>
          </button>`).join('')}
        <button class="tool remove" data-tool="remove" title="Remove objects">
          <span class="tool-icon">🧹</span><span class="tool-name">Remove</span>
        </button>
      </div>
    </div>
    <div id="modal" class="modal hidden"></div>`;

  buildGrid();
  bindPalette();
  el('restart').onclick = () => renderOnboarding();
  el('share').onclick = openShare;
  selectTool(state.tool);
  refresh();
}

function buildGrid() {
  const grid = el('grid');
  grid.innerHTML = '';
  for (let i = 0; i < CELLS; i++) {
    const cell = document.createElement('button');
    cell.className = 'cell';
    cell.dataset.i = i;
    cell.onclick = () => onCell(i);
    grid.appendChild(cell);
  }
}

function bindPalette() {
  for (const b of document.querySelectorAll('.tool')) {
    b.onclick = () => selectTool(b.dataset.tool);
  }
}

function selectTool(tool) {
  state.tool = tool;
  for (const b of document.querySelectorAll('.tool')) {
    b.classList.toggle('active', b.dataset.tool === tool);
  }
}

function onCell(i) {
  if (state.tool === 'remove') {
    state.cells[i] = null;
  } else if (state.cells[i] === null) {
    state.cells[i] = state.tool;
  } else {
    state.cells[i] = null; // tap a full cell to clear it
  }
  refresh();
}

function placements() {
  return state.cells.filter(Boolean);
}

function refresh() {
  // paint grid
  const cells = document.querySelectorAll('.cell');
  state.cells.forEach((id, i) => {
    const c = cells[i];
    c.textContent = id ? CATALOG_BY_ID[id].icon : '';
    c.classList.toggle('filled', !!id);
  });

  const result = simulate({
    site: SITES[state.siteKey],
    household: { people: state.people, willingHours: state.willingHours },
    netWorth: state.netWorth,
    placements: placements(),
  });
  state.lastResult = result;
  renderMeters(result);
  renderVerdict(result);
}

function renderMeters(result) {
  const m = result.meters;
  const item = (key, big) => {
    const x = m[key];
    const pct = x.kind === 'ratio' ? Math.min(100, (x.ratio || 0) * 100)
      : x.kind === 'labour' ? Math.min(100, (x.value / Math.max(1, x.target)) * 100)
      : 100;
    const valText = x.kind === 'money'
      ? (x.value < 0 ? '-$' + fmt(-x.value) : '$' + fmt(x.value))
      : x.kind === 'labour' ? round1(x.value) + ' h'
      : Math.round(Math.min(200, (x.ratio || 0) * 100)) + '%';
    return `
      <div class="meter ${x.status} ${big ? 'big' : ''}">
        <div class="meter-top"><span class="meter-label">${x.label}</span><span class="meter-val">${valText}</span></div>
        <div class="bar"><div class="fill" style="width:${pct}%"></div></div>
        <div class="meter-detail">${x.detail}</div>
      </div>`;
  };
  el('meters').innerHTML =
    item('budget', true) + item('power') + item('water') + item('food') + item('labour');
}

function renderVerdict(result) {
  el('verdict').innerHTML = `
    <div class="score" data-s="${band(result.score)}">
      <div class="score-num">${result.score}</div>
      <div class="score-cap">autonomy</div>
    </div>
    <div class="verdict-text">
      <p>${result.verdict}</p>
      <p class="days">${result.days === 365 ? '365+' : result.days} days fully cut off</p>
    </div>`;
}

// ---------- Share ----------
function openShare() {
  const result = state.lastResult;
  const canvas = buildShareCard({
    site: SITES[state.siteKey],
    household: { people: state.people, netWorth: state.netWorth },
    result,
  });
  const url = canvas.toDataURL('image/png');
  const modal = el('modal');
  modal.classList.remove('hidden');
  modal.innerHTML = `
    <div class="card">
      <img src="${url}" alt="Your off-grid design">
      <div class="card-actions">
        <a class="btn" href="${url}" download="off-grid-${state.siteKey}.png">Download</a>
        <button class="btn ghost" id="closeModal">Close</button>
      </div>
    </div>`;
  modal.onclick = (e) => { if (e.target === modal || e.target.id === 'closeModal') modal.classList.add('hidden'); };
}

const round1 = (x) => Math.round(x * 10) / 10;
const band = (s) => (s >= 80 ? 'good' : s >= 55 ? 'warn' : 'bad');

renderOnboarding();
