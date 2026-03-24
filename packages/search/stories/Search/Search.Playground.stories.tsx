import { PlaceholderSVG } from '@design-system/icons';
import { INPUT_MODE } from '@design-system/input-private';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useMemo } from 'react';
import { useArgs } from 'storybook/preview-api';

import searchReadme from '../../README.md?raw';
import { Search, SearchProps, SIZE } from '../../src';
import { getIconSize } from '../../src/helperComponents/ButtonField/utils';
import styles from './styles.module.scss';

type StoryArgs = SearchProps & {
  showPostfix: boolean;
  buttonFieldAfterLoading: boolean;
  buttonFieldAfterDisabled: boolean;
  buttonFieldAfterWithDropdownList: boolean;
};

const meta: Meta<StoryArgs> = {
  title: 'Components/Search/Playground',
  component: Search,
  parameters: {
    readme: { content: searchReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=6313-48734&m=dev',
    },
  },
  args: {},
  argTypes: {
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;

type Story = StoryObj<StoryArgs>;

const Template: StoryFn<StoryArgs> = ({
  size,
  showPostfix,
  buttonFieldAfterLoading,
  buttonFieldAfterDisabled,
  buttonFieldAfterWithDropdownList,
  ...args
}) => {
  const [{ value: controlledValue = '' }, updateArgs] = useArgs<{ value?: string }>();

  const buttonFieldProps = useMemo(() => {
    if (!showPostfix) {
      return undefined;
    }

    const buttonFieldProps: SearchProps['buttonField'] = {
      size: size,
      loading: buttonFieldAfterLoading || undefined,
      disabled: buttonFieldAfterDisabled,
      onClick: () => console.info('Clicked!'),
      withDropdownList: buttonFieldAfterWithDropdownList,
      action: <PlaceholderSVG size={getIconSize(size)} className={styles.sampleAction} />,
    };

    return buttonFieldProps;
  }, [size, buttonFieldAfterDisabled, buttonFieldAfterLoading, buttonFieldAfterWithDropdownList, showPostfix]);

  return (
    <div className={styles.wrapper} data-size={size}>
      <Search
        {...args}
        size={size}
        value={controlledValue}
        onChange={value => updateArgs({ value })}
        buttonField={buttonFieldProps}
      />
    </div>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    size: SIZE.S,
    loading: false,
    disabled: false,
    background: true,
    value: '',
    placeholder: 'Search',

    inputMode: INPUT_MODE.Search,
    showPostfix: true,
    outline: true,
    buttonFieldAfterLoading: false,
    buttonFieldAfterDisabled: false,
    buttonFieldAfterWithDropdownList: true,
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    placeholder: {
      control: 'text',
    },
    loading: {
      control: 'boolean',
    },
    inputMode: {
      control: 'select',
      options: Object.values(INPUT_MODE),
    },
    showPostfix: {
      control: 'boolean',
      name: '[Story] Постфикс (слот)',
    },
    outline: {
      control: 'boolean',
      if: { arg: 'showPostfix', eq: true },
    },
    buttonFieldAfterLoading: {
      control: 'boolean',
      name: '[Story] buttonFieldAfter.loading',
      if: { arg: 'showPostfix', eq: true },
    },
    buttonFieldAfterDisabled: {
      control: 'boolean',
      name: '[Story] buttonFieldAfter.disabled',
      if: { arg: 'showPostfix', eq: true },
    },
    buttonFieldAfterWithDropdownList: {
      control: 'boolean',
      name: '[Story] buttonFieldAfter.withDropdownList',
      if: { arg: 'showPostfix', eq: true },
    },
    buttonField: { table: { disable: true } },
  },
};
