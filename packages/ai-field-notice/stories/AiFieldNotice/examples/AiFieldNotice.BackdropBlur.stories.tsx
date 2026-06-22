import { TEST_IDS as BANNER_TEST_IDS } from '@ds/ai-field-banner';
import { AiFieldNotice, VARIANT } from '@ds/ai-field-notice';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement, useState } from 'react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { buildNoticeProps } from '../buildNoticeProps';
import { FIXTURE_QUEUE_PROPS, FIXTURE_VM_AGENT_NOTICE } from '../fixtures';
import { playgroundArgs } from '../playgroundShared';
import { PlaygroundStage } from '../PlaygroundStage';
import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const CHAT_MESSAGES = {
  assistantIntro:
    'Чтобы создать виртуальную машину, откройте раздел Compute и нажмите «Создать ВМ». Я могу провести вас по шагам.',
  userQuestion: 'А как подключиться по SSH после создания?',
  assistantSteps:
    'Сгенерируйте ключ в консоли, добавьте публичную часть в метаданные ВМ и подключитесь через стандартный клиент.',
  userThanks: 'Спасибо, всё понятно.',
} as const;

function ChatBackground(): ReactElement {
  return (
    <div className={styles.silhouettes} aria-hidden>
      <div className={styles.chatRow}>
        <span className={styles.chatAvatar} />
        <p className={`${styles.chatBubble} ${styles.chatBubbleWide}`}>{CHAT_MESSAGES.assistantIntro}</p>
      </div>

      <div className={styles.chatRowReverse}>
        <p className={`${styles.chatBubble} ${styles.chatBubbleNarrow} ${styles.chatBubbleAlignEnd}`}>
          {CHAT_MESSAGES.userQuestion}
        </p>
      </div>

      <div className={styles.chatRow}>
        <span className={styles.chatAvatar} />
        <p className={`${styles.chatBubble} ${styles.chatBubbleWide}`}>{CHAT_MESSAGES.assistantSteps}</p>
      </div>

      <div className={styles.chatRowReverse}>
        <p className={`${styles.chatBubble} ${styles.chatBubbleNarrow} ${styles.chatBubbleAlignEnd}`}>
          {CHAT_MESSAGES.userThanks}
        </p>
      </div>
    </div>
  );
}

const meta: Meta<typeof AiFieldNotice> = {
  title: 'Ai/AiFieldNotice/Examples/BackdropBlur',
  component: AiFieldNotice,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof AiFieldNotice>;

export const BackdropBlur: Story = {
  tags: ['dev'],
  render: function Render() {
    const [queueOpen, setQueueOpen] = useState(false);

    const noticeProps = buildNoticeProps({
      ...playgroundArgs,
      variant: VARIANT.Queue,
      queue: { ...FIXTURE_QUEUE_PROPS, open: queueOpen, onOpenChange: setQueueOpen },
      onActionClick: fn(),
    });

    const vmAgentNoticeProps = buildNoticeProps({
      ...playgroundArgs,
      ...FIXTURE_VM_AGENT_NOTICE,
      onActionClick: fn(),
    });

    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Backdrop blur</DemoTitle>
          <DemoHint>Демо frosted-glass (`backdrop-filter: blur`) на AdviceContainer</DemoHint>
          <DemoActions align='start'>
            <PlaygroundStage background={<ChatBackground />}>
              <div className={styles.noticeStack}>
                <AiFieldNotice {...noticeProps} data-test-id={TEST_IDS.root} />
                <AiFieldNotice {...vmAgentNoticeProps} data-test-id={`${TEST_IDS.root}-vm-agent`} />
              </div>
            </PlaygroundStage>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(canvas.getByTestId(BANNER_TEST_IDS.advice)).toBeVisible();
  },
};
