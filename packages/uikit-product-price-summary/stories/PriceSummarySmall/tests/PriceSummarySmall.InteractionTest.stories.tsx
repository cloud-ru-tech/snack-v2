import { PriceSummarySmall } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { PriceSummaryFigmaSurface } from '../../PriceSummary/PriceSummaryStory';
import { TEST_IDS } from '../../PriceSummary/testIds';

const meta: Meta<typeof PriceSummarySmall> = {
  title: 'Uikit Product/PriceSummary/PriceSummarySmall/Tests/Interaction',
  component: PriceSummarySmall,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PriceSummarySmall>;

const onRetry = fn();

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Retry при dataError.</DemoHint>
        <DemoActions align='center'>
          <PriceSummaryFigmaSurface>
            <PriceSummarySmall
              value={9_999_999.99}
              dataError
              onRetry={onRetry}
              data-test-id={TEST_IDS.priceSummarySmall}
            />
          </PriceSummaryFigmaSurface>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onRetry.mockClear();

    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.priceSummarySmall);

    await step('retry button calls onRetry', async () => {
      await userEvent.click(within(root).getByTestId(TEST_IDS.contentBlockRetry));
      await expect(onRetry).toHaveBeenCalledTimes(1);
    });
  },
};
