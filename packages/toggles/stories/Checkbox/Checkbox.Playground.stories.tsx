import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import { Checkbox, CheckboxProps, SIZE } from '../../src';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  parameters: { layout: 'centered' },
};

export default meta;

type StoryProps = CheckboxProps;

type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = args => {
  const [{ checked, indeterminate }, updateArgs] = useArgs<CheckboxProps>();

  return (
    <Checkbox
      {...args}
      checked={checked}
      indeterminate={indeterminate}
      onChange={updatedValue =>
        updateArgs({
          checked: updatedValue,
          indeterminate: false,
        })
      }
    />
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    size: SIZE.XS,
    checked: undefined,
    defaultChecked: undefined,
    indeterminate: undefined,
    indeterminateDefault: undefined,
    loading: false,
    disabled: false,
    /** Без ключей в args Storybook не применяет id/name из URL (автотесты / шаринг ссылки). */
    id: undefined,
    name: undefined,
    'data-test-id': 'checkbox',
  },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    indeterminateDefault: { control: 'boolean' },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
    id: {
      control: 'text',
      description: 'HTML id нативного input',
      table: { category: 'HTML Attributes' },
    },
    name: {
      control: 'text',
      description: 'HTML name нативного input',
      table: { category: 'HTML Attributes' },
    },
  },
};
