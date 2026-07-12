import { type SunProps } from '@ds/loader';

export const SIZE = {
  S: 's',
  M: 'm',
  L: 'l',
} as const;

export const BUTTON_SIZE = {
  S: 's',
  M: 'm',
} as const;

export const SPINNER_SIZE_MAP: Record<(typeof SIZE)[keyof typeof SIZE], SunProps['size']> = {
  [SIZE.S]: 'xs',
  [SIZE.M]: 's',
  [SIZE.L]: 's',
};

export const CHIP_ASSIST_TEST_IDS = {
  icon: 'chip-assist__icon',
  spinner: 'chip-assist__spinner',
  label: 'chip-assist__label',
} as const;

// TODO: копипаста из текущего снека
// Но кажется такая константа должна быть своя для каждого вида chip-choice?
export const CHIP_CHOICE_TEST_IDS = {
  icon: 'chip-choice__icon',
  spinner: 'chip-choice__spinner',
  label: 'chip-choice__label',
  value: 'chip-choice__value',
  clearButton: 'chip-choice__clear-button',
  droplist: 'chip-choice__droplist',
  footer: 'chip-choice__footer',
  approveButton: 'chip-choice__approve-button',
  cancelButton: 'chip-choice__cancel-button',
  resetButton: 'chip-choice__reset-button',
  selectedCount: 'chip-choice__selected-count',
} as const;

export const CHIP_CHOICE_ROW_TEST_IDS = {
  addButton: 'chip-choice-row__add-button',
  addButtonTooltip: 'chip-choice-row__add-button-tooltip',
  addButtonOption: 'chip-choice-row__add-button-option',
  clearButton: 'chip-choice-row__clear-button',
} as const;

export const CHIP_TOGGLE_TEST_IDS = {
  input: 'chip-toggle__input',
  icon: 'chip-toggle__icon',
  spinner: 'chip-toggle__spinner',
  label: 'chip-toggle__label',
} as const;

export const DEFAULT_EMPTY_VALUE = '—';
