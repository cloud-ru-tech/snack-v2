import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import { SIZE, Switch, SwitchProps } from '../../src';

const meta: Meta<SwitchProps> = {
  title: 'Components/Toggles/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
};

export default meta;

type StoryProps = SwitchProps;
type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = args => {
  const [{ checked }, updateArgs] = useArgs<SwitchProps>();

  return <Switch {...args} checked={checked} onChange={updatedValue => updateArgs({ checked: updatedValue })} />;
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    size: SIZE.XS,
    checked: undefined,
    defaultChecked: undefined,
    loading: false,
    disabled: false,
    /** Без ключей в args Storybook не применяет id/name из URL (автотесты / шаринг ссылки). */
    id: undefined,
    name: undefined,
  },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
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
