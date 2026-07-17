import { AiFieldNotice, VARIANT } from '@ds/ai-field-notice';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import { useArgs } from 'storybook/preview-api';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { buildNoticeProps } from './buildNoticeProps';
import { playgroundArgs, playgroundArgTypes } from './playgroundShared';
import type { PlaygroundStoryArgs } from './playgroundTypes';
import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<PlaygroundStoryArgs> = {
  title: 'Ai/AiFieldNotice',
  component: AiFieldNotice as unknown as ComponentType<PlaygroundStoryArgs>,
  parameters: { layout: 'fullscreen' },
  args: playgroundArgs,
  argTypes: playgroundArgTypes,
};

export default meta;
type Story = StoryObj<PlaygroundStoryArgs>;

export const Playground: Story = {
  render: function Render(args) {
    const [, updateArgs] = useArgs<PlaygroundStoryArgs>();

    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>
            Композиция `AiFieldBanner` + `AiQueue`. Для проверки frosted-glass на фоне чата откройте story
            «Examples/Backdrop blur».
          </DemoHint>
          <DemoActions align='start'>
            <div className={styles.playgroundPlain}>
              <AiFieldNotice key={args.variant} {...buildNoticeProps(args, updateArgs)} />
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },

  tags: ['dev', 'test'],

  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();

    if (args.variant === VARIANT.Queue) {
      await expect(canvas.getByTestId(TEST_IDS.queue)).toBeVisible();
    } else if (args.variant) {
      await expect(canvas.getByTestId(TEST_IDS.bannerContent)).toBeVisible();
      await userEvent.click(canvas.getByTestId(TEST_IDS.bannerAction));
    }
  },
};
