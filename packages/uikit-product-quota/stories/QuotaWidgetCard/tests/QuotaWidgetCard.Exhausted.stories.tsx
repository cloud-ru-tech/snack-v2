import { QuotaWidgetCard } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';

import { MOCK_QUOTA_EXHAUSTED, MOCK_QUOTA_OVERUSE } from '../../mockData';
import { TEST_IDS } from '../../testIds';
import { withCardWidth } from '../decorators';

const meta: Meta<typeof QuotaWidgetCard> = {
  title: 'Uikit Product/Quota/QuotaWidgetCard',
  component: QuotaWidgetCard,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof QuotaWidgetCard>;

/** Exhausted quota — for Playwright rendering (URL args do not reliably override nested `quota`). */
export const Exhausted: Story = {
  tags: ['test'],
  decorators: [withCardWidth],
  args: {
    quota: MOCK_QUOTA_EXHAUSTED,
    'data-test-id': TEST_IDS.quotaWidgetCard.root,
  },
};

/** Overuse (remains < 0) — same exhausted UI as zero remains. */
export const Overuse: Story = {
  tags: ['test'],
  decorators: [withCardWidth],
  args: {
    quota: MOCK_QUOTA_OVERUSE,
    'data-test-id': TEST_IDS.quotaWidgetCard.root,
  },
};
