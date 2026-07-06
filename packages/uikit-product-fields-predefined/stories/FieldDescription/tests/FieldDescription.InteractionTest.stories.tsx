import { TEST_IDS as FIELD_TEST_IDS } from '@ds/fields';
import { FieldDescription } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

// Story-level id обёртки второго (опционального) поля с addButton — используется только здесь.
const OPTIONAL_FIELD_TEST_ID = 'field-description-optional';

const meta: Meta<typeof FieldDescription> = {
  title: 'Uikit Product/FieldsPredefined/FieldDescription/Tests/Interaction',
  component: FieldDescription,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { required: true, onValidationError: fn(), 'data-test-id': TEST_IDS.fieldDescription },
};

export default meta;
type Story = StoryObj<typeof FieldDescription>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Валидация: required при пустом значении, очистка ошибки на валидном вводе; addButton раскрывает опциональное
          поле по клику.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.form}>
            <FieldDescription {...args} />
            <div data-test-id={OPTIONAL_FIELD_TEST_ID}>
              <FieldDescription addButton />
            </div>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(FIELD_TEST_IDS.fieldTextAreaInput);

    await step('blur empty required field reports error', async () => {
      await userEvent.click(input);
      input.blur();
      // yup ValidationError.message не enumerable — objectContaining({ message }) не матчит, сверяем по типу.
      await waitFor(() => expect(args.onValidationError).toHaveBeenLastCalledWith(expect.any(Error)));
    });

    await step('valid input clears the error', async () => {
      await userEvent.type(input, 'Описание сервиса');
      await waitFor(() => expect(args.onValidationError).toHaveBeenLastCalledWith(null));
    });

    await step('addButton: click reveals the optional textarea', async () => {
      const optionalField = within(canvas.getByTestId(OPTIONAL_FIELD_TEST_ID));
      await expect(optionalField.getByTestId(TEST_IDS.fieldDescriptionAddButton)).toBeVisible();
      await userEvent.click(optionalField.getByTestId(TEST_IDS.fieldDescriptionAddButton));
      await waitFor(() => expect(optionalField.getByTestId(FIELD_TEST_IDS.fieldTextAreaInput)).toBeVisible());
    });
  },
};
