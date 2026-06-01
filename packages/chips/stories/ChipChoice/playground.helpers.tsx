import { Args, ArgTypes } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import { COMMON_ARG_TYPES, COMMON_ARGS, type CustomStoryProps, useIconProps } from '../playground.helpers';
import { TEST_IDS } from '../testIds';

export type ChipChoiceCustomStoryProps = CustomStoryProps & {
  showButtonClear?: boolean;
};

export const OPTIONS = [
  { value: 'opt1', label: 'Option 1', 'data-test-id': TEST_IDS.chipChoice.option1 },
  { value: 'opt2', label: 'Option 2', 'data-test-id': TEST_IDS.chipChoice.option2 },
  { value: 'opt3', label: 'Option 3', 'data-test-id': TEST_IDS.chipChoice.option3 },
];

export const CHIP_CHOICE_COMMON_ARGS = {
  ...COMMON_ARGS,
  showButtonClear: false,
  widthStrategy: 'gte' as const,
  open: false,
};

export const CHIP_CHOICE_COMMON_ARG_TYPES: ArgTypes = {
  ...COMMON_ARG_TYPES,
  showButtonClear: {
    name: '[Story] showButtonClear',
    type: 'boolean',
  },
  value: { table: { disable: true } },
  defaultValue: { table: { disable: true } },
  onChange: { table: { disable: true } },
  onOpenChange: { table: { disable: true } },
  onClearButtonClick: { table: { disable: true } },
  dropDownClassName: { table: { disable: true } },
  valueRender: { table: { disable: true } },
  contentRender: { table: { disable: true } },
  content: { table: { disable: true } },
  filterFn: { table: { disable: true } },
  buildCalendarCellProps: { table: { disable: true } },
  placement: { table: { disable: true } },
  footer: { table: { disable: true } },
  footerActiveElementsRefs: { table: { disable: true } },
  scrollRef: { table: { disable: true } },
  scrollContainerRef: { table: { disable: true } },
  scrollToSelectedItem: { table: { disable: true } },
  selection: { table: { disable: true } },
  noDataState: { table: { disable: true } },
  errorDataState: { table: { disable: true } },
  noResultsState: { table: { disable: true } },
  virtualized: { table: { disable: true } },
  onApprove: { table: { disable: true } },
  onCancel: { table: { disable: true } },
};

export function useControlledStoryArgs<T extends Args & CustomStoryProps>({
  defaultValue,
}: {
  defaultValue?: T['value'];
}) {
  const { icon } = useIconProps<T>();
  const [{ open, value, showButtonClear }, updateArgs] = useArgs<T>();

  return {
    icon,
    open,
    value,
    onChange(nextValue: T['value']) {
      updateArgs({ value: nextValue } as unknown as Partial<T>);
    },
    onOpenChange(nextOpen: boolean) {
      updateArgs({ open: nextOpen } as unknown as Partial<T>);
    },
    onClearButtonClick: showButtonClear
      ? () => {
          updateArgs({ value: defaultValue } as unknown as Partial<T>);
        }
      : undefined,
  };
}
