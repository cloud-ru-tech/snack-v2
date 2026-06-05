import { AiButtonChevron, AiButtonChevronProps } from '@ds/ai-button-chevron';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const onClickDisabled = fn();

const meta: Meta<typeof AiButtonChevron> = {
  title: 'AI/ButtonChevron/Tests/Interaction',
  component: AiButtonChevron,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    opened: false,
    onClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiButtonChevron>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function Render(args: AiButtonChevronProps) {
    const [opened, setOpened] = useState(args.opened ?? false);
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Interaction</DemoTitle>
          <DemoHint>Enabled-кнопка переключает шеврон кликом / Enter; disabled-кнопка не реагирует.</DemoHint>
          <DemoActions align='center'>
            <AiButtonChevron
              {...args}
              opened={opened}
              onClick={event => {
                setOpened(prev => !prev);
                args.onClick?.(event);
              }}
              data-test-id={TEST_IDS.root}
            />
            <AiButtonChevron {...args} disabled onClick={onClickDisabled} data-test-id={TEST_IDS.disabled} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ args, canvasElement, step }) => {
    onClickDisabled.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);
    const disabledButton = canvas.getByTestId(TEST_IDS.disabled);

    await step('click: toggles opened → true', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalledTimes(1);
      await expect(root).toHaveAttribute('data-opened', 'true');
      await expect(root).toHaveAttribute('aria-expanded', 'true');
    });

    await step('click: toggles opened → false', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalledTimes(2);
      await expect(root).toHaveAttribute('aria-expanded', 'false');
    });

    await step('keyboard: Tab focuses root', async () => {
      root.focus();
      await expect(root).toHaveFocus();
    });

    await step('keyboard: Enter triggers toggle', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(3);
      await expect(root).toHaveAttribute('data-opened', 'true');
    });

    await step('disabled: native disabled attribute is set', async () => {
      await expect(disabledButton).toBeDisabled();
    });

    await step('disabled: click does not fire onClick', async () => {
      await userEvent.click(disabledButton, { pointerEventsCheck: 0 });
      expect(onClickDisabled).not.toHaveBeenCalled();
    });
  },
};
