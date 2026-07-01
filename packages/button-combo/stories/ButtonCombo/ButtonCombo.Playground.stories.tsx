import { ButtonCombo, Item, TEST_IDS } from '@ds/button-combo';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

const items: Item[] = [
  { id: 'create', label: 'Создать', onClick: fn() },
  { id: 'duplicate', label: 'Дублировать', onClick: fn() },
  { id: 'archive', label: 'Архивировать', onClick: fn() },
];

const meta: Meta<typeof ButtonCombo> = {
  title: 'Components/ButtonCombo',
  component: ButtonCombo,
  parameters: { layout: 'fullscreen' },
  args: {
    items,
    defaultValue: 'create',
    defaultLabel: 'Выберите действие',
    view: 'filled',
    appearance: 'primary',
    size: 'm',
    disabled: false,
    loading: false,
    fullWidth: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    items: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <ButtonCombo {...args} />
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof ButtonCombo>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.option)).toBeVisible();
  },
};
