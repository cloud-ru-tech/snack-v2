import { PriceSummary } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { PLAYGROUND_DEFAULT_ARGS } from './constants';
import { PriceSummaryFigmaSurface, PriceSummaryStory } from './PriceSummaryStory';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof PriceSummary> = {
  title: 'Uikit Product/PriceSummary/PriceSummary',
  component: PriceSummary,
  parameters: { layout: 'fullscreen' },
  args: {
    ...PLAYGROUND_DEFAULT_ARGS,
    'data-test-id': TEST_IDS.priceSummary,
  },
  argTypes: {
    loading: { control: 'boolean' },
    dataError: { control: 'boolean' },
    invoiceExpandedDefault: { control: 'boolean' },
    discount: { table: { disable: true } },
    invoice: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof PriceSummary>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Showcase по Figma `2909:5733`: promoTag, период, скидки, итог, подсказка, детализация заказа и ссылка.
        </DemoHint>
        <DemoActions align='center'>
          <PriceSummaryFigmaSurface>
            <PriceSummaryStory {...args} />
          </PriceSummaryFigmaSurface>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.priceSummary)).toBeVisible();
  },
};
