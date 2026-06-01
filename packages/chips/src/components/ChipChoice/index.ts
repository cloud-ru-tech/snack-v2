import {
  ChipChoiceCustom,
  ChipChoiceCustomProps,
  ChipChoiceDate,
  ChipChoiceDateProps,
  ChipChoiceDateRange,
  ChipChoiceDateRangeProps,
  ChipChoiceMultiple,
  ChipChoiceSingle,
  ChipChoiceTime,
  ChipChoiceTimeProps,
  CustomContentRenderProps,
} from './components';

export { setNonce } from '@sbercloud/snack-v2-list';
export { CHIP_CHOICE_TYPE } from './constants';

export type { FilterOption, ChipChoiceMultipleProps, ChipChoiceSingleProps, ContentRenderProps } from './types';
export type {
  ChipChoiceCustomProps,
  ChipChoiceDateProps,
  ChipChoiceDateRangeProps,
  CustomContentRenderProps,
  ChipChoiceTimeProps,
};

export namespace ChipChoice {
  export const Custom = ChipChoiceCustom;
  export const Single = ChipChoiceSingle;
  export const Multiple = ChipChoiceMultiple;
  export const Date = ChipChoiceDate;
  export const DateRange = ChipChoiceDateRange;
  export const Time = ChipChoiceTime;
}

export { isAccordionOption, isBaseOption, isGroupOption, isGroupSelectOption, isNextListOption } from './utils';
