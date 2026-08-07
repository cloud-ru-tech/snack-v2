import { TRIGGER } from '@ds/tooltip';
import { PromoTagPredefined, TEST_IDS as COMPONENT_TEST_IDS, VARIANTS } from '@ds/uikit-product-promo-tag-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { MouseEvent } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const onSupportClick = fn((e: MouseEvent) => {
  e.preventDefault();
});

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
        <DemoHint>Tooltip по hover/click и клик по support-ссылке в connecting.</DemoHint>
        <DemoActions align='center'>
          <PromoTagPredefined
            variant={VARIANTS.Connecting}
            tooltip={{ trigger: TRIGGER.Hover, onSupportClick }}
            data-test-id={TEST_IDS.promoTagHover}
          />
          <PromoTagPredefined
            variant={VARIANTS.Partner}
            tooltip={{ trigger: TRIGGER.Click }}
            data-test-id={TEST_IDS.promoTagClickTrigger}
          />
          <PromoTagPredefined
            variant={VARIANTS.Connecting}
            tooltip={{ trigger: TRIGGER.Click, onSupportClick }}
            data-test-id={TEST_IDS.promoTagSupport}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const hoverTrigger = canvas.getByTestId(TEST_IDS.promoTagHover);
    const clickTrigger = canvas.getByTestId(TEST_IDS.promoTagClickTrigger);
    const supportTrigger = canvas.getByTestId(TEST_IDS.promoTagSupport);

    await step('hover: opens tooltip with support link', async () => {
      await userEvent.hover(hoverTrigger);
      await waitFor(
        () => {
          expect(within(document.body).getByTestId(COMPONENT_TEST_IDS.tooltipContent)).toBeVisible();
        },
        { timeout: 2000 },
      );
      expect(within(document.body).getByTestId(COMPONENT_TEST_IDS.supportLink)).toBeVisible();
    });

    await step('unhover: closes tooltip', async () => {
      await userEvent.unhover(hoverTrigger);
      await waitFor(() => {
        expect(within(document.body).queryByTestId(COMPONENT_TEST_IDS.tooltipContent)).toBeNull();
      });
    });

    await step('connecting: support link calls onSupportClick', async () => {
      onSupportClick.mockClear();
      await userEvent.click(supportTrigger);
      await waitFor(() => {
        expect(within(document.body).getByTestId(COMPONENT_TEST_IDS.supportLink)).toBeVisible();
      });
      await userEvent.click(within(document.body).getByTestId(COMPONENT_TEST_IDS.supportLink));
      await expect(onSupportClick).toHaveBeenCalledOnce();
      await userEvent.click(supportTrigger);
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
  },
};
