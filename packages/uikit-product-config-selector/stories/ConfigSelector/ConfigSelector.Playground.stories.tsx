import { ConfigSelector } from '@ds/uikit-product-config-selector';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof ConfigSelector> = {
  title: 'Uikit Product/ConfigSelector',
  component: ConfigSelector,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/VWNiBRIUmVXIWYlLzMxcs6/Product-UI-Kit--variables-?node-id=3036-14250',
    },
  },
  args: {
    label: 'Конфигурация',
    checked: false,
    available: false,
    disabled: false,
    availableTip: 'Рекомендуемая опция',
    disabledTip: 'Опция недоступна',
    onChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    availableTip: { control: 'text' },
    disabledTip: { control: 'text' },
    onChange: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof ConfigSelector>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Chip-toggle выбора опции конфигурации. Controlled — значением управляет проп `checked`.</DemoHint>
        <DemoActions align='center'>
          <ConfigSelector {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
