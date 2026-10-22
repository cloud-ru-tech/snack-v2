import { AiButtonClose, AiButtonCloseProps } from '@ds/ai-button-close';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const onClickDisabled = fn();

const meta: Meta<typeof AiButtonClose> = {
  title: 'AI/AiButtonClose/Tests/Interaction',
  component: AiButtonClose,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiButtonClose>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: (args: AiButtonCloseProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>Крестик сообщает о нажатии кликом и Enter; disabled-крестик не реагирует.</DemoHint>
        <DemoActions align='center'>
          <AiButtonClose {...args} />
          <AiButtonClose disabled onClick={onClickDisabled} data-test-id={TEST_IDS.disabled} aria-label='Удалить' />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    onClickDisabled.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);
    const disabledButton = canvas.getByTestId(TEST_IDS.disabled);

    await step('a11y: default aria-label from locale, override via prop', async () => {
      await expect(root.getAttribute('aria-label')).toBeTruthy();
      await expect(disabledButton).toHaveAttribute('aria-label', 'Удалить');
    });

    await step('click: fires onClick once', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Enter fires onClick again', async () => {
      root.focus();
      await expect(root).toHaveFocus();
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });

    await step('disabled: click does not fire onClick', async () => {
      await expect(disabledButton).toBeDisabled();
      await userEvent.click(disabledButton, { pointerEventsCheck: 0 });
      expect(onClickDisabled).not.toHaveBeenCalled();
    });
  },
};
