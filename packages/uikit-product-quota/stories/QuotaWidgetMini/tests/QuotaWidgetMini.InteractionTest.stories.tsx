import { TEST_IDS as ACCORDION_TEST_IDS } from '@ds/accordion';
import { QuotaWidgetMini } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { BASE_QUOTA_WIDGET_MINI_PROPS, MOCK_QUOTA_EXHAUSTED } from '../../mockData';
import { TEST_IDS } from '../../testIds';
import { withMiniWidth } from '../decorators';

const meta: Meta<typeof QuotaWidgetMini> = {
  title: 'Uikit Product/Quota/QuotaWidgetMini',
  component: QuotaWidgetMini,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof QuotaWidgetMini>;

export const InteractionTest: Story = {
  tags: ['test'],
  decorators: [withMiniWidth],
  render: () => (
    <QuotaWidgetMini {...BASE_QUOTA_WIDGET_MINI_PROPS} quotas={[MOCK_QUOTA_EXHAUSTED]} onWidgetOpen={() => undefined} />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId(TEST_IDS.quotaWidgetMini.trigger);
    const cardTestId = `${TEST_IDS.quotaWidgetCard.root}--${MOCK_QUOTA_EXHAUSTED.name}`;

    // onClick аккордиона висит на заголовке (titleContent), а не на корневом
    // wrapper'е триггера — кликаем внутренний заголовок, чтобы раскрыть блок.
    await userEvent.click(within(trigger).getByTestId(ACCORDION_TEST_IDS.title));
    await expect(canvas.getByTestId(TEST_IDS.quotaWidgetMini.content)).toBeVisible();
    await expect(canvas.getByTestId(cardTestId)).toHaveAttribute('data-exhausted', 'true');
  },
};
