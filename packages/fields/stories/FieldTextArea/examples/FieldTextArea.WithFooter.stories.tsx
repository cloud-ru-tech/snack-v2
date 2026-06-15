import { ButtonGroup } from '@ds/button';
import { FieldTextArea, TEST_IDS } from '@ds/fields';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const SUBMIT_BUTTON_TEST_ID = 'field-textarea-footer-submit';
const RESET_BUTTON_TEST_ID = 'field-textarea-footer-reset';

const meta: Meta<typeof FieldTextArea> = {
  title: 'Components/Fields/FieldTextArea/Examples/WithFooter',
  component: FieldTextArea,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldTextArea>;

function WithFooterDemo() {
  const [value, setValue] = useState('');
  const [submitted, setSubmitted] = useState('');

  const footer = (
    <ButtonGroup
      size='s'
      primaryAction={{
        label: 'Отправить',
        disabled: !value,
        onClick: () => setSubmitted(value),
        'data-test-id': SUBMIT_BUTTON_TEST_ID,
      }}
      secondaryAction={{
        label: 'Очистить',
        onClick: () => setValue(''),
        'data-test-id': RESET_BUTTON_TEST_ID,
      }}
    />
  );

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Footer-слот</DemoTitle>
        <DemoHint>
          Нода под полем (`footer`) рендерится отдельной строкой действий — независимо от postfix-кнопок.
          {submitted ? ` Отправлено: ${submitted}` : ''}
        </DemoHint>
        <DemoActions align='center'>
          <FieldTextArea
            data-test-id={TEST_IDS.fieldTextArea}
            label='Комментарий'
            placeholder='Расскажите подробнее'
            hint={submitted ? 'Сохранено' : 'Заполните и отправьте'}
            minRows={3}
            maxRows={8}
            value={value}
            onChange={setValue}
            footer={footer}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const WithFooter: Story = {
  tags: ['dev', 'test'],
  render: () => <WithFooterDemo />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.fieldTextArea);
    const input = within(root).getByTestId<HTMLTextAreaElement>(TEST_IDS.fieldTextAreaInput);
    const submit = canvas.getByTestId(SUBMIT_BUTTON_TEST_ID);

    await step('footer submit is disabled while the textarea is empty', async () => {
      await expect(root).toBeVisible();
      await expect(submit).toBeDisabled();
    });

    await step('typing enables the footer submit action', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'Готово к отправке');
      await expect(submit).toBeEnabled();
    });

    await step('footer reset clears the textarea value', async () => {
      await userEvent.click(canvas.getByTestId(RESET_BUTTON_TEST_ID));
      await expect(input).toHaveValue('');
      await expect(submit).toBeDisabled();
    });
  },
};
