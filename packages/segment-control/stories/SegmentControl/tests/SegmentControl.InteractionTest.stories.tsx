import { SegmentControl, segmentTestId, TEST_IDS } from '@ds/segment-control';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';

const items = [
  { value: 'one', label: 'One' },
  { value: 'two', label: 'Two', disabled: true },
  { value: 'three', label: 'Three' },
  { value: 'four', label: 'Four' },
];

const meta: Meta<typeof SegmentControl> = {
  title: 'Components/SegmentControl/Tests/Interaction',
  component: SegmentControl,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    items,
    defaultValue: 'one',
    onChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Клики и стрелки навигируют по сегментам; disabled сегменты пропускаются.'}</DemoHint>
        <DemoActions align='center'>
          <div className={styles.item}>
            <SegmentControl {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
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

    await step('keyboard: ArrowRight auto-selects "four"', async () => {
      await userEvent.keyboard('{ArrowRight}');
      expect(four).toHaveFocus();
      expect(four).toHaveAttribute('aria-checked', 'true');
    });

    await step('keyboard: ArrowLeft skips disabled "two" → "one" with auto-select', async () => {
      await userEvent.keyboard('{ArrowLeft}');
      expect(three).toHaveFocus();
      await userEvent.keyboard('{ArrowLeft}');
      expect(one).toHaveFocus();
      expect(one).toHaveAttribute('aria-checked', 'true');
    });

    await step('keyboard: Home/End jump to first/last', async () => {
      await userEvent.keyboard('{End}');
      expect(four).toHaveFocus();
      expect(four).toHaveAttribute('aria-checked', 'true');
      await userEvent.keyboard('{Home}');
      expect(one).toHaveFocus();
      expect(one).toHaveAttribute('aria-checked', 'true');
    });
  },
};

const numericItems = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
];

export const NumericValueCallback: Story = {
  tags: ['test', 'dev'],
  args: {
    items: numericItems,
    defaultValue: 1,
    onChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const three = canvas.getByTestId(segmentTestId(3));

    await step('click: numeric segment fires onChange with number type', async () => {
      await userEvent.click(three);
      expect(args.onChange).toHaveBeenCalledWith(3);
      const call = (args.onChange as ReturnType<typeof fn>).mock.calls[0][0];
      expect(typeof call).toBe('number');
    });
  },
};
