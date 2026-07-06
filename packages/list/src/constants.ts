export const ITEM_PREFIXES = {
  default: '~main',
  pinTop: '~pinTop',
  pinBottom: '~pinBottom',
  footer: '~footer',
  search: '~search',
  dropFocus: '~dropFocus',
} as const;

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const MODE = {
  None: 'none',
  Single: 'single',
  Multiple: 'multiple',
} as const;

export const ITEM_TYPE = {
  NextList: 'next-list',
  Collapse: 'collapse',
  Group: 'group',
  GroupSelect: 'group-select',
  Simple: 'simple',
} as const;

export const TEST_IDS = {
  root: 'list',
  loader: 'list__loader',
  noData: 'list__no-data',
  noResults: 'list__no-results',
  error: 'list__error',
  baseItem: 'list__base-item',
  baseItemMarker: 'list__base-item-marker',
  baseItemCheckbox: 'list__base-item-checkbox',
  baseItemSwitch: 'list__base-item-switch',
  baseItemOption: 'list__base-item-option',
  baseItemDescription: 'list__base-item-description',
  searchItem: 'list__search-item',
  bulkSelectButton: 'list__bulk-select-button',
  pinTopGroupItem: 'list__pin-top-group-item',
  pinBottomGroupItem: 'list__pin-bottom-group-item',
  accordionItem: 'list__accordion-item',
  groupIndicator: 'list__group-indicator',
  dragHandle: 'list__drag-handle',
  mobileDroplistRoot: 'list__mobile-droplist-root',
  mobileDroplistTrigger: 'list__mobile-droplist-trigger',
} as const;
