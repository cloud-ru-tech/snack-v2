import { SiteVideo, SiteVideoProps } from '@ds/site-media';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { POSTER, SOURCES } from '../fixtures';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

type StoryProps = SiteVideoProps & {
  source: keyof typeof SOURCES;
  src?: string;
  poster: string;
  controls: boolean;
  autoPlay: boolean;
  muted: boolean;
  loop: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Site/Media/SiteVideo',
  component: SiteVideo,
  parameters: { layout: 'fullscreen' },
  args: {
    source: 'mp4',
    poster: POSTER,
    controls: true,
    autoPlay: false,
    muted: false,
    loop: false,
    onPlay: fn(),
    onError: fn(),
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    video: { table: { disable: true } },
    source: { name: '[Stories]: source', control: 'select', options: Object.keys(SOURCES) },
    src: { name: '[Stories]: src', control: 'text' },
    poster: { name: '[Stories]: poster', control: 'text' },
    controls: { name: '[Stories]: controls', control: 'boolean' },
    autoPlay: { name: '[Stories]: autoPlay', control: 'boolean' },
    muted: { name: '[Stories]: muted', control: 'boolean' },
    loop: { name: '[Stories]: loop', control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<StoryProps>;
export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ source, src, poster, controls, autoPlay, muted, loop, ...args }) => (
    <DemoPage>
      <DemoPanel width='wide'>
        <div className={styles.player}>
          <SiteVideo {...args} video={{ src: src || SOURCES[source], poster, controls, autoPlay, muted, loop }} />
        </div>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
