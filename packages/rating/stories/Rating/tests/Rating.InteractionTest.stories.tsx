import { Rating, RatingProps } from '@ds/rating';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<RatingProps> = {
  title: 'Components/Rating/Tests/Interaction',
  component: Rating,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    count: 5,
    defaultValue: 0,
    allowHalf: false,
    allowClear: false,
    readonly: false,
    'data-test-id': TEST_IDS.root,
    onChange: fn(),
  },
  decorators: [
    (Story, ctx) => (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>{ctx.name}</DemoTitle>
          <DemoHint>Проверка интеракций со звёздами рейтинга.</DemoHint>
          <DemoActions align='center'>
            <Story />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    ),
  ],
};

export default meta;
type Story = StoryObj<RatingProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const onChange = args.onChange as ReturnType<typeof fn>;
    const canvas = within(canvasElement);

    await step('click: 3rd star calls onChange(3)', async () => {
      const star = canvas.getByTestId(`${TEST_IDS.star}-3`);
      const rightHalf = within(star).getByTestId(TEST_IDS.starHalfRight);
      await userEvent.click(rightHalf);
      expect(onChange).toHaveBeenCalledWith(3);
    });

    await step('keyboard: Tab focuses an interactive star', async () => {
      const root = canvas.getByTestId(TEST_IDS.root);
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      await userEvent.tab();
      expect(root.contains(document.activeElement)).toBe(true);
    });
  },
};

export const AllowClear: Story = {
  tags: ['test', 'dev'],
  args: { defaultValue: 3, allowClear: true },
  play: async ({ args, canvasElement, step }) => {
    const onChange = args.onChange as ReturnType<typeof fn>;
    const canvas = within(canvasElement);

    await step('click: re-click selected star with allowClear → onChange(0)', async () => {
      const star = canvas.getByTestId(`${TEST_IDS.star}-3`);
      const rightHalf = within(star).getByTestId(TEST_IDS.starHalfRight);
      await userEvent.click(rightHalf);
      expect(onChange).toHaveBeenLastCalledWith(0);
    });
  },
};

export const AllowHalf: Story = {
  tags: ['test', 'dev'],
  args: { allowHalf: true },
  play: async ({ args, canvasElement, step }) => {
    const onChange = args.onChange as ReturnType<typeof fn>;
    const canvas = within(canvasElement);

    await step('click: left half of 1st star → onChange(0.5)', async () => {
      const star = canvas.getByTestId(`${TEST_IDS.star}-1`);
      const leftHalf = within(star).getByTestId(TEST_IDS.starHalfLeft);
      await userEvent.click(leftHalf);
      expect(onChange).toHaveBeenCalledWith(0.5);
    });

    await step('click: left half of 3rd star → onChange(2.5)', async () => {
      onChange.mockClear();
      const star = canvas.getByTestId(`${TEST_IDS.star}-3`);
      const leftHalf = within(star).getByTestId(TEST_IDS.starHalfLeft);
      await userEvent.click(leftHalf);
      expect(onChange).toHaveBeenCalledWith(2.5);
    });
  },
};
