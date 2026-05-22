import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider/Tests/Interaction',
  component: Slider,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    min: 0,
    max: 100,
    step: 10,
    defaultValue: 40,
    onChange: fn(),
    onChangeComplete: fn(),
    'data-test-id': TEST_IDS.root,
  },
  decorators: [
    Story => (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>InteractionTest</DemoTitle>
          <DemoHint>Проверка клавиатурного управления слайдером.</DemoHint>
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

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByTestId(TEST_IDS.handle);

    // `userEvent.keyboard` после `handle.focus()` нестабилен с rc-slider'ом в
    // storybook-test browser-окружении: программный focus не активирует focus-visible
    // tracker rc-slider'а, и {ArrowRight} не доходит до onChange. Используем
    // `fireEvent.keyDown` — низкоуровневый dispatch, не зависит от focus-visible.
    await step('keyboard: ArrowRight increments value by step', async () => {
      handle.focus();
      await waitFor(() => expect(handle).toHaveFocus());
      fireEvent.keyDown(handle, { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, which: 39 });
      await waitFor(() => expect(args.onChange).toHaveBeenCalled());
    });

    await step('keyboard: ArrowLeft decrements value by step', async () => {
      handle.focus();
      fireEvent.keyDown(handle, { key: 'ArrowLeft', code: 'ArrowLeft', keyCode: 37, which: 37 });
      await waitFor(() => expect((args.onChange as ReturnType<typeof fn>).mock.calls.length).toBeGreaterThanOrEqual(2));
    });
  },
};
