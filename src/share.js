// Generates a shareable PNG summarising the player's design.
import { fmt } from './sim.js';

export function buildShareCard({ site, household, result }) {
  const W = 1200, H = 630;
  const canvas = document.createElement('canvas');
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');

  // Background
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#10381f');
  g.addColorStop(1, '#1c5631');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Hills
  ctx.fillStyle = 'rgba(255,255,255,0.06)';
  ctx.beginPath();
  ctx.moveTo(0, 470);
  ctx.quadraticCurveTo(300, 380, 620, 460);
  ctx.quadraticCurveTo(900, 520, 1200, 430);
  ctx.lineTo(1200, H); ctx.lineTo(0, H); ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.textBaseline = 'top';

  ctx.font = '600 30px system-ui, sans-serif';
  ctx.fillStyle = '#9be7b4';
  ctx.fillText('OFF-GRID', 70, 64);

  ctx.font = '700 64px system-ui, sans-serif';
  ctx.fillStyle = '#fff';
  ctx.fillText(site.name, 70, 110);

  ctx.font = '400 30px system-ui, sans-serif';
  ctx.fillStyle = '#cfeeda';
  ctx.fillText(`A household of ${household.people} · $${fmt(household.netWorth)} to start`, 70, 188);

  // Big score ring
  const cx = 980, cy = 230, rad = 110;
  ctx.lineWidth = 22;
  ctx.strokeStyle = 'rgba(255,255,255,0.15)';
  ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.stroke();
  ctx.strokeStyle = scoreColour(result.score);
  ctx.beginPath();
  ctx.arc(cx, cy, rad, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * result.score) / 100);
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.font = '800 80px system-ui, sans-serif';
  ctx.fillText(String(result.score), cx, cy - 56);
  ctx.font = '500 24px system-ui, sans-serif';
  ctx.fillStyle = '#cfeeda';
  ctx.fillText('AUTONOMY', cx, cy + 40);
  ctx.textAlign = 'left';

  // Verdict
  ctx.font = '500 34px system-ui, sans-serif';
  ctx.fillStyle = '#ffffff';
  wrap(ctx, result.verdict, 70, 300, 760, 44);

  // Meter chips
  const chips = [
    ['Power', result.meters.power.status],
    ['Water', result.meters.water.status],
    ['Food', result.meters.food.status],
    ['Budget', result.meters.budget.status],
  ];
  let x = 70;
  const y = 500;
  ctx.font = '600 26px system-ui, sans-serif';
  for (const [label, status] of chips) {
    const w = ctx.measureText(label).width + 70;
    ctx.fillStyle = statusColour(status);
    roundRect(ctx, x, y, w, 56, 14); ctx.fill();
    ctx.fillStyle = '#0b2415';
    ctx.fillText(`${statusDot(status)} ${label}`, x + 18, y + 14);
    x += w + 16;
  }

  ctx.font = '500 26px system-ui, sans-serif';
  ctx.fillStyle = '#9be7b4';
  ctx.fillText(`${result.days === 365 ? '365+' : result.days} days fully cut off`, 70, 576);

  return canvas;
}

function scoreColour(s) {
  if (s >= 80) return '#3ddc84';
  if (s >= 55) return '#ffd166';
  return '#ff7b72';
}
function statusColour(s) {
  return s === 'good' ? '#9be7b4' : s === 'warn' ? '#ffe08a' : '#ffb3ad';
}
function statusDot(s) {
  return s === 'good' ? '●' : s === 'warn' ? '◐' : '○';
}
function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}
function wrap(ctx, text, x, y, maxW, lh) {
  const words = text.split(' ');
  let line = '';
  for (const word of words) {
    const test = line + word + ' ';
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, y);
      line = word + ' ';
      y += lh;
    } else line = test;
  }
  ctx.fillText(line.trim(), x, y);
}
