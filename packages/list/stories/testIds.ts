// Stories-level test ids для пакета @ds/list (multi-component: List + Droplist +
// ReorderableList + ReorderableDroplist).
// Внутренние слоты компонентов адресуются через TEST_IDS из @ds/list/src/constants.
export const TEST_IDS = {
  list: {
    root: 'list',
    selectionScenario: 'list-selection',
    collapseScenario: 'list-collapse',
    virtualizedScenario: 'list-virtualized',
    searchScenario: 'list-search',
    submenuScenario: 'list-submenu',
    bulkSelectScenario: 'list-bulk-select',
    groupSpacingScenario: 'list-group-spacing',
    polymorphicScenario: 'list-polymorphic',
  },
  droplist: {
    root: 'droplist',
    triggerOpen: 'droplist-trigger',
    triggerCloseOnClick: 'droplist-trigger-close-on-click',
    renderFnTrigger: 'droplist-renderfn-trigger',
    controlledTrigger: 'droplist-controlled-trigger',
    controlledClose: 'droplist-controlled-close',
  },
  reorderableList: {
    root: 'reorderable-list',
  },
  reorderableDroplist: {
    root: 'reorderable-droplist',
    triggerOpen: 'reorderable-droplist-trigger',
  },
} as const;
