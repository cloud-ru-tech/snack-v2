import { TEST_IDS as ACCORDION_TEST_IDS } from '@ds/accordion';
import { PRICE_PERIOD, PriceSummary } from '@ds/uikit-product-price-summary';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { DEFAULT_INVOICE, PLAYGROUND_DEFAULT_ARGS } from '../constants';
import { PriceSummaryFigmaSurface, PriceSummaryStory } from '../PriceSummaryStory';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PriceSummary> = {
  title: 'Uikit Product/PriceSummary/PriceSummary/Tests/Interaction',
  component: PriceSummary,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PriceSummary>;

const onPeriodChanged = fn();

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Аккордеон деталей заказа и смена периода.</DemoHint>
        <DemoActions align='center'>
          <PriceSummaryFigmaSurface>
            <PriceSummaryStory
              {...PLAYGROUND_DEFAULT_ARGS}
              invoice={DEFAULT_INVOICE}
              invoiceExpandedDefault={false}
              period={PRICE_PERIOD.Month}
              periodOptions={[PRICE_PERIOD.Month, PRICE_PERIOD.Year]}
              onPeriodChanged={onPeriodChanged}
              data-test-id={TEST_IDS.priceSummary}
            />
          </PriceSummaryFigmaSurface>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onPeriodChanged.mockClear();
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('accordion: expand order details', async () => {
      const root = canvas.getByTestId(TEST_IDS.priceSummary);
      const orderDetails = within(root).getByTestId(TEST_IDS.orderDetails);

      await userEvent.click(within(orderDetails).getByTestId(ACCORDION_TEST_IDS.title));
      await waitFor(() => expect(within(root).getByTestId(TEST_IDS.orderDetailsContent)).toBeVisible());
    });

    await step('period dropdown: open and select year', async () => {
      const root = canvas.getByTestId(TEST_IDS.priceSummary);
      const trigger = await waitFor(() => within(root).getByTestId(TEST_IDS.periodDropdown));
      await userEvent.click(trigger);

      const option = await waitFor(() => body.getByTestId(TEST_IDS.periodOptionYear));
      await userEvent.click(option);

      await expect(onPeriodChanged).toHaveBeenCalled();
      await waitFor(() => expect(within(root).getByTestId(TEST_IDS.periodDropdown)).toBeVisible());
    });

    await step('root remains visible', async () => {
      await expect(canvas.getByTestId(TEST_IDS.priceSummary)).toBeVisible();
    });
  },
};
