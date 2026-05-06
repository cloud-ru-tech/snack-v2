import { SegmentControl } from '@ds/segment-control';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import styles from './stories.module.scss';
import { SEGMENT_CONTROL_TEST_ID, segmentTestId } from './testIds';

const items = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', disabled: true },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
];

const meta: Meta<typeof SegmentControl> = {
  title: 'Components/SegmentControl',
  component: SegmentControl,
  parameters: { layout: 'centered', controls: { disable: true } },
  args: {
    items,
    defaultValue: 'one',
    onChange: fn(),
    'data-test-id': SEGMENT_CONTROL_TEST_ID,
  },
  decorators: [
    Story => (
      <div className={styles.item}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SegmentControl>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const one = canvas.getByTestId(segmentTestId('one'));
    const three = canvas.getByTestId(segmentTestId('three'));
    const four = canvas.getByTestId(segmentTestId('four'));

    await step('click: select "three"', async () => {
      await userEvent.click(three);
      expect(args.onChange).toHaveBeenCalledWith('three');
      expect(three).toHaveAttribute('aria-checked', 'true');
      expect(one).toHaveAttribute('aria-checked', 'false');
    });

    await step('keyboard: focus selected segment', async () => {
      three.focus();
      expect(three).toHaveFocus();
    });

    await step('keyboard: ArrowRight focuses "four"', async () => {
      await userEvent.keyboard('{ArrowRight}');
      expect(four).toHaveFocus();
    });

    await step('keyboard: ArrowLeft skips disabled "two" → "one"', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      expect(three).toHaveFocus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(one).toHaveFocus();
    });
  },
};
