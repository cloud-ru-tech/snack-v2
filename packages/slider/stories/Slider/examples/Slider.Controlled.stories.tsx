import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fireEvent, fn, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

type ControlledProps = {
  onChange?(value: number): void;
};

function ControlledSlider({ onChange }: ControlledProps) {
  const [value, setValue] = useState(50);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>Контролируемый слайдер с локальным состоянием.</DemoHint>
        <DemoActions block>
          <Slider
            min={0}
            max={100}
            step={10}
            data-test-id={TEST_IDS.root}
            value={value}
            onChange={next => {
              const v = Array.isArray(next) ? next[0] : next;
              setValue(v);
              onChange?.(v);
            }}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof ControlledSlider> = {
  title: 'Components/Slider/Examples/Controlled',
  component: ControlledSlider,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof ControlledSlider>;

export const Controlled: Story = {
  tags: ['dev', 'test'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const handle = canvas.getByTestId(TEST_IDS.handle);

    await step('initial: aria-valuenow reflects controlled value=50', async () => {
      await waitFor(() => expect(handle).toHaveAttribute('aria-valuenow', '50'));
    });

    await step('keyboard ArrowRight: parent state updates and DOM aria-valuenow reflects new value', async () => {
      handle.focus();
      await waitFor(() => expect(handle).toHaveFocus());
      // rc-slider читает `e.which || e.keyCode`, поэтому передаём ArrowRight=39.
      fireEvent.keyDown(handle, { key: 'ArrowRight', code: 'ArrowRight', keyCode: 39, which: 39 });
      await waitFor(() => expect(args.onChange).toHaveBeenCalled());
      expect(args.onChange).toHaveBeenLastCalledWith(60);
      await waitFor(() => expect(handle).toHaveAttribute('aria-valuenow', '60'));
    });
  },
};
