import { APPEARANCE, Counter, DEFAULT_PLUS_LIMIT, ROLE_APPEARANCE, SIZE, VARIANT } from '@ds/counter';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Счётчик числовых значений с порогом для варианта count-plus.</DemoHint>
        <DemoActions align='center'>
          <Counter {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    value: 9,
    appearance: APPEARANCE.Primary,
    size: SIZE.S,
    variant: VARIANT.Count,
    plusLimit: DEFAULT_PLUS_LIMIT,
    roleAppearance: ROLE_APPEARANCE.Accent,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    value: { control: 'number', description: 'Числовое значение' },
    appearance: {
      control: 'radio',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер' },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант форматирования',
    },
    plusLimit: { control: 'number', description: 'Порог для варианта `count-plus`' },
    roleAppearance: {
      control: 'radio',
      options: Object.values(ROLE_APPEARANCE),
      description: 'Семантический цвет',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Counter>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
