// Data-driven build catalog. Add objects here without touching the engine.
// Costs in NZD. labour in hours/week. Yields are interpreted by sim.js and
// scaled by the chosen site's sun/soil/season where relevant.
export const CATALOG = [
  {
    id: 'cabin', name: 'Cabin', icon: '🏡', cost: 90000, upkeep: 500, labour: 0.5,
    roofM2: 150,
    blurb: 'Somewhere to live. Its roof catches your rainwater.',
  },
  {
    id: 'solar', name: 'Solar 3kW', icon: '🔆', cost: 18000, upkeep: 100, labour: 0.1,
    kw: 3,
    blurb: 'Generates power. Loves sun, hates Southland winters.',
  },
  {
    id: 'battery', name: 'Battery 10kWh', icon: '🔋', cost: 11000, upkeep: 50, labour: 0.05,
    storeKwh: 10,
    blurb: 'Stores power for cloudy days and the evening.',
  },
  {
    id: 'tank', name: 'Rain tank 25kL', icon: '🛢️', cost: 6000, upkeep: 20, labour: 0.1,
    storeL: 25000,
    blurb: 'Buffers water through dry spells.',
  },
  {
    id: 'vege', name: 'Vege patch', icon: '🥕', cost: 1500, upkeep: 100, labour: 4,
    foodBase: 600,
    blurb: 'Grows food. Yield depends on your soil and season.',
  },
  {
    id: 'chickens', name: 'Chickens x6', icon: '🐔', cost: 800, upkeep: 300, labour: 2,
    foodBase: 300,
    blurb: 'Eggs. About 2 hens per person for self-sufficiency.',
  },
  {
    id: 'cow', name: 'Cow', icon: '🐄', cost: 2500, upkeep: 600, labour: 14,
    foodBase: 1500, pasture: true,
    blurb: 'Milk and meat — but a lot of daily work.',
  },
  {
    id: 'toilet', name: 'Composting loo', icon: '🚽', cost: 4000, upkeep: 40, labour: 0.3,
    cutsWater: true,
    blurb: 'Cuts household water use by about a quarter.',
  },
];

export const CATALOG_BY_ID = Object.fromEntries(CATALOG.map((o) => [o.id, o]));
