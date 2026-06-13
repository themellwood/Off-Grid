// Minimal deterministic tests for the sim engine. Run: node test/sim.test.mjs
import assert from 'node:assert';
import { simulate } from '../src/sim.js';
import { SITES } from '../src/sites.js';

let passed = 0;
const test = (name, fn) => { fn(); passed++; console.log('  ok -', name); };

const base = (placements) => ({
  site: SITES.nelson,
  household: { people: 4, willingHours: 12 },
  netWorth: 450000,
  placements,
});

test('empty design scores low and prompts to start', () => {
  const r = simulate(base([]));
  assert.strictEqual(r.score >= 0 && r.score <= 100, true);
  assert.match(r.verdict, /Start building/);
});

test('is deterministic', () => {
  const input = base(['cabin', 'solar', 'solar', 'tank', 'vege', 'vege', 'chickens']);
  assert.deepStrictEqual(simulate(input), simulate(input));
});

test('adding a cow raises food, drops budget, raises labour (the magic moment)', () => {
  const without = simulate(base(['cabin', 'vege']));
  const withCow = simulate(base(['cabin', 'vege', 'cow']));
  assert.ok(withCow.meters.food.value > without.meters.food.value, 'food up');
  assert.ok(withCow.meters.budget.value < without.meters.budget.value, 'budget down');
  assert.ok(withCow.meters.labour.value > without.meters.labour.value, 'labour up');
});

test('more solar raises power supply', () => {
  const one = simulate(base(['cabin', 'solar']));
  const three = simulate(base(['cabin', 'solar', 'solar', 'solar']));
  assert.ok(three.meters.power.value > one.meters.power.value);
});

test('composting loo reduces water demand', () => {
  const no = simulate(base(['cabin']));
  const yes = simulate(base(['cabin', 'toilet']));
  assert.ok(yes.meters.water.demand < no.meters.water.demand);
});

test('site matters: dry Otago has tighter water than wet Coromandel', () => {
  const otago = simulate({ ...base(['cabin']), site: SITES.central_otago });
  const coro = simulate({ ...base(['cabin']), site: SITES.coromandel });
  assert.ok(coro.meters.water.value > otago.meters.water.value, 'Coromandel catches more');
});

test('a well-built liveable design scores high', () => {
  const r = simulate(base([
    'cabin', 'toilet', 'solar', 'solar', 'battery', 'tank', 'tank',
    'vege', 'vege', 'vege', 'vege', 'chickens', 'cow',
  ]));
  assert.ok(r.score >= 70, `expected >=70, got ${r.score}`);
});

console.log(`\n${passed} tests passed.`);
