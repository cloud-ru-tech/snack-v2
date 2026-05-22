export const ORIENTATION = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const;

export const MARKER_POSITION = {
  Before: 'before',
  After: 'after',
} as const;

export const SIZE = {
  L: 'l',
  M: 'm',
} as const;

/**
 * Канонические `data-test-id` для слотов Tabs-стека. Реализация
 * компонентов не ставит эти id сама — они проксируются через `...rest`,
 * поэтому потребитель свободен в выборе значения. Эти константы
 * закрепляют единый набор для stories и e2e, чтобы не плодить дубли строк.
 */
export const TEST_IDS = {
  tabs: {
    root: 'tabs',
  },
  tabBar: {
    root: 'tabs-bar',
  },
  tab: {
    root: 'tabs-tab',
  },
  tabContent: {
    root: 'tabs-panel',
  },
} as const;
