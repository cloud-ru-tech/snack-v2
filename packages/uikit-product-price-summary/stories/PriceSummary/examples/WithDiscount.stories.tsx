import { PriceSummary } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { DEFAULT_DISCOUNT, PLAYGROUND_DEFAULT_ARGS } from '../constants';
import { PriceSummaryFigmaSurface, PriceSummaryStory } from '../PriceSummaryStory';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PriceSummary> = {
  title: 'Uikit Product/PriceSummary/PriceSummary/Examples/WithDiscount',
  component: PriceSummary,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PriceSummary>;

export const WithDiscount: Story = {
  tags: ['dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='center'>
          <PriceSummaryFigmaSurface>
            <PriceSummaryStory
              {...PLAYGROUND_DEFAULT_ARGS}
              discount={DEFAULT_DISCOUNT}
              data-test-id={TEST_IDS.priceSummary}
            />
          </PriceSummaryFigmaSurface>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
