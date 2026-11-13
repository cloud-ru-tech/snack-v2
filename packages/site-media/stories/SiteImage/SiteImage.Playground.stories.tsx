import { SiteImage } from '@ds/site-media';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { POSTER } from '../fixtures';
import styles from '../styles.module.scss';

const meta: Meta<typeof SiteImage> = {
  title: 'Site/Media/SiteImage',
  component: SiteImage,
  parameters: { layout: 'fullscreen' },
  args: { src: POSTER, alt: 'Интерфейс сервиса', className: styles.player, 'data-test-id': 'site-image-story' },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    loading: { control: 'radio', options: ['eager', 'lazy'] },
  },
};
export default meta;
type Story = StoryObj<typeof SiteImage>;
export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <SiteImage {...args} />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('site-image-story')).toBeVisible();
  },
};
