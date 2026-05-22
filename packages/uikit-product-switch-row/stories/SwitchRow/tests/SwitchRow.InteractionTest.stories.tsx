import { SwitchRow } from '@ds/uikit-product-switch-row';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof SwitchRow> = {
  title: 'Uikit Product/SwitchRow/Tests/Interaction',
  component: SwitchRow,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    title: 'Toggle me',
    tip: 'Подсказка с вопросом',
    defaultChecked: false,
    onChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof SwitchRow>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по строке переключает switch; клик по tooltip не пробрасывается.</DemoHint>
        <DemoActions block>
          <SwitchRow {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const row = canvas.getByTestId(TEST_IDS.root);

    await step('click: row triggers onChange(true)', async () => {
      await userEvent.click(row);
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onChange).toHaveBeenCalledWith(true);
    });

    await step('click on QuestionTooltip does NOT propagate to row', async () => {
      const tip = canvas.getByTestId(TEST_IDS.titleTooltip);
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

    // Space-step намеренно опущен — userEvent в storybook-test browser-окружении
    // не доводит keyUp Space до нативного click. Enter-step выше покрывает
    // клавиатурную активацию.
  },
};
