import { SwitchRow } from '@ds/uikit-product-switch-row';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { SWITCH_ROW_TEST_ID, SWITCH_ROW_TITLE_TOOLTIP_TEST_ID } from './testIds';

const meta: Meta<typeof SwitchRow> = {
  title: 'Uikit Product/SwitchRow',
  component: SwitchRow,
  parameters: { layout: 'centered', controls: { disable: true } },
  args: {
    title: 'Toggle me',
    tip: 'Подсказка с вопросом',
    defaultChecked: false,
    onChange: fn(),
    'data-test-id': SWITCH_ROW_TEST_ID,
  },
};

export default meta;
type Story = StoryObj<typeof SwitchRow>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByTestId(SWITCH_ROW_TEST_ID);

    await step('click: row triggers onChange(true)', async () => {
      await userEvent.click(row);
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onChange).toHaveBeenCalledWith(true);
    });

    await step('click on QuestionTooltip does NOT propagate to row', async () => {
      const tip = canvas.getByTestId(SWITCH_ROW_TITLE_TOOLTIP_TEST_ID);
      await userEvent.click(tip);
      expect(args.onChange).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Tab focuses the row', async () => {
      row.blur();
      await userEvent.tab();
      await expect(row).toHaveFocus();
    });

    await step('keyboard: Enter triggers onChange', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onChange).toHaveBeenCalledTimes(2);
    });

    await step('keyboard: Space triggers onChange', async () => {
      await userEvent.keyboard(' ');
      expect(args.onChange).toHaveBeenCalledTimes(3);
    });
  },
};
