import { SIZE } from '@ds/chips';
import { SettingsSVG } from '@ds/icons';
import { Args, ArgTypes } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

export type CustomStoryProps = {
  showElementBefore?: boolean;
};

export const COMMON_ARGS: CustomStoryProps & Record<string, unknown> = {
  showElementBefore: false,
  size: SIZE.S,
  truncateVariant: 'middle',
  disabled: false,
  loading: false,
};

export const COMMON_ARG_TYPES: ArgTypes = {
  showElementBefore: {
    name: '[Story] showElementBefore',
    type: 'boolean',
  },
  size: { control: 'radio', options: Object.values(SIZE) },
  truncateVariant: { control: 'radio', options: ['end', 'middle'] },
  icon: { table: { disable: true } },
  onClick: { table: { disable: true } },
  onChange: { table: { disable: true } },
  className: { table: { disable: true } },
  tabIndex: { table: { disable: true } },
};

export function useIconProps<T extends Args & CustomStoryProps>() {
  const [{ showElementBefore }] = useArgs<T>();

  return {
    icon: showElementBefore ? <SettingsSVG /> : undefined,
  };
}
