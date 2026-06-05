import { TEST_IDS as TOOLBAR_TEST_IDS } from '../../src/testIds';

/**
 * Test ids для stories и play-функций. Публичные id (которые компонент проксирует
 * через `data-test-id`) берутся из `src/testIds.ts`. Остальные — stories-level,
 * нужны для адресации обёрток и demo-контейнеров.
 */
export const TEST_IDS = {
  root: TOOLBAR_TEST_IDS.main,
  mobile: 'toolbar-mobile',
  adaptiveDesktop: 'toolbar-adaptive-desktop',
  adaptiveMobile: 'toolbar-adaptive-mobile',
  example: 'toolbar-example',
  mobileSelectionToggle: 'toolbar-mobile-selection-toggle',
} as const;
