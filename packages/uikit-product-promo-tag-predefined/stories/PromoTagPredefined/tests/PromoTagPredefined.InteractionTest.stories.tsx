import { TRIGGER } from '@ds/tooltip';
import { PromoTagPredefined, TEST_IDS as COMPONENT_TEST_IDS, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const onPromoTagClick = fn();

const meta: Meta<typeof PromoTagPredefined> = {
  title: 'Uikit Product/PromoTagPredefined/Tests/Interaction',
  component: PromoTagPredefined,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PromoTagPredefined>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Tooltip по hover/click и onClick на PromoTag (три инстанса).</DemoHint>
        <DemoActions align='center'>
          <PromoTagPredefined
            variant={VARIANTS.Connecting}
            tooltip={{ trigger: TRIGGER.Hover }}
            data-test-id={TEST_IDS.promoTagHover}
          />
          <PromoTagPredefined
            variant={VARIANTS.Partner}
            tooltip={{ trigger: TRIGGER.Click }}
            data-test-id={TEST_IDS.promoTagClickTrigger}
          />
          <PromoTagPredefined
            variant={VARIANTS.Connecting}
            tooltip={{ trigger: TRIGGER.Click }}
            onClick={() => {
              onPromoTagClick();
            }}
            data-test-id={TEST_IDS.promoTagOnClick}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const hoverTrigger = canvas.getByTestId(TEST_IDS.promoTagHover);
    const clickTrigger = canvas.getByTestId(TEST_IDS.promoTagClickTrigger);
    const onClickTrigger = canvas.getByTestId(TEST_IDS.promoTagOnClick);

    await step('hover: opens tooltip', async () => {
      await userEvent.hover(hoverTrigger);
      await waitFor(
        () => {
          expect(within(document.body).getByTestId(COMPONENT_TEST_IDS.tooltipContent)).toBeVisible();
        },
        { timeout: 2000 },
      );
    });

    await step('unhover: closes tooltip', async () => {
      await userEvent.unhover(hoverTrigger);
      await waitFor(() => {
        expect(within(document.body).queryByTestId(COMPONENT_TEST_IDS.tooltipContent)).toBeNull();
      });
    });

    await step('click trigger: opens tooltip', async () => {
      await userEvent.click(clickTrigger);
      await waitFor(() => {
        expect(within(document.body).getByTestId(COMPONENT_TEST_IDS.tooltipContent)).toBeVisible();
      });
    });

    await step('click: calls onClick handler', async () => {
      await userEvent.keyboard('{Escape}');
      onPromoTagClick.mockClear();
      await userEvent.click(onClickTrigger);
      expect(onPromoTagClick.mock.calls.length).toBe(1);
    });
  },
};
