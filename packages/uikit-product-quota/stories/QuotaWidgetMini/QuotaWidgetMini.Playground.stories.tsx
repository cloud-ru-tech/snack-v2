import { QuotaWidgetMini } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { BASE_QUOTA_WIDGET_MINI_PROPS } from '../mockData';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof QuotaWidgetMini> = {
  title: 'Uikit Product/Quota/QuotaWidgetMini',
  component: QuotaWidgetMini,
  parameters: { layout: 'padded' },
  args: {
    ...BASE_QUOTA_WIDGET_MINI_PROPS,
    'data-test-id': TEST_IDS.quotaWidgetMini.root,
  },
};

export default meta;
type Story = StoryObj<typeof QuotaWidgetMini>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.quotaWidgetMini.trigger)).toBeVisible();
  },
};
