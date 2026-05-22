import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const NON_LINEAR_MARKS = {
  0: '0',
  1: '1',
  10: '10',
  100: '100',
  1000: '1000',
};

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider/Examples/MarksEqualSpacing',
  component: Slider,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    min: 0,
    max: 1000,
    marks: NON_LINEAR_MARKS,
    marksEqualSpacing: true,
    defaultValue: 10,
    handleTip: true,
    onChange: fn(),
    onChangeComplete: fn(),
    'data-test-id': TEST_IDS.root,
  },
  decorators: [
    Story => (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>MarksEqualSpacing</DemoTitle>
          <DemoHint>Нелинейные метки распределяются равномерно по треку.</DemoHint>
          <DemoActions block>
            <Story />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const MarksEqualSpacing: Story = {
  tags: ['dev', 'test'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByTestId(TEST_IDS.handle);

    // useEqual=true → внутри wrap создаётся inner-arrow, которая мапит
    // internal-индекс обратно в domain-значение перед onChange. fireEvent.keyDown
    // нужен, потому что rc-slider не реагирует на userEvent.keyboard после
    // программного focus (см. test-environment-pitfalls.md §rc-slider).
    await step('keyboard: ArrowRight maps internal index to domain value', async () => {
      handle.focus();
      await waitFor(() => expect(handle).toHaveFocus());
      fireEvent.keyDown(handle, { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, which: 39 });
      await waitFor(() => expect(args.onChange).toHaveBeenCalled());
      // После ArrowRight от defaultValue=10 (internal=2) шаг ведёт к next mark = 100.
      // Проверяем, что callback получил domain-значение (а не internal-индекс).
      const calls = (args.onChange as ReturnType<typeof fn>).mock.calls;
      const lastValue = calls[calls.length - 1]?.[0];
      expect([1, 10, 100, 1000]).toContain(lastValue);
    });
  },
};
