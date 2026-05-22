// Scroll does not expose TEST_IDS in src — slot ids belong to consumers via spread.
// Single-component package: stories-level ids live here as the single source of truth.
export const TEST_IDS = {
  root: 'scroll',
} as const;
