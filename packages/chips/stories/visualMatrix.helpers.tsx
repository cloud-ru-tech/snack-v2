import { SIZE } from '@ds/chips';
import { SettingsSVG } from '@ds/icons/interface/system';

export const SIZES = Object.values(SIZE);
export const COLUMN_HEADERS = SIZES.map(s => s.toUpperCase());

export const OPTIONS = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
];

export const COMMON_STATES = [
  { key: 'default', extra: {} },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'loading', extra: { loading: true } },
] as const;

export const DATE_VALUE = new Date(2026, 5, 3);
export const DATE_RANGE_VALUE: [Date, Date] = [new Date(2026, 5, 1), new Date(2026, 5, 7)];
export const TIME_VALUE = { hours: 12, minutes: 30, seconds: 45 };
export const CHIP_CHOICE_ICON = <SettingsSVG />;
export const CLEAR_BUTTON_PROPS = { onClearButtonClick: () => undefined };
export const CHIP_CHOICE_STATE_ROWS = [
  ...COMMON_STATES.filter(({ key }) => key !== 'default'),
  ...COMMON_STATES.filter(({ key }) => key !== 'default').map(({ key, extra }) => ({
    key: `${key} + icon`,
    extra: { ...extra, icon: CHIP_CHOICE_ICON },
  })),
] as const;
