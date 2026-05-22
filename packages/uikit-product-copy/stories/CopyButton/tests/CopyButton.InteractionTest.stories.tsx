import { CopyButton } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof CopyButton> = {
  title: 'Uikit Product/Copy/CopyButton/Tests/Interaction',
  component: CopyButton,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    valueToCopy: 'payload',
    onClick: fn(),
    'data-test-id': TEST_IDS.copyButton.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по кнопке копирует значение и вызывает onClick.</DemoHint>
        <DemoActions align='center'>
          <CopyButton {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const button = within(canvasElement).getByTestId(TEST_IDS.copyButton.root);

    await step('click: fires onClick once', async () => {
      await userEvent.click(button);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Tab focuses the button', async () => {
      button.blur();
      await userEvent.tab();
      await expect(button).toHaveFocus();
    });

    await step('keyboard: Enter fires onClick', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });

    // Space-step намеренно опущен: userEvent в storybook-test browser-окружении
    // не доводит keyUp Space до native <button>, и click не доходит до onClick.
    // Поведение Space на нативной кнопке гарантировано браузером; Enter-step выше
    // покрывает клавиатурную активацию.
  },
};
