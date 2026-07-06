import { TEST_IDS as FIELD_TEST_IDS } from '@ds/fields';
import { FieldChat } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

const meta: Meta<typeof FieldChat> = {
  title: 'Uikit Product/FieldsPredefined/FieldChat/Tests/Interaction',
  component: FieldChat,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { handleSubmit: fn(), 'data-test-id': TEST_IDS.fieldChat },
};

export default meta;
type Story = StoryObj<typeof FieldChat>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function Render(args) {
    const [value, setValue] = useState('');

    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>InteractionTest</DemoTitle>
          <DemoHint>Enter отправляет сообщение и очищает поле; Shift+Enter переносит строку без отправки.</DemoHint>
          <DemoActions align='center'>
            <div className={styles.panel}>
              <FieldChat
                {...args}
                value={value}
                onChange={setValue}
                handleSubmit={submitted => {
                  args.handleSubmit?.(submitted);
                  setValue('');
                }}
              />
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(FIELD_TEST_IDS.fieldTextAreaInput);

    await step('empty field: Enter does not submit', async () => {
      input.focus();
      await userEvent.keyboard('{Enter}');
      expect(args.handleSubmit).not.toHaveBeenCalled();
    });

    await step('text + Enter: submits value and clears field', async () => {
      await userEvent.type(input, 'Hello');
      await userEvent.keyboard('{Enter}');
      expect(args.handleSubmit).toHaveBeenCalledTimes(1);
      expect(args.handleSubmit).toHaveBeenLastCalledWith('Hello');
      expect(input).toHaveValue('');
    });

    await step('Shift+Enter: inserts newline without submitting', async () => {
      await userEvent.type(input, 'line one');
      await userEvent.keyboard('{Shift>}{Enter}{/Shift}');
      await userEvent.type(input, 'line two');
      expect(args.handleSubmit).toHaveBeenCalledTimes(1);
      expect(input).toHaveValue('line one\nline two');
    });
  },
};
