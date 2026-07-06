import { FieldPhone } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../src/constants';

const meta: Meta<typeof FieldPhone> = {
  title: 'Uikit Product/FieldsPredefined/FieldPhone',
  component: FieldPhone,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Телефон',
    size: 'm',
    searchPlaceholder: 'Поиск страны',
    'data-test-id': TEST_IDS.fieldPhone,
  },
  render: function Render(args) {
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Телефон с выбором страны: флаг + код в слоте, маска подстраивается под страну.</DemoHint>
          <DemoActions block>
            <FieldPhone {...args} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof FieldPhone>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldPhone)).toBeVisible();
  },
};
