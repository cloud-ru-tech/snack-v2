/**
 * Stable test-id'ы для stories bottom-sheet'а. Используются в Playwright e2e и play-функциях.
 */
export const TEST_IDS = {
  triggerOpen: 'bottom-sheet-trigger',
  triggerReset: 'bottom-sheet-trigger-reset',
  exampleContent: 'bottom-sheet-example-content',
  // Nested-сценарий: кнопка внутри основного sheet'а, открывающая вложенный action-sheet,
  // отдельный root-id для вложенного sheet'а (чтобы отличать от внешнего в локаторах) и его cancel.
  nestedOpen: 'bottom-sheet-nested-open',
  nestedRoot: 'bottom-sheet-nested',
  // VisualMatrix: триггер на каждую композицию-ячейку + общий dismiss активного sheet'а.
  vm: {
    trigger: (key: string) => `bottom-sheet-vm-${key}`,
    dismiss: 'bottom-sheet-vm-dismiss',
  },
  // Figma-композиции (examples): интерактивные слоты для play / e2e.
  // Кнопки футера id не нужны — high-level BottomSheet проставляет их сам
  // (TEST_IDS.footerApprove / footerCancel / footerAdditional из @ds/bottom-sheet).
  selection: {
    selectAll: 'bottom-sheet-selection-select-all',
  },
  tagPicker: {
    search: 'bottom-sheet-tag-picker-search',
  },
  // WithActionButton: kebab-триггер actionButton'а и пункты его Dropdown-меню.
  actionMenu: {
    trigger: 'bottom-sheet-action-menu-trigger',
    item: (id: string) => `bottom-sheet-action-menu-item-${id}`,
  },
  // Controlled snapIndex: кнопки прыжка по snap'ам + индикатор последнего значения из onSnapIndexChange.
  controlledSnap: {
    toPeek: 'bottom-sheet-controlled-snap-to-peek',
    toFull: 'bottom-sheet-controlled-snap-to-full',
    reported: 'bottom-sheet-controlled-snap-reported',
  },
} as const;
