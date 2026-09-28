import { TEST_IDS as COMPONENT_TEST_IDS } from '../src/constants';

/** Корневые id ставит story через `data-test-id`, id слотов — сами компоненты (src/constants.ts). */
export const TEST_IDS = {
  bagelChart: { root: 'bagel-chart', ...COMPONENT_TEST_IDS.bagelChart },
  pieChart: { root: 'pie-chart', ...COMPONENT_TEST_IDS.pieChart },
  heatMapChart: { root: 'heat-map-chart', ...COMPONENT_TEST_IDS.heatMapChart },
  interactiveChart: { root: 'interactive-chart', ...COMPONENT_TEST_IDS.interactiveChart },
} as const;
