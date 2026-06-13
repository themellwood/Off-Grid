// Pure, deterministic simulation engine. No UI, no globals.
// simulate(input) -> { meters, score, days, verdict, money }
import { CONFIG } from './config.js';
import { CATALOG_BY_ID } from './catalog.js';

const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));

// input = { site, household:{people, willingHours}, netWorth, placements:[objId,...] }
export function simulate(input) {
  const { site, household, netWorth } = input;
  const N = household.people;
  const willing = household.willingHours;

  // Count placed objects by id.
  const counts = {};
  for (const id of input.placements) counts[id] = (counts[id] || 0) + 1;
  const n = (id) => counts[id] || 0;
  const C = CONFIG;

  // --- Power ---
  const powerDemand = C.household.powerBaseKwhDay + C.household.powerPerPersonKwhDay * N;
  let powerSupply = 0;
  for (const id in counts) {
    const o = CATALOG_BY_ID[id];
    if (o.kw) powerSupply += counts[id] * o.kw * C.solar.kwhPerKwPerDayBase * site.sun;
  }
  const batteryKwh = sumProp(counts, 'storeKwh');

  // --- Water ---
  const roofM2 = sumProp(counts, 'roofM2');
  const catchment = roofM2 * (site.rainMm / 365) * C.water.runoffCoeff; // L/day
  const hasToilet = n('toilet') > 0;
  const waterDemand =
    C.household.waterPerPersonLDay * N * (hasToilet ? 1 - C.compostingToiletWaterReduction : 1);
  const tankL = sumProp(counts, 'storeL');

  // --- Food (servings/year) ---
  const foodNeed = C.household.foodServingsPerPersonYear * N;
  let foodSupply = 0;
  for (const id in counts) {
    const o = CATALOG_BY_ID[id];
    if (!o.foodBase) continue;
    const soilF = o.pasture || id === 'vege' ? site.soil : 1; // animals on pasture + crops use soil
    foodSupply += counts[id] * o.foodBase * soilF * site.season;
  }

  // --- Labour (hours/week) ---
  const labour = sumProp(counts, 'labour');

  // --- Money ---
  const buildCost = sumProp(counts, 'cost');
  const upkeep = sumProp(counts, 'upkeep');
  const budget = netWorth - site.landPrice - buildCost;

  // --- Ratios & status ---
  const powerR = ratio(powerSupply, powerDemand);
  const waterR = ratio(catchment, waterDemand);
  const foodR = ratio(foodSupply, foodNeed);

  const meters = {
    budget: {
      label: 'Budget',
      value: budget,
      detail: `Net worth − $${fmt(site.landPrice)} land − $${fmt(buildCost)} build`,
      status: budget >= 0 ? 'good' : 'bad',
      kind: 'money',
    },
    power: meter('Power', powerSupply, powerDemand, 'kWh/day', powerR),
    water: meter('Water', catchment, waterDemand, 'L/day', waterR),
    food: foodMeter(foodSupply, foodNeed, foodR),
    labour: {
      label: 'Labour',
      value: labour,
      target: willing,
      detail: `${round1(labour)} of ${willing} hrs/week you'll do`,
      status: labour <= willing ? 'good' : labour <= willing * 1.4 ? 'warn' : 'bad',
      kind: 'labour',
    },
  };

  // --- Autonomy Score (0-100) ---
  const w = C.score.weights;
  const afford = budget >= 0 ? 1 : 0;
  let score =
    100 * (w.power * clamp(powerR, 0, 1) + w.water * clamp(waterR, 0, 1) +
      w.food * clamp(foodR, 0, 1) + w.afford * afford);
  if (labour > willing) score *= C.score.overLabourPenalty;
  score = Math.round(clamp(score, 0, 100));

  // --- Days of independence (limited by the tightest resource) ---
  const powerDays = powerSupply >= powerDemand
    ? C.daysCap
    : batteryKwh / Math.max(0.1, powerDemand - powerSupply);
  const waterDays = catchment >= waterDemand ? C.daysCap : safeDiv(tankL, waterDemand);
  const foodDays = foodSupply >= foodNeed
    ? C.daysCap
    : C.foodPantryBaseDays * clamp(foodSupply / foodNeed, 0, 1) + C.foodPantryBaseDays / 2;
  const days = Math.min(C.daysCap, Math.floor(Math.min(powerDays, waterDays, foodDays)));

  return {
    meters,
    score,
    days,
    money: { budget, buildCost, upkeep, landPrice: site.landPrice },
    verdict: verdict({ counts, meters, score, days, N, site }),
  };
}

function sumProp(counts, prop) {
  let s = 0;
  for (const id in counts) {
    const o = CATALOG_BY_ID[id];
    if (o[prop]) s += counts[id] * o[prop];
  }
  return s;
}

const ratio = (s, d) => (d <= 0 ? (s > 0 ? Infinity : 0) : s / d);
const safeDiv = (a, b) => (b <= 0 ? 0 : a / b);

function statusFromRatio(r) {
  if (r >= 1) return 'good';
  if (r >= 0.6) return 'warn';
  return 'bad';
}

function meter(label, supply, demand, unit, r) {
  return {
    label, value: supply, demand, unit, ratio: r,
    detail: `${round1(supply)} / ${round1(demand)} ${unit}`,
    status: statusFromRatio(r),
    kind: 'ratio',
  };
}

function foodMeter(supply, need, r) {
  return {
    label: 'Food', value: supply, demand: need, ratio: r, unit: 'servings/yr',
    detail: `${Math.round(clamp(r, 0, 2) * 100)}% of your household fed`,
    status: statusFromRatio(r),
    kind: 'ratio',
  };
}

function verdict({ counts, meters, score, days, N, site }) {
  if (Object.keys(counts).length === 0)
    return `Start building your life on ${site.name}.`;
  if (!counts.cabin)
    return `You'll need somewhere to live — add a cabin to catch water and call it home.`;

  const gaps = [];
  if (meters.power.status !== 'good') gaps.push('power');
  if (meters.water.status !== 'good') gaps.push('water');
  if (meters.food.status !== 'good') gaps.push('food');
  if (meters.budget.status === 'bad') gaps.push("budget (you're over)");
  if (meters.labour.status === 'bad') gaps.push('labour (too much work)');

  if (score >= 85 && gaps.length === 0)
    return `You could genuinely live here — a family of ${N} powered, watered and fed on ${site.name}. 🌱`;
  if (gaps.length === 0)
    return `A solid, liveable setup on ${site.name}. Tighten the edges and you're there.`;
  const last = gaps.length > 1 ? `${gaps.slice(0, -1).join(', ')} and ${gaps.at(-1)}` : gaps[0];
  return `Close — but you're short on ${last}. You'd last about ${days === 365 ? '365+' : days} days fully cut off.`;
}

const round1 = (x) => Math.round(x * 10) / 10;
function fmt(x) {
  return Math.round(x).toLocaleString('en-NZ');
}
export { fmt };
