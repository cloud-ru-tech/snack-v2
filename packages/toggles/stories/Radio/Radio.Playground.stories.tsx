import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { Radio, RadioProps, SIZE } from '../../src';

const meta: Meta<typeof Radio> = {
  title: 'Components/Toggles/Radio',
  component: Radio,
  parameters: { layout: 'centered' },
  args: {
    size: SIZE.XS,
    checked: undefined,
    defaultChecked: undefined,
    loading: false,
    disabled: false,
    id: undefined,
    name: undefined,
    value: undefined,
    className: undefined,
    'data-test-id': 'radio',
  },
  argTypes: {
    checked: { control: 'boolean', description: 'Controlled checked' },
    defaultChecked: { control: 'boolean', description: 'Начальный checked (uncontrolled)' },
    loading: { control: 'boolean', description: 'Состояние загрузки' },
    disabled: { control: 'boolean', description: 'Отключён' },
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер' },
    id: { control: 'text', description: 'HTML id нативного input', table: { category: 'HTML Attributes' } },
    name: { control: 'text', description: 'HTML name', table: { category: 'HTML Attributes' } },
    value: { control: 'text', description: 'HTML value', table: { category: 'HTML Attributes' } },
    className: { control: 'text', description: 'CSS-класс корня' },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

function PlaygroundRender(args: RadioProps) {
  const [{ checked }, updateArgs] = useArgs<RadioProps>();
  return <Radio {...args} checked={checked} onChange={next => updateArgs({ checked: next })} />;
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('radio')).toBeVisible();
  },
};
