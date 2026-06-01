import { ButtonProps } from '@ds/button';
import { CalendarProps, TimePickerProps } from '@ds/calendar';
import { DroplistProps } from '@sbercloud/snack-v2-list';

import { BUTTON_SIZE, SIZE } from '../../constants';
import { ButtonSize, Size } from '../../types';

export const BUTTON_CLEAR_VALUE_SIZE_MAP: Record<Size, ButtonSize> = {
  [SIZE.S]: BUTTON_SIZE.S,
  [SIZE.M]: BUTTON_SIZE.M,
  [SIZE.L]: BUTTON_SIZE.M,
};

export const CALENDAR_SIZE_MAP: Record<Size, CalendarProps['size']> = {
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'm',
};

export const TIME_PICKER_SIZE_MAP: Record<Size, TimePickerProps['size']> = {
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'l',
};

export const DROPLIST_SIZE_MAP: Record<Size, DroplistProps['size']> = {
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'l',
};

export const DROPLIST_FOOTER_SIZE_MAP: Record<Size, ButtonProps['size']> = {
  [SIZE.S]: 's',
  [SIZE.M]: 'm',
  [SIZE.L]: 'm',
};

export const CHIP_CHOICE_TYPE = {
  Multiple: 'multiple',
  Date: 'date',
  DateTime: 'date-time',
  Time: 'time',
  DateRange: 'date-range',
  Single: 'single',
  Custom: 'custom',
} as const;

export const DEFAULT_LOCALE = new Intl.Locale('ru-RU');
