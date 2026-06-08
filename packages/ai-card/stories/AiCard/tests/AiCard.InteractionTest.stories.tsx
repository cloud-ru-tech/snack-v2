import { AiCard, AiCardProps } from '@ds/ai-card';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const onChangeDisabled = fn();

const meta: Meta<typeof AiCard> = {
  title: 'AI/AiCard/Tests/Interaction',
  component: AiCard,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    title: 'Card title',
    children: 'Default content',
    checked: false,
    onChange: fn(),
    onClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiCard>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function Render(args: AiCardProps) {
    const [checked, setChecked] = useState(args.checked ?? false);
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Interaction</DemoTitle>
          <DemoHint>Enabled-карточка переключается кликом / Enter / Space; disabled-карточка не реагирует.</DemoHint>
          <DemoActions align='center'>
            <AiCard
              {...args}
              disabled={false}
              checked={checked}
              onChange={(next: boolean) => {
                setChecked(next);
                args.onChange?.(next);
              }}
              data-test-id={TEST_IDS.root}
            />
            <AiCard {...args} disabled checked={false} onChange={onChangeDisabled} data-test-id={TEST_IDS.disabled} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ args, canvasElement, step }) => {
    onChangeDisabled.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);
    const disabledCard = canvas.getByTestId(TEST_IDS.disabled);

    await step('click: toggles checked → true', async () => {
      await userEvent.click(root);
      expect(args.onChange).toHaveBeenCalledWith(true);
      expect(args.onClick).toHaveBeenCalledTimes(1);
      await expect(root).toHaveAttribute('aria-pressed', 'true');
      await expect(root).toHaveAttribute('data-checked', 'true');
    });

    await step('click: toggles checked → false', async () => {
      await userEvent.click(root);
      expect(args.onChange).toHaveBeenCalledWith(false);
      expect(args.onClick).toHaveBeenCalledTimes(2);
      await expect(root).toHaveAttribute('aria-pressed', 'false');
    });

    await step('keyboard: Tab focuses root', async () => {
      root.focus();
      await expect(root).toHaveFocus();
    });

    await step('keyboard: Enter triggers toggle', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onChange).toHaveBeenCalledWith(true);
      expect(args.onClick).toHaveBeenCalledTimes(3);
    });

    await step('keyboard: Space triggers toggle', async () => {
      await userEvent.keyboard(' ');
      expect(args.onChange).toHaveBeenCalledWith(false);
      expect(args.onClick).toHaveBeenCalledTimes(4);
    });

    await step('disabled: native disabled attribute is set', async () => {
      await expect(disabledCard).toBeDisabled();
    });

    await step('disabled: click does not fire onChange', async () => {
      await userEvent.click(disabledCard, { pointerEventsCheck: 0 });
      expect(onChangeDisabled).not.toHaveBeenCalled();
    });
  },
};
