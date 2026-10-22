// Figma variant: InputSendButton State=Disabled|Active|Loading|Stop Generation
export const SEND_STATE = {
  Disabled: 'disabled',
  Active: 'active',
  Loading: 'loading',
  Stop: 'stop',
} as const;

// Figma variant: InputFooterContext Progress=Green|Orange|Red
export const CONTEXT_PROGRESS = {
  Green: 'green',
  Orange: 'orange',
  Red: 'red',
} as const;

/** Пороги цвета индикатора контекста, % (IFC-2.2). */
export const CONTEXT_PROGRESS_THRESHOLDS = {
  orange: 70,
  red: 90,
} as const;

export const SEGMENT_TYPE = {
  Text: 'text',
  Skill: 'skill',
  Mention: 'mention',
  Search: 'search',
} as const;

export const SEARCH_TRIGGER = {
  Skill: '/',
  Mention: '@',
} as const;

// Figma variant: ActionsContainer type=default|drillDown|back
export const ACTION_LIST_ITEM_TYPE = {
  Default: 'default',
  DrillDown: 'drillDown',
  Back: 'back',
} as const;

export const TEST_IDS = {
  root: 'ai-field-input',
  scrollButton: 'ai-field-input__scroll-button',
  scrollButtonIndicator: 'ai-field-input__scroll-button-indicator',
  banner: 'ai-field-input__banner',
  field: 'ai-field-input__field',
  attachments: 'ai-field-input__attachments',
  attachmentsPrev: 'ai-field-input__attachments-prev',
  attachmentsNext: 'ai-field-input__attachments-next',
  editor: 'ai-field-input__editor',
  chip: 'ai-field-input__chip',
  chipRemove: 'ai-field-input__chip-remove',
  chipHint: 'ai-field-input__chip-hint',
  searchHint: 'ai-field-input__search-hint',
  footer: 'ai-field-input__footer',
  footerLeft: 'ai-field-input__footer-left',
  footerRight: 'ai-field-input__footer-right',
  send: 'ai-field-input__send',
  disclaimer: 'ai-field-input__disclaimer',
  plus: 'ai-field-input__plus',
  settings: 'ai-field-input__settings',
  model: 'ai-field-input__model',
  effort: 'ai-field-input__effort',
  context: 'ai-field-input__context',
  voice: 'ai-field-input__voice',
  menu: 'ai-field-input__menu',
  menuItem: 'ai-field-input__menu-item',
  actionList: 'ai-field-input-action-list',
  actionListEmpty: 'ai-field-input-action-list__empty',
  actionListBack: 'ai-field-input-action-list__back',
} as const;
