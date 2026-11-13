import { SiteVideo } from '@ds/site-media';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { POSTER, SAMPLE_VIDEO } from '../../fixtures';
import styles from '../../styles.module.scss';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof SiteVideo> = {
  title: 'Site/Media/SiteVideo/Examples/CustomPlayer',
  component: SiteVideo,
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <DemoPage>
        <DemoPanel width='wide'>
          <Story />
        </DemoPanel>
      </DemoPage>
    ),
  ],
};
export default meta;
export const CustomPlayer: StoryObj<typeof SiteVideo> = {
  tags: ['dev', 'test'],
  render: () => (
    <div className={styles.player}>
      <SiteVideo
        video={<video src={SAMPLE_VIDEO} poster={POSTER} muted controls aria-label='Пользовательский плеер' />}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
