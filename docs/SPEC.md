# Off-Grid — Game Design & Build Specification

> A cozy, real-data homestead-design sandbox. You enter your net worth and
> household, pick a real piece of New Zealand land, and design the off-grid
> life you want within your budget — placing solar panels, water tanks, a
> vege patch, a cow — while live meters show whether your design actually
> powers, waters, and feeds your household on *that specific* land.

**Status:** Concept spec, pre-build. This document is the source of truth for
the first build.
**Working title:** _Off-Grid_ (placeholders: _Homestead_, _Could I Live Here?_, _Lifeblock_)
**Last updated:** 2026-06-13

---

## 1. The one-paragraph pitch

FarmVille meets a real off-grid feasibility engine. The player designs a
self-sufficient property as a creative sandbox — dragging on solar arrays,
rain tanks, gardens, and animals — but unlike FarmVille, every object's
yield is driven by **real New Zealand soil, sun, and rainfall data for the
land they chose**. The fun is *exploration and expression* ("what would my
dream life look like, and could I afford it?"), and underneath the charm the
game quietly teaches people what off-grid living genuinely costs and
demands. It monetises the dream even for the ~95% who will never actually
leap, via high-intent lead-gen to solar installers and cabin builders.

---

## 2. Who it's for & the emotional job

**Primary audience: the "resilience-curious."** Suburban and lifestyle-block
people — often time-poor and money-richer — who feel the pull toward
self-sufficiency (driven by AI/job anxiety, geopolitical and climate shocks,
cost of living) but are nowhere near selling the house and buying a block.
They want **agency without commitment**: to explore the fantasy, collect a
sense of competence, and try the life in low-risk doses.

**The job this product is hired for:** _"Let me imagine and play with the
off-grid life that's been living in my head — make it personal, make it
feel real, and let me find out if it's actually possible for someone like
me."_ This is the **dream-space** job: high emotion, low friction, highly
shareable, and monetisable whether or not the player ever acts on it.

**Secondary audience: the global dreamer.** "Live off-grid on a New Zealand
island" is a *globally* aspirational fantasy. The NZ-accurate engine is the
moat; the NZ setting is also the draw. The listings/leap funnel is NZ-bound,
but the *play* has worldwide appeal.

---

## 3. Market context & why now

- **Off-grid housing market:** ~USD 2.6B (2024) → ~USD 5.1B (2033), ~7.9%
  CAGR. Real but modest; hardware buyers are price-sensitive. The bigger,
  less-served market is the *resilience-curious majority*, not the hardcore.
- **NZ connectivity unlocked:** Starlink went 12k → 37k → 58k NZ users in
  three years, removing the single biggest blocker (rural internet) to
  living remotely.
- **Cultural fit:** NZ has the DIY ("number 8 wire") culture, mainstream
  lifestyle blocks, abundant remote land, and recent lived experience of
  resilience (Cyclone Gabrielle, 2023 Auckland floods).
- **The moat:** NZ-specific soil/climate/solar data is freely available but
  fiddly to integrate. No global game/SaaS will bother building it for New
  Zealand. That's the defensible wedge.

(Sources collected in §18.)

---

## 4. Design pillars

1. **Exploration over optimisation.** It's a sandbox to express the life you
   want, not a puzzle with one right answer. No lose screen in the core mode.
2. **Real land, real consequences.** The same cow yields differently on
   Waikato pasture vs an Otago slope. Location *is* the strategy. The realism
   is invisible — the player just feels that choices matter.
3. **Teach by doing, never by lecturing.** Players discover trade-offs
   ("adding a cow needs pasture + water + daily work") by watching meters
   move, not by reading tips.
4. **Cozy, not doomy.** Warm, wholesome, Stardew-charming. This is the
   antidote to anxiety, not a survival simulator.
5. **Personal stakes.** Your net worth, your household size, your dream.
   Personalisation is the emotional engine.
6. **Shareable by design.** Every session can produce a share-card. Virality
   is a feature, not an afterthought.

---

## 5. Core gameplay loop

1. **Set up your life** — enter net worth (→ budget) and household size (→ N
   people to support). Optionally pick a "lifestyle vibe" that seeds presets.
2. **Choose your land** — pick a real region/property (see §11 for how, given
   the TradeMe constraint). The game loads that location's soil, sun, and
   rainfall.
3. **Build** — drag objects (solar, tanks, gardens, animals, buildings) onto
   the land. Each costs **money**, takes **space**, adds ongoing
   **labour**, and produces/consumes **power / water / food**.
4. **Watch the meters react** — Budget, Power, Water, Food, and Labour update
   live. Surpluses and shortfalls are visible and intuitive (green/amber/red).
5. **Iterate & explore** — experiment freely, undo, try combinations, chase
   the balance and the look you want.
6. **Reach "your" equilibrium** — when the design supports your household the
   way you want it to, you've "designed your life." Generate a share-card,
   save it, or push into the leap funnel (real quotes / "make it real").

The minimum magic moment to nail first: **drag a cow onto a paddock and feel
the Food meter rise while the Budget drops and the Labour meter climbs** — on
*your* real land. If that single interaction sparks joy, the game works.

---

## 6. Game modes

- **Sandbox (default).** Free play, no fail state. Real budget acts as a soft
  constraint you can toggle to "unlimited" for pure dreaming.
- **Challenge.** Fixed constraints and a goal, e.g. _"$300k total, feed a
  family of 4, achieve power + water self-sufficiency."_ Generates a score.
- **Scenario / "what if".** Stress tests: _"The grid is down for a year,"_
  _"a one-in-twenty-year drought,"_ _"no outside income."_ Teaches resilience
  by simulating shocks against the player's design.
- **Daily / weekly seed.** A shared random property + budget everyone plays
  and compares (leaderboard + share-cards). Strong retention + virality hook.

---

## 7. Resource systems

The simulation balances **five live resources** plus time.

| Resource | What it represents | Sources (+) | Sinks (−) |
|---|---|---|---|
| **Money** | Net worth budget (one-off capital) + ongoing $/yr | starting net worth; produce/surplus sales (optional) | land price; object purchase; upkeep $/yr |
| **Power** | kWh/day generation vs demand | solar, wind, hydro, generator | household demand; appliances; some objects (pumps) |
| **Water** | litres/day catchment & storage vs use | rain catchment, bore | household use; irrigation; animal drinking |
| **Food** | % of household nutrition produced | gardens, orchard, animals, aquaponics | household need (scales with N) |
| **Labour** | hours/week the design demands | — | every object has an upkeep-labour cost |

**Space** is the placement constraint (land area, contour, aspect). **Time**
shows up as **seasons** (yields and demand shift through the year) and
optionally a fast-forward "live a year" mode that surfaces winter power
shortfalls and summer water stress — the real off-grid pain points.

**The clever third axis — Labour.** Beyond money and space, every object
costs *time*. A cow is cheap to buy but heavy on daily work; a solar array is
expensive but near-zero labour. The Labour meter (vs a "how many hours/week do
you actually want to work?" slider set at onboarding) forces the real
homesteader's dilemma and teaches a genuine truth. (Cf. RNZ, _"Ten hours of
mahi a week — can you handle off-grid life?"_)

---

## 8. The build catalog

Each object shares a common stat schema, so the catalog is data-driven and
easy to extend.

### 8.1 Object stat schema

```
{
  id, name, category, icon,
  cost_nzd,                 // one-off capital
  upkeep_nzd_per_year,      // ongoing money
  footprint_m2,             // space used
  labour_hours_per_week,    // time cost
  yields: {                 // per-day or per-year, sign = produce/consume
    power_kwh_day,
    water_litres_day,
    food_servings_year,     // abstracted nutrition unit
  },
  requires: [ ... ],        // dependencies (e.g. cow requires pasture+water)
  site_modifiers: [ ... ],  // which real-data layers scale its yield
  placement_rules: { ... }, // slope, aspect, near-water, min area
}
```

### 8.2 Catalog (starter — go wide later)

**Energy**
- Solar array (per kW) — site_modifier: solar irradiance, aspect, shading
- Battery bank (per kWh) — storage, no generation
- Wind turbine (small) — site_modifier: average wind speed, exposure
- Micro-hydro — requires: stream/flowing water on parcel
- Wood stove / range — heat + cooking; consumes firewood (→ woodlot)
- Backup generator — power on demand, consumes fuel ($ + emissions stat)

**Water**
- Rain tank (per size band) — site_modifier: rainfall; requires roof catchment
- Roof catchment (auto from buildings) — feeds tanks
- Bore / well — requires: groundwater availability layer
- Greywater system — recovers % of household water
- Irrigation — moves water to gardens (power + water cost)

**Food — plants**
- Vege patch (per plot) — site_modifier: soil quality, growing season
- Polytunnel / greenhouse — extends season, boosts yield, costs more
- Orchard (fruit trees) — slow to mature (time mechanic)
- Berry patch
- Grain / staple plot
- Woodlot — fuel for wood stove; long maturity

**Food — animals**
- Chickens (per N hens) — eggs; ~2 hens/person for egg self-sufficiency
- Cow — milk + meat; requires pasture + water + high labour
- Sheep / goats — meat/milk/fibre; graze marginal land
- Pigs — meat; eat scraps
- Bees — honey + pollination boost to gardens
- Aquaponics / fish — food + integrates with water/power

**Living & infrastructure**
- Cabin / house (per size) — shelter; defines roof catchment + power demand
- Composting toilet / septic — sanitation; affects water use
- Root cellar / storage — reduces food spoilage (boosts effective yield)
- Starlink dish — comms; small power draw; the "you can live here now" enabler
- Driveway / access, fencing — enabling infrastructure

Every catalog entry should expose a **"Get a real quote"** affordance (see
§17 monetisation) — placing a solar array is a high-intent signal.

---

## 9. The simulation model

Keep it **simple, defensible, and tunable**. The goal is "surprisingly
realistic *feel*," not engineering-grade accuracy. Ship with a visible
disclaimer ("a fun estimate, not engineering advice"). All coefficients live
in a config file for easy balancing.

### 9.1 Power
- **Demand:** baseline ≈ household demand. NZ average home ≈ **22 kWh/day**;
  scale roughly with N and appliance choices. Off-grid players will tune
  down (efficiency) — expose a demand slider.
- **Solar generation:** `kWh/day = array_kW × site_sun_factor × season_factor`.
  Anchor: a 10 kW off-grid array in Christchurch ≈ **20.6 kWh/day on a clear
  winter day** — i.e. solar *barely* covers an average home in winter with no
  margin. Model winter shortfall explicitly; it's the key teaching moment.
- **Battery:** sized in kWh of storage; determines days of autonomy through
  cloudy spells. Cost ≈ **$800–1,250/kWh**.
- **Reality bite:** most off-grid homes still burn **80–150 L of fuel per
  winter** topping up during multi-day storms. Surface this as a "winter
  resilience" stat rather than pretending solar alone is enough.

### 9.2 Water
- **Catchment formula:** `litres = roof_area_m² × rainfall_mm × runoff_coeff`.
  1 mm on 1 m² = 1 L. Metal roof runoff coeff ≈ **0.85–0.90**.
- **Demand:** rainwater-frugal households run **~110–140 L/person/day**
  (vs ~200+ on mains). Scale with N; expose an efficiency slider.
- **Storage:** tank sizing rule of thumb = **2–4 weeks** of household use as a
  starting point; more in dry-summer regions. Model summer dry-spell risk.

### 9.3 Food
- **Household need:** abstract to "servings/year" scaled by N.
- **Garden yield:** `servings = area_m² × soil_quality_factor × season_factor`.
  Anchors: **~50–60 m²/person** for vegetable self-sufficiency (excl.
  potatoes); a fuller staple+veg self-sufficiency pushes toward **~370
  m²/person** (ambitious). A small **9–19 m²** plot gives variety, not
  sufficiency. Polytunnel multiplies yield and extends season.
- **Animals:** chickens ≈ **2 hens/person** for eggs (~5 eggs/hen/week). Cow,
  sheep, pigs convert pasture/scraps to milk/meat servings with high labour.
- **Storage:** root cellar / preserving reduces spoilage → higher *effective*
  self-sufficiency %.

### 9.4 Labour
- Sum `labour_hours_per_week` across placed objects; compare to the player's
  "willing hours" slider. Animals and gardens are heavy; solar/water are
  light. Over-budget labour flags amber/red.

### 9.5 Money
- `remaining = net_worth − land_price − Σ object_cost`.
- Ongoing: `annual_balance = Σ upkeep − optional_surplus_sales`.
- Surface both "can you afford to *build* it" and "can you afford to *run*
  it."

### 9.6 Worked example (illustrative)
> Family of 4, $400k net worth, a 5 ha block in sunny Nelson (high sun, good
> soil, moderate rainfall) listed at $320k → **$80k build budget**. Player
> adds: 8 kW solar + 20 kWh battery (~$45k off-grid-rated), 30,000 L tanks
> (~$8k), 240 m² gardens + polytunnel (~$10k), 8 hens (~$1k), composting
> toilet (~$5k). Meters: Power green in summer / amber in winter (suggests
> generator or more battery); Water green; Food ~70% (no staples/meat yet);
> Labour ~12 hrs/wk; Budget: ~$11k left. Verdict card: _"You could live here —
> power-tight in winter, well-fed in summer, ~12 hrs of work a week."_

---

## 10. Real-data integration (the moat)

Each real-world layer **modifies object yields** for the chosen location.

| Layer | Source | Drives |
|---|---|---|
| **Soil** (type, depth, water-holding, clay) | Manaaki Whenua **S-map / LRIS Portal**, Fundamental Soil Layer via Web Map Services (WMS/WFS) — free | Garden & pasture yield; what grows |
| **Solar** (site irradiance incl. terrain/shading) | NIWA **SolarView** | Solar array generation |
| **Climate** (rainfall, solar radiation, wind, temp, soil moisture; ~5 km grid) | NIWA **Virtual Climate Station Network (VCSN)** | Water catchment, wind, growing season, heating |
| **Solar fallback** (if NIWA licensing is a blocker) | **NASA POWER**, **Global Solar Atlas** — free, global | Solar (and enables non-NZ expansion later) |
| **Parcels / land valuation** (open) | **LINZ** Data Service | Land area, contour; valuation as a listings fallback |

**Implementation note:** for the MVP, the data layer can be **stubbed with
regional presets** (e.g. "Nelson = high sun / good soil / moderate rain") to
get the loop feeling good fast, then swapped for live S-map/NIWA queries for
depth. The architecture should treat "site profile" as an interface with two
implementations: `PresetSiteProvider` and `LiveDataSiteProvider`.

### The TradeMe constraint (important)
TradeMe's API terms **exclude "buyer-side tools"** and price monitoring, and
property-listing access is restricted to registered agents; scraping breaches
their ToS. **Do not architect around live TradeMe listings.** Instead:
- **v1:** let the player **pick a region** or **manually enter a property**
  (price + location, or paste a listing's address/coords). Keeps all the
  magic, dodges the legal wall, ships faster.
- **Later:** formal partnership with a property portal, or use **open LINZ**
  parcel/valuation data, or an agent-side integration.

---

## 11. Gamification & progression

- **Autonomy Score** — a single headline number (0–100) blending power,
  water, food self-sufficiency, affordability, and labour realism. The
  shareable hook.
- **"Days of independence"** — how long the household could last fully cut
  off (limited by the tightest resource). Visceral and viral.
- **Per-resource badges** — Power-Independent, Water-Secure, Food-90%,
  Debt-Free, Low-Labour.
- **Milestones / achievements** — "First cow," "Off the grid," "Survived the
  winter scenario," "Fed a family of 6," "Under 10 hrs/week."
- **Challenge leaderboards** — for the daily/weekly seed and challenge mode.
- **Seasons & "live a year"** — fast-forward surfaces winter power dips and
  summer water stress; surviving a simulated year is a progression beat.
- **Unlockables** — start with core objects; unlock advanced ones
  (micro-hydro, aquaponics, polytunnel) via play or milestones, to pace
  exploration.
- **Share-cards** — auto-generated image: the homestead snapshot + headline
  verdict + Autonomy Score + region. _"I could go off-grid in the Coromandel
  for $340k and feed a family of 4 🌱"_ / _"...I'd last 6 days, lol."_

---

## 12. Onboarding flow

1. **Hook screen:** "Could you actually live off-grid? Let's design it."
2. **Your life:** net worth (slider/input), household size, "how many hours a
   week do you want to work?" (sets Labour target), optional lifestyle vibe.
3. **Your land:** pick a region (map) or enter a property. Show the land's
   sun/soil/rain profile as an evocative summary ("Sunny. Good soil. Reliable
   rain.").
4. **First build (guided):** prompt to place one solar, one tank, one garden —
   teach the meters in 60 seconds.
5. **Free play.** CTA to share or "make it real" whenever they hit a
   satisfying state.

Keep time-to-first-meter-movement **under 60 seconds**.

---

## 13. Screens / UX

- **Build screen (primary):** land canvas (top-down/light isometric) + object
  palette + the five live meters as a persistent HUD + budget readout.
- **Site profile panel:** sun/soil/rain/wind for the chosen land.
- **Object inspector:** stats, yield on *this* site, "get a real quote."
- **Season/year timeline:** scrub through the year; see meters shift.
- **Verdict / share screen:** Autonomy Score, breakdown, share-card export.
- **Onboarding & mode select.**

---

## 14. Art direction & feel

Cozy, warm, wholesome — Stardew Valley / Two Point charm. Soft palette,
day-night, visible seasons. Tiles/icons over photorealism (cheaper, scales,
on-brand). The reward is watching *your* dream homestead fill in and come
alive. Avoid camo/prepper/survivalist aesthetics entirely — this is the
calm, hopeful end of the spectrum.

**MVP art:** clean flat tiles/icons on a simple grid. Charm can come later;
the loop must be fun before it's pretty.

---

## 15. Virality

- Share-cards (above) as the primary growth loop.
- Daily/weekly shared-seed leaderboard ("everyone designs the same block").
- "Most off-grid-viable regions in NZ" auto-generated content/PR reports
  (the engine produces these for free → SEO + media).
- Compare-with-a-friend / challenge-a-friend links.

---

## 16. Monetisation

Designed to earn **even from the ~95% who never leave the couch**.

1. **High-intent lead-gen (primary).** Placing a solar array / cabin / tank /
   Starlink is a qualified-buyer signal. "Get a real quote" routes leads to
   solar installers, tiny-home/cabin builders, tank suppliers, Starlink
   resellers — who pay real money for warm leads. Validate partner
   willingness early (this is the economic engine).
2. **Premium "make it real."** Turn the in-game design into a real buildable
   plan: itemised costs, real quotes, a staged 1/3/5-year roadmap ("someday
   plan"). One-off or subscription.
3. **Brand sponsorship.** Solar/battery/Starlink brands sponsor in-game
   objects/regions (clearly labelled).
4. **Content engine.** Free traffic from the auto-generated regional reports
   feeds the funnel.
5. **(Later) Property/affiliate.** Once a portal partnership or LINZ-based
   listings exist, affiliate on real land.

**Reality check:** dreamers convert poorly to direct payment; the lead-gen
model is what makes the economics work, so de-risk it first.

---

## 17. Tech architecture (recommended)

- **Client:** web app (mobile-first, runs in a browser — lowest friction for a
  viral toy). Canvas/WebGL for the build grid (e.g. PixiJS / Phaser for a
  game feel, or a lightweight DOM/SVG grid for the MVP).
- **Sim engine:** pure, deterministic, framework-agnostic TypeScript module
  (`/sim`) — takes `{ siteProfile, household, placedObjects, config }` →
  `{ meters, score, breakdown }`. Fully unit-testable, no UI coupling. All
  coefficients in a `config.ts` for balancing.
- **Catalog:** data-driven JSON/TS (`/catalog`) per §8.1 — content, not code.
- **Site data:** `SiteProvider` interface with `PresetSiteProvider` (MVP) and
  `LiveDataSiteProvider` (S-map/NIWA/NASA POWER) implementations.
- **Backend (minimal for MVP):** static-hostable; add a thin API only when
  live data caching, lead capture, and saved designs are needed.
- **Share-cards:** server-side or canvas image generation (Open Graph image).
- **Analytics:** event funnel from first-meter-move → share → quote-click.

---

## 18. Data sources & references

- Off-grid housing market size/CAGR — SkyQuest market report.
- NZ Starlink growth (12k→37k→58k) — NZ Herald.
- TradeMe API terms (buyer-side / agent restrictions) —
  developer.trademe.co.nz/terms-and-conditions.
- Soil — Manaaki Whenua **S-map Online / LRIS Portal**, Web Map Services
  (soils.landcareresearch.co.nz, maps.scinfo.org.nz).
- Solar — NIWA **SolarView**; fallback **NASA POWER**, **Global Solar Atlas**.
- Climate (rain/wind/radiation/soil moisture) — NIWA **Virtual Climate
  Station Network**.
- Parcels/valuation — **LINZ Data Service**.
- Power figures (22 kWh/day avg home; off-grid 3–4× grid-tied; 10 kW ≈ 20.6
  kWh/day CHC winter; 80–150 L fuel/winter) — solarscout.co.nz,
  mysolarquotes.co.nz, EECA.
- Battery $800–1,250/kWh — mysolarquotes.co.nz survey.
- Rainwater formula & runoff coeff; 110–140 L/person/day; 2–4 wk tank —
  rainwater-harvesting references.
- Garden 50–60 m²/person (veg), ~370 m²/person (full); 2 hens/person —
  self-sufficiency gardening references.
- Labour framing — RNZ, _"Ten hours of mahi a week — can you handle off-grid
  life?"_

> Note: figures are indicative for game-balance, not engineering use. Verify
> and version coefficients in `config.ts`; show a disclaimer in-product.

---

## 19. MVP scope (Phase 0)

Deliberately tiny and "ugly-but-magical." The bar to clear: **dropping a cow
on your land and feeling Food rise, Budget drop, and Labour climb.**

- Simple grid canvas (flat tiles/icons; no fancy isometric art).
- **~6–8 objects:** solar array, battery, rain tank, vege patch, chickens,
  cow, cabin, composting toilet.
- **Four meters:** Budget, Power, Water, Food (Labour can be Phase 1).
- **Onboarding:** net worth, household size, pick **one** of ~4 preset
  regions (preset site profiles — no live data yet).
- **Deterministic sim engine** with config coefficients + unit tests.
- **Verdict + share-card** (Autonomy Score + headline).
- Web, mobile-first, statically hostable.

**Explicitly out of MVP:** live S-map/NIWA data, TradeMe/any live listings,
seasons/“live a year,” labour meter, scenarios, leaderboards, monetisation
plumbing, polished art.

## 20. Roadmap (post-MVP)

- **Phase 1:** Labour meter + hours slider; seasons + "live a year"; more
  catalog; better art; share-card polish.
- **Phase 2:** Live data (`LiveDataSiteProvider`: S-map + NIWA/NASA POWER);
  manual property entry (price + location); challenge & scenario modes.
- **Phase 3:** Lead-gen plumbing ("get a real quote") + partner pilots;
  premium "make it real" plan export; auto-generated regional content.
- **Phase 4:** Accounts/saved designs; daily-seed leaderboard; portal/LINZ
  listings; international expansion (swap site-data layer).

---

## 21. Success metrics

- **Activation:** % who reach first-meter-movement (< 60s); % who place ≥ 5
  objects.
- **Aha:** % who reach a "balanced" design; median session length.
- **Virality:** share-card generation rate; K-factor from share links.
- **Retention:** daily-seed return rate.
- **Revenue (later):** quote-click rate per session; lead → installer
  conversion; premium attach rate.

## 22. Risks & open questions

- **Engine credibility** is make-or-break: realistic enough to feel true,
  simple enough to ship. Risk of over-engineering *or* feeling like a toy.
  → Tunable config + playtesting; lead with "fun estimate" framing.
- **Dreamer conversion is low.** → Lean on lead-gen, which earns from
  non-leapers; validate installer willingness-to-pay *before* heavy build.
- **TradeMe / listings legal wall.** → Manual entry + LINZ; never scrape.
- **NIWA data licensing** for commercial use may have cost. → NASA POWER /
  Global Solar Atlas fallback.
- **Scope creep** (a builder game balloons fast). → Hard MVP boundary above.
- **Liability** from people taking numbers as advice. → Prominent disclaimer.
- **Open questions:** Is NZ-only enough to start, or design the data layer for
  international from day one? Native game-feel (Phaser/Pixi) vs DOM grid for
  MVP? Is "Autonomy Score" or "Days of independence" the stronger share hook
  (A/B test)?
