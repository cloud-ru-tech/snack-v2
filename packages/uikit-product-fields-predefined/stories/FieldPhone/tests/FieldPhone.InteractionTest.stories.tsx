import { TEST_IDS as FIELD_TEST_IDS } from '@ds/fields';
import { FieldPhone } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../../src/constants';

const meta: Meta<typeof FieldPhone> = {
  title: 'Uikit Product/FieldsPredefined/FieldPhone/Tests/Interaction',
  component: FieldPhone,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { label: 'Телефон', onChange: fn(), 'data-test-id': TEST_IDS.fieldPhone },
};

export default meta;
type Story = StoryObj<typeof FieldPhone>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Ввод цифр форматируется маской выбранной страны (по умолчанию Россия, +7).</DemoHint>
        <DemoActions block>
          <FieldPhone {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(FIELD_TEST_IDS.fieldComboInput);

    await step('typing a national number formats it with the country mask', async () => {
      await userEvent.click(input);
      await userEvent.type(input, '9991234567');
      expect(input).toHaveValue('999 123-45-67');
    });

    await step('onChange reports the full value with the +7 country code', async () => {
      expect(args.onChange).toHaveBeenCalled();
      // any-call form: маска шлёт несколько onChange по мере ввода, last-call ненадёжен.
      expect(args.onChange).toHaveBeenCalledWith(expect.stringContaining('+7'));
    });
  },
};
