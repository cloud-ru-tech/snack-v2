import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { MOCK_QUOTA_GREEN } from '../mockData';
import { TEST_IDS } from '../testIds';
import { withCardWidth } from './decorators';

const meta: Meta<typeof QuotaWidgetCard> = {
  title: 'Uikit Product/Quota/QuotaWidgetCard',
  component: QuotaWidgetCard,
  parameters: { layout: 'padded' },
  args: {
    quota: MOCK_QUOTA_GREEN,
    'data-test-id': TEST_IDS.quotaWidgetCard.root,
  },
};

export default meta;
type Story = StoryObj<typeof QuotaWidgetCard>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  decorators: [withCardWidth],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.quotaWidgetCard.root)).toBeVisible();
  },
};
