import { TEST_IDS as FIELD_TEST_IDS } from '@ds/fields';
import { FieldMask, MASK } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';

const meta: Meta<typeof FieldMask> = {
  title: 'Uikit Product/FieldsPredefined/FieldMask/Tests/Interaction',
  component: FieldMask,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { label: 'СНИЛС', mask: MASK.Snils, onChange: fn(), 'data-test-id': TEST_IDS.fieldMask },
};

export default meta;
type Story = StoryObj<typeof FieldMask>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Ввод цифр форматируется маской СНИЛС, onChange получает значение с разделителями.</DemoHint>
        <DemoActions block>
          <FieldMask {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(FIELD_TEST_IDS.fieldComboInput);

    await step('typing digits applies the mask separators', async () => {
      await userEvent.click(input);
      await userEvent.type(input, '12345678901');
      expect(input).toHaveValue('123456-789 01');
    });

    await step('onChange is fired with the formatted value', async () => {
      expect(args.onChange).toHaveBeenCalled();
      // react-imask дёргает onAccept как (value, maskRef, event) — 3 аргумента; матчим any-call,
      // last-call ненадёжен из-за трейлинг-onAccept.
      expect(args.onChange).toHaveBeenCalledWith('123456-789 01', expect.anything(), expect.anything());
    });
  },
};
