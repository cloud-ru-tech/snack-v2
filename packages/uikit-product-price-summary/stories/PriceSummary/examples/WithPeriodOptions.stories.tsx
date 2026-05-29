import { PRICE_PERIOD, PriceSummary } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { PLAYGROUND_DEFAULT_ARGS } from '../constants';
import { PriceSummaryFigmaSurface, PriceSummaryStory } from '../PriceSummaryStory';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PriceSummary> = {
  title: 'Uikit Product/PriceSummary/PriceSummary/Examples/WithPeriodOptions',
  component: PriceSummary,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PriceSummary>;

export const WithPeriodOptions: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='center'>
          <PriceSummaryFigmaSurface>
            <PriceSummaryStory
              {...PLAYGROUND_DEFAULT_ARGS}
              period={PRICE_PERIOD.Year}
              periodOptions={[PRICE_PERIOD.Month, PRICE_PERIOD.Year, PRICE_PERIOD.Day]}
              data-test-id={TEST_IDS.priceSummary}
            />
          </PriceSummaryFigmaSurface>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
