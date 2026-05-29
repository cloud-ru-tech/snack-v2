import { QuotaWidget } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, within } from 'storybook/test';

import { BASE_QUOTA_WIDGET_PROPS } from '../../mockData';
import { quotaWidgetStoryDecorator } from '../decorators';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof QuotaWidget> = {
  title: 'Uikit Product/Quota/QuotaWidget',
  component: QuotaWidget,
  parameters: { layout: 'padded' },
  decorators: [quotaWidgetStoryDecorator],
};

export default meta;
type Story = StoryObj<typeof QuotaWidget>;

export const InteractionTest: Story = {
  tags: ['test'],
  args: {
    ...BASE_QUOTA_WIDGET_PROPS,
    onWidgetOpen: () => undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByTestId(TEST_IDS.quotaWidget.trigger);

    await userEvent.click(trigger);
    await expect(body.getByTestId(TEST_IDS.quotaWidget.content)).toBeVisible();
    await expect(body.getByTestId(TEST_IDS.quotaWidget.projectHeader)).toBeVisible();
  },
};
