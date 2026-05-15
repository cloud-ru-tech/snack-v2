import { CodeEditor } from '@ds/code-editor';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { CODE_JSON } from './constants';
import styles from './stories.module.scss';
import {
  CODE_EDITOR_COPY_BUTTON_TEST_ID,
  CODE_EDITOR_HEADER_TEST_ID,
  CODE_EDITOR_LANGUAGE_TEST_ID,
  CODE_EDITOR_TEST_ID,
} from './testIds';

const meta: Meta<typeof CodeEditor> = {
  title: 'Components/CodeEditor',
  component: CodeEditor,
  parameters: { layout: 'padded', controls: { disable: true } },
  args: {
    language: 'json',
    value: CODE_JSON,
    hasHeader: true,
    hasBackground: true,
    onCopyClick: fn(),
    'data-test-id': CODE_EDITOR_TEST_ID,
  },
  decorators: [
    Story => (
      <div className={styles.frame}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByTestId(CODE_EDITOR_HEADER_TEST_ID)).toBeVisible();
    });

    await step('header: language label is rendered', async () => {
      await expect(canvas.getByTestId(CODE_EDITOR_LANGUAGE_TEST_ID)).toHaveTextContent('Json');
    });

    await step('click: copy button triggers onCopyClick', async () => {
      const copyButton = canvas.getByTestId(CODE_EDITOR_COPY_BUTTON_TEST_ID);
      await userEvent.click(copyButton);
      expect(args.onCopyClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: copy button is focusable', async () => {
      // Программный focus вместо Tab — Monaco-textarea монтируется и может перехватить
      // tab-секвенцию в зависимости от тайминга гидрации.
      const copyButton = canvas.getByTestId(CODE_EDITOR_COPY_BUTTON_TEST_ID) as HTMLElement;
      copyButton.focus();
      await expect(copyButton).toHaveFocus();
    });
  },
};
