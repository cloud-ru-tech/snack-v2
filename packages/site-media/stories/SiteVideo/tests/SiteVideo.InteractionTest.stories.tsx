import { LAYOUT_TYPE } from '@ds/adaptive';
import { SiteVideo } from '@ds/site-media';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoPage, DemoPanel, LayoutScope } from '#storybook/components';

import { VIDEO } from '../../fixtures';
import styles from '../../styles.module.scss';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof SiteVideo> = {
  title: 'Site/Media/SiteVideo/Tests/Interaction',
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
  args: { video: { ...VIDEO, loop: true, muted: true }, onPlay: fn(), onError: fn() },
};
export default meta;
type Story = StoryObj<typeof SiteVideo>;
export const InteractionTest: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.player}>
      <SiteVideo {...args} />
    </div>
  ),
  play: async ({ canvasElement, args, step }) => {
    const canvas = within(canvasElement);
    const player = canvas.getByTestId(TEST_IDS.player);
    await step('Play и однократный onPlay', async () => {
      await waitFor(() => expect(player).toHaveAttribute('aria-busy', 'false'), { timeout: 15000 });
      await userEvent.click(canvas.getByTestId(TEST_IDS.playButton));
      await waitFor(() => expect(player).toHaveAttribute('data-playing', 'true'), { timeout: 15000 });
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.timeline)).toBeVisible(), { timeout: 15000 });
      await expect(args.onPlay).toHaveBeenCalledTimes(1);
      await userEvent.click(canvas.getByTestId(TEST_IDS.play));
      await waitFor(() => expect(player).toHaveAttribute('data-playing', 'false'));
    });
    await step('Громкость, скорость и перемотка', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.mute));
      await userEvent.click(canvas.getByTestId(TEST_IDS.mute));
      const speed = canvas.getByTestId(TEST_IDS.speed);
      await userEvent.click(speed);
      const menu = await canvas.findByTestId(TEST_IDS.speedMenu);
      await expect(player).toContainElement(menu);
      await waitFor(() => expect(menu.closest('[data-placement]')).toHaveAttribute('data-placement', 'top-end'));
      await expect(canvas.getByTestId(`${TEST_IDS.speedOption}-1`)).toHaveAttribute('data-checked', 'true');
      await userEvent.click(canvas.getByTestId(`${TEST_IDS.speedOption}-1.5`));
      await waitFor(() => expect(speed).toHaveTextContent('1,5x'));
      await expect(canvas.getByTestId(TEST_IDS.nativeVideo)).toHaveProperty('playbackRate', 1.5);
      await waitFor(() => expect(speed).toHaveAttribute('aria-expanded', 'false'));
      await userEvent.click(canvas.getByTestId(TEST_IDS.rewind));
      await userEvent.click(canvas.getByTestId(TEST_IDS.forward));
      canvas.getByTestId(TEST_IDS.timeline).focus();
      await userEvent.keyboard('{Home}{ArrowRight}{ArrowLeft}');
    });
    await step('Выбор скорости с клавиатуры и закрытие по Escape', async () => {
      const speed = canvas.getByTestId(TEST_IDS.speed);
      speed.focus();
      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(speed).toHaveAttribute('aria-expanded', 'true'));
      await waitFor(() => expect(canvas.getByTestId(TEST_IDS.speedMenu).contains(document.activeElement)).toBe(true));
      await userEvent.keyboard('{Home}{ArrowDown}{Enter}');
      await waitFor(() => expect(speed).toHaveTextContent('0,75x'));
      await expect(canvas.getByTestId(TEST_IDS.nativeVideo)).toHaveProperty('playbackRate', 0.75);
      await waitFor(() => expect(speed).toHaveAttribute('aria-expanded', 'false'));
      await waitFor(() => expect(speed).toHaveFocus());

      await userEvent.keyboard('{ArrowDown}');
      await waitFor(() => expect(speed).toHaveAttribute('aria-expanded', 'true'));
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(speed).toHaveAttribute('aria-expanded', 'false'));
      await waitFor(() => expect(speed).toHaveFocus());
    });
    await step('Клавиатура Play/Pause и повторный запуск', async () => {
      canvas.getByTestId(TEST_IDS.playButton).focus();
      await userEvent.keyboard('k');
      await waitFor(() => expect(player).toHaveAttribute('data-playing', 'true'));
      await userEvent.keyboard('k');
      await waitFor(() => expect(player).toHaveAttribute('data-playing', 'false'));
      await userEvent.keyboard('mm{ArrowLeft}{ArrowRight}');
      await userEvent.click(canvas.getByTestId(TEST_IDS.restart));
      await waitFor(() => expect(player).toHaveAttribute('data-playing', 'true'));
      await userEvent.click(canvas.getByTestId(TEST_IDS.play));
      await expect(args.onPlay).toHaveBeenCalledTimes(1);
      await expect(args.onError).not.toHaveBeenCalled();
    });
  },
};

export const MobileSpeedSelection: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <LayoutScope layoutType={LAYOUT_TYPE.Mobile}>
      <div className={styles.mobile}>
        <SiteVideo {...args} />
      </div>
    </LayoutScope>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const player = canvas.getByTestId(TEST_IDS.player);
    await waitFor(() => expect(player).toHaveAttribute('aria-busy', 'false'), { timeout: 15000 });
    await userEvent.click(canvas.getByTestId(TEST_IDS.playButton));
    await waitFor(() => expect(player).toHaveAttribute('data-playing', 'true'), { timeout: 15000 });
    await userEvent.click(canvas.getByTestId(TEST_IDS.play));

    const speed = canvas.getByTestId(TEST_IDS.speed);
    await userEvent.click(speed);
    await expect(await canvas.findByTestId(`${TEST_IDS.speedOption}-1`)).toHaveAttribute('data-checked', 'true');
    await userEvent.click(canvas.getByTestId(`${TEST_IDS.speedOption}-2`));
    await waitFor(() => expect(speed).toHaveTextContent('2x'));
    await expect(canvas.getByTestId(TEST_IDS.nativeVideo)).toHaveProperty('playbackRate', 2);
    await waitFor(() => expect(speed).toHaveAttribute('aria-expanded', 'false'));
  },
};
