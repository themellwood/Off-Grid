// Preset site profiles (MVP stand-in for live S-map / NIWA data).
// sun:    relative solar factor (1.0 = NZ average)
// rainMm: annual rainfall (mm)
// soil:   relative growing/pasture quality (1.0 = average)
// season: relative growing-season length factor
// wind:   relative wind resource (unused in MVP meters, shown for flavour)
// landPrice: indicative parcel price for a small lifestyle block (NZD)
export const SITES = {
  nelson: {
    name: 'Nelson / Tasman',
    blurb: 'Sunny, good soil, reliable rain. NZ on easy mode.',
    sun: 1.15, rainMm: 970, soil: 1.1, season: 1.1, wind: 0.7,
    landPrice: 320000,
    tags: ['☀️ High sun', '🌱 Good soil', '🌧 Moderate rain'],
  },
  coromandel: {
    name: 'Coromandel',
    blurb: 'Warm and very wet, decent soil. Water is the easy part.',
    sun: 1.0, rainMm: 1800, soil: 1.0, season: 1.05, wind: 0.8,
    landPrice: 300000,
    tags: ['🌤 Good sun', '🌱 Decent soil', '🌧🌧 Very wet'],
  },
  central_otago: {
    name: 'Central Otago',
    blurb: 'Big sun, cold winters, dry and stony. Water will fight you.',
    sun: 1.2, rainMm: 450, soil: 0.7, season: 0.8, wind: 0.9,
    landPrice: 240000,
    tags: ['☀️ High sun', '🪨 Stony soil', '🏜 Dry'],
  },
  waikato: {
    name: 'Waikato',
    blurb: 'Lush, temperate, superb pasture. Animals thrive here.',
    sun: 0.95, rainMm: 1200, soil: 1.25, season: 1.1, wind: 0.6,
    landPrice: 360000,
    tags: ['🌤 Fair sun', '🌱🌱 Great soil', '🌧 Reliable rain'],
  },
};
