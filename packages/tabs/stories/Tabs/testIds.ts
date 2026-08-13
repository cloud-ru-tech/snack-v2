// Импорт из `src/constants`, а не из entry `@ds/tabs` — entry тащит SCSS-модули,
// что ломает playwright-compile при импорте этого файла в e2e helpers.
import { TEST_IDS as SRC_TEST_IDS } from '../../src/constants';

/**
 * Единый объект test-id для stories и e2e. Подмножество `src/constants::TEST_IDS`
 * расширено набором конкретных табов/панелей, используемых в Playground/Tests.
 */
export const TEST_IDS = {
  tabs: SRC_TEST_IDS.tabs,
  tabBar: SRC_TEST_IDS.tabBar,
  tab: {
    root: SRC_TEST_IDS.tab.root,
    overview: `${SRC_TEST_IDS.tab.root}-overview`,
    settings: `${SRC_TEST_IDS.tab.root}-settings`,
    billing: `${SRC_TEST_IDS.tab.root}-billing`,
  },
  actionButton: 'tabs-action-button',
  tabContent: {
    root: SRC_TEST_IDS.tabContent.root,
    overview: `${SRC_TEST_IDS.tabContent.root}-overview`,
    settings: `${SRC_TEST_IDS.tabContent.root}-settings`,
    billing: `${SRC_TEST_IDS.tabContent.root}-billing`,
  },
} as const;
