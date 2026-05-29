import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { MOCK_QUOTA_GREEN } from '../../mockData';
import { TEST_IDS } from '../../testIds';
import { withCardWidth } from '../decorators';

const meta: Meta<typeof QuotaWidgetCard> = {
  title: 'Uikit Product/Quota/QuotaWidgetCard',
  component: QuotaWidgetCard,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof QuotaWidgetCard>;

export const InteractionTest: Story = {
  tags: ['test'],
  decorators: [withCardWidth],
  args: {
    quota: MOCK_QUOTA_GREEN,
    'data-test-id': TEST_IDS.quotaWidgetCard.root,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await userEvent.hover(canvas.getByTestId(TEST_IDS.quotaWidgetCard.root));
    await expect(await body.findByTestId(TEST_IDS.quotaWidgetCard.tooltip)).toBeVisible();
  },
};
