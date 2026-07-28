/** id глобального хост-контейнера single-spa, по которому PageServices считает высоту */
export const GLOBAL_CONTAINER_ID = 'single-spa-wrapper';

/** Варианты основной кнопки футера PageForm. Лейбл резолвится через locale `PageForm.<variant>`. */
export const BUTTON_PRIMARY_VARIANT = {
  Continue: 'continue',
  Create: 'create',
  Save: 'save',
  Rent: 'rent',
  Send: 'send',
  Restore: 'restore',
  Add: 'add',
} as const;

/** Варианты вторичной кнопки футера PageForm. */
export const BUTTON_SECONDARY_VARIANT = {
  Cancel: 'cancel',
  Back: 'back',
} as const;

/**
 * Режим отображения меню TreeNavigation.
 * `fixed` соответствует Figma-состоянию `treeMenu=fixed` (постоянно раскрытый aside).
 */
export const TREE_NAVIGATION_MODE = {
  Popover: 'popover',
  Aside: 'aside',
  Fixed: 'fixed',
} as const;

/** Тип элемента сайдбара с вложенностью. */
export const SIDEBAR_ITEM_TYPE = {
  Collapse: 'collapse',
  Group: 'group',
} as const;

/** Тип шапки сайдбара. */
export const SIDEBAR_HEADER_TYPE = {
  Title: 'title',
  Back: 'back',
} as const;

/** data-test-id mobile-триггеров, которые компонент ставит сам (публичны для stories и e2e). */
export const TEST_IDS = {
  mobileActions: { root: 'page-layout__mobile-actions', trigger: 'page-layout__mobile-actions-trigger' },
  sidebarSelect: { trigger: 'page-layout__sidebar-select-trigger' },
  sidebarSearch: { trigger: 'page-layout__sidebar-search-trigger' },
  sidebarToggle: {
    collapse: 'page-layout__sidebar-collapse',
    expand: 'page-layout__sidebar-expand',
  },
  pageForm: {
    priceSummaryTrigger: 'page-form__price-summary-trigger',
    priceSummarySheet: 'page-form__price-summary-sheet',
  },
} as const;
