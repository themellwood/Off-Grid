# Off-Grid

A cozy, real-data homestead-design sandbox. Enter your net worth and
household, pick a real piece of New Zealand land, and design the off-grid
life you want within your budget — placing solar panels, water tanks, a vege
patch, a cow — while live meters show whether your design actually powers,
waters, and feeds your household on *that specific* land.

FarmVille meets a real off-grid feasibility engine, aimed at the
**resilience-curious**: people drawn to self-sufficiency who want to explore
the dream before committing to it.

## Playable MVP

A working Phase 0 prototype is in this repo. Pick a region, drop objects on
your land, and watch the live meters (Budget, Power, Water, Food, Labour)
react — then generate a share-card with your Autonomy Score.

```bash
# Serve from the repo root (ES modules need http, not file://)
python3 -m http.server 8000
# then open http://localhost:8000
```

Run the engine tests:

```bash
node test/sim.test.mjs
```

### Layout
- `index.html`, `styles.css` — app shell
- `src/sim.js` — pure, deterministic simulation engine (unit-tested)
- `src/config.js` — all balance coefficients
- `src/sites.js` — preset NZ region profiles (MVP stand-in for live data)
- `src/catalog.js` — data-driven build objects
- `src/ui.js` — onboarding, build grid, meters
- `src/share.js` — canvas share-card
- `test/sim.test.mjs` — engine tests

## Documents

- [**docs/SPEC.md**](docs/SPEC.md) — full game design & build specification
  (concept, gameplay, gamification, simulation model, real-data sources, MVP
  scope, roadmap, monetisation, risks).

## Status

Phase 0 MVP playable (preset regions, click-to-place, share-card). Next per
the spec: the Labour-vs-willing-hours tuning, seasons / "live a year", and
swapping preset site data for live S-map/NIWA queries.
