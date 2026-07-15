import { QuotaWidget } from '@ds/uikit-product-quota';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { BASE_QUOTA_WIDGET_PROPS } from '../mockData';
import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof QuotaWidget> = {
  title: 'Uikit Product/Quota/QuotaWidget',
  component: QuotaWidget,
  parameters: { layout: 'fullscreen' },
  args: {
    ...BASE_QUOTA_WIDGET_PROPS,
    'data-test-id': TEST_IDS.quotaWidget.root,
  },
};

export default meta;
type Story = StoryObj<typeof QuotaWidget>;

export const Playground: Story = {
  args: {
    loading: false,
    canEditQuota: false,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <div className={styles.storyWrapper}>
          <QuotaWidget {...args} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),

  tags: ['dev', 'test'],

  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.quotaWidget.trigger)).toBeVisible();
  },
};
