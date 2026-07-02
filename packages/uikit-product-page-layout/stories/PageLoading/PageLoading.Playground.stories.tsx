import { PageLoading } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof PageLoading> = {
  title: 'Uikit Product/PageLayout/PageLoading',
  component: PageLoading,
  parameters: { layout: 'fullscreen' },
  args: {
    'data-test-id': TEST_IDS.pageLoading.root,
  },
};

export default meta;
type Story = StoryObj<typeof PageLoading>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Полноразмерный лоадер страницы со спиннером по центру.</DemoHint>
        <DemoActions block>
          <div className={styles.loadingFrame}>
            <PageLoading {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.pageLoading.root)).toBeVisible();
  },
};
