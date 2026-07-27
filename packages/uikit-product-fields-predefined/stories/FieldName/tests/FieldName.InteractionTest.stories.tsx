import { TEST_IDS as FIELD_TEST_IDS } from '@ds/fields';
import { FieldName } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';
import styles from '../styles.module.scss';

const meta: Meta<typeof FieldName> = {
  title: 'Uikit Product/FieldsPredefined/FieldName/Tests/Interaction',
  component: FieldName,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onValidationError: fn(), 'data-test-id': TEST_IDS.fieldName },
};

export default meta;
type Story = StoryObj<typeof FieldName>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Валидация по blur: required при пустом значении, очистка ошибки на валидном вводе.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.panel}>
            <FieldName {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(FIELD_TEST_IDS.fieldComboInput);

    await step('blur empty required field reports error', async () => {
      await userEvent.click(input);
      input.blur();
      // yup ValidationError.message не enumerable — objectContaining({ message }) не матчит, сверяем по типу.
      await waitFor(() => expect(args.onValidationError).toHaveBeenLastCalledWith(expect.any(Error)));
    });

    await step('valid input clears the error on blur', async () => {
      await userEvent.click(input);
      await userEvent.type(input, 'my-service');
      input.blur();
      await waitFor(() => expect(args.onValidationError).toHaveBeenLastCalledWith(null));
    });
  },
};
