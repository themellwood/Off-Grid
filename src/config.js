// Simulation coefficients. All game-balance knobs live here so the model is
// easy to tune. Figures are indicative for feel, not engineering advice.
export const CONFIG = {
  household: {
    powerBaseKwhDay: 10, // fixed household load
    powerPerPersonKwhDay: 3, // + per person  (N=4 -> 22 kWh/day, ~ NZ avg)
    waterPerPersonLDay: 110, // rainwater-frugal household
    foodServingsPerPersonYear: 1095, // 3 servings/day
    defaultWillingHours: 12, // hours/week of work the player will tolerate
  },
  solar: {
    kwhPerKwPerDayBase: 4.2, // at site sun factor 1.0
  },
  water: {
    runoffCoeff: 0.85, // metal roof
  },
  compostingToiletWaterReduction: 0.25, // toilets are a big share of water use
  score: {
    weights: { power: 0.3, water: 0.3, food: 0.3, afford: 0.1 },
    overLabourPenalty: 0.9, // multiply score if design demands too much work
  },
  daysCap: 365, // "365+" means effectively self-sustaining
  foodPantryBaseDays: 14, // assumed stored food before a fresh harvest
};
