import { CodeEditor } from '@ds/code-editor';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { CODE_JSON } from '../constants';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof CodeEditor> = {
  title: 'Components/CodeEditor/Tests/Interaction',
  component: CodeEditor,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    language: 'json',
    value: CODE_JSON,
    hasHeader: true,
    hasBackground: true,
    onCopyClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Header показывает язык; копирующая кнопка фокусируется и вызывает onCopyClick.'}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.frame}>
            <CodeEditor {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof CodeEditor>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await waitFor(async () => {
      await expect(canvas.getByTestId(TEST_IDS.header)).toBeVisible();
    });

    await step('header: language label is rendered', async () => {
      await expect(canvas.getByTestId(TEST_IDS.language)).toHaveTextContent('Json');
    });

    await step('click: copy button triggers onCopyClick', async () => {
      const copyButton = canvas.getByTestId(TEST_IDS.copyButton);
      await userEvent.click(copyButton);
      expect(args.onCopyClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: copy button is focusable', async () => {
      // Программный focus вместо Tab — Monaco-textarea монтируется и может перехватить
      // tab-секвенцию в зависимости от тайминга гидрации.
      const copyButton = canvas.getByTestId(TEST_IDS.copyButton) as HTMLElement;
      copyButton.focus();
      await expect(copyButton).toHaveFocus();
    });
  },
};
