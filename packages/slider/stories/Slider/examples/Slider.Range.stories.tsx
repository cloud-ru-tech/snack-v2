import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fireEvent, fn, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider/Examples/Range',
  component: Slider,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    range: true,
    min: 0,
    max: 100,
    step: 10,
    defaultValue: [20, 70],
    onChange: fn(),
    onChangeComplete: fn(),
    'data-test-id': TEST_IDS.root,
  },
  decorators: [
    Story => (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Range</DemoTitle>
          <DemoHint>Слайдер с двумя ползунками для выбора диапазона.</DemoHint>
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

export const Range: Story = {
  tags: ['dev', 'test'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const handles = canvas.getAllByTestId(TEST_IDS.handle);
    expect(handles.length).toBe(2);

    // `fireEvent.keyDown` вместо `userEvent.keyboard` — rc-slider не реагирует
    // на keyboard после программного `.focus()` в storybook-test browser'е.
    await step('keyboard: ArrowRight on first handle increments lower bound', async () => {
      handles[0].focus();
      await waitFor(() => expect(handles[0]).toHaveFocus());
      fireEvent.keyDown(handles[0], { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, which: 39 });
      await waitFor(() => expect(args.onChange).toHaveBeenCalled());
    });
  },
};
