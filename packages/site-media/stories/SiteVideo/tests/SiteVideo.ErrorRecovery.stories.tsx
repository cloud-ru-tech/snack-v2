import { Button } from '@ds/button';
import { SiteVideo, SiteVideoProps } from '@ds/site-media';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { VIDEO } from '../../fixtures';
import styles from '../../styles.module.scss';
import { STORY_TEST_IDS, TEST_IDS } from '../../testIds';

function Recovery({ onError, onPlay }: Pick<SiteVideoProps, 'onError' | 'onPlay'>) {
  const [available, setAvailable] = useState(false);
  const handleRecover = () => setAvailable(true);
  return (
    <div className={styles.row}>
      <Button label='Восстановить источник' onClick={handleRecover} data-test-id={STORY_TEST_IDS.recover} />
      <div className={styles.player}>
        <SiteVideo
          video={{ ...VIDEO, src: available ? VIDEO.src : 'data:video/mp4;base64,AA==', muted: true }}
          onError={onError}
          onPlay={onPlay}
        />
      </div>
    </div>
  );
}
const meta: Meta<typeof SiteVideo> = {
  title: 'Site/Media/SiteVideo/Tests/ErrorRecovery',
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
  args: { onError: fn(), onPlay: fn() },
};
export default meta;
export const ErrorRecovery: StoryObj<typeof SiteVideo> = {
  tags: ['dev', 'test'],
  render: args => <Recovery onError={args.onError} onPlay={args.onPlay} />,
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    await step('Ошибка источника и повторная попытка', async () => {
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.error)).toBeVisible(), { timeout: 15000 });
      await expect(args.onError).toHaveBeenCalled();
      await userEvent.click(canvas.getByTestId(TEST_IDS.retry));
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.error)).toBeVisible());
    });
    await step('Замена источника после ошибки', async () => {
      await userEvent.click(canvas.getByTestId(STORY_TEST_IDS.recover));
      await waitFor(() => expect(canvas.queryByTestId(TEST_IDS.error)).not.toBeInTheDocument());
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.player)).toHaveAttribute('aria-busy', 'false'));
      await userEvent.click(canvas.getByTestId(TEST_IDS.playButton));
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.player)).toHaveAttribute('data-playing', 'true'));
      await expect(args.onPlay).toHaveBeenCalledTimes(1);
      await userEvent.click(canvas.getByTestId(TEST_IDS.play));
    });
  },
};
