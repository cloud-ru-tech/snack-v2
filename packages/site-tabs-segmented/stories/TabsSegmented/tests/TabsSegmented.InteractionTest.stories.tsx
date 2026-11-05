import { TabsSegmented } from '@ds/site-tabs-segmented';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ITEMS_WITH_DISABLED } from '../fixtures';
import { TEST_IDS } from '../testIds';

const onItemClick = fn();

const meta: Meta<typeof TabsSegmented> = {
  title: 'Site/TabsSegmented/Tests/Interaction',
  component: TabsSegmented,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    items: ITEMS_WITH_DISABLED.map(item => ({ ...item, onClick: onItemClick })),
    onChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof TabsSegmented>;

const itemId = (value: string) => `${TEST_IDS.itemPrefix}-${value}`;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Выбор кликом, фокус стрелками и Home/End, выбор Enter; недоступная вкладка пропускается.</DemoHint>
        <DemoActions align='start'>
          <TabsSegmented {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const first = canvas.getByTestId(itemId('infrastructure'));
    const second = canvas.getByTestId(itemId('data'));
    const third = canvas.getByTestId(itemId('ai'));
    const disabled = canvas.getByTestId(itemId('archive'));

    await step('initial: first item is selected', async () => {
      await expect(first).toHaveAttribute('aria-selected', 'true');
      await expect(second).toHaveAttribute('aria-selected', 'false');
    });

    await step('click: selects the item, calls onChange and item onClick', async () => {
      await userEvent.click(second);
      await expect(second).toHaveAttribute('aria-selected', 'true');
      await expect(first).toHaveAttribute('aria-selected', 'false');
      await expect(args.onChange).toHaveBeenLastCalledWith('data');
      await expect(onItemClick).toHaveBeenCalledTimes(1);
    });

    await step('click: the selected item does not call onChange again', async () => {
      await userEvent.click(second);
      await expect(args.onChange).toHaveBeenCalledTimes(1);
      await expect(onItemClick).toHaveBeenCalledTimes(2);
    });

    await step('keyboard: only the selected item is in the Tab order', async () => {
      await expect(second).toHaveAttribute('tabindex', '0');
      await expect(first).toHaveAttribute('tabindex', '-1');
      await expect(third).toHaveAttribute('tabindex', '-1');
    });

    await step('keyboard: ArrowRight moves focus, Enter selects', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await expect(third).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      await expect(third).toHaveAttribute('aria-selected', 'true');
      await expect(args.onChange).toHaveBeenLastCalledWith('ai');
    });

    await step('keyboard: arrows skip the disabled item and wrap around', async () => {
      await userEvent.keyboard('{ArrowRight}');
      await expect(first).toHaveFocus();
      await userEvent.keyboard('{ArrowLeft}');
      await expect(third).toHaveFocus();
    });

    await step('keyboard: Home and End focus the first and the last enabled item', async () => {
      await userEvent.keyboard('{Home}');
      await expect(first).toHaveFocus();
      await userEvent.keyboard('{End}');
      await expect(third).toHaveFocus();
    });

    await step('disabled item is not selectable', async () => {
      await expect(disabled).toBeDisabled();
      await userEvent.click(disabled, { pointerEventsCheck: 0 });
      await expect(disabled).toHaveAttribute('aria-selected', 'false');
      await expect(args.onChange).toHaveBeenCalledTimes(2);
    });
  },
};
