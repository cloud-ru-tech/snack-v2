import { TEST_IDS as COMPONENT_TEST_IDS } from '../../src/constants';

export const TEST_IDS = {
  ...COMPONENT_TEST_IDS,
  /** Префикс id вкладки в stories: `${tabPrefix}-${value}`. */
  tabPrefix: 'section-basic-tab',
} as const;
