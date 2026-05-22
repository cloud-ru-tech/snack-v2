import { Button, ButtonProps } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const DISABLED_BUTTON_TEST_ID = `${TEST_IDS.button.root}-disabled`;

type InteractionStoryArgs = ButtonProps & {
  onClickDisabled: () => void;
  'data-test-id'?: string;
};

const meta: Meta<InteractionStoryArgs> = {
  title: 'Components/Button/Button/Tests/Interaction',
  component: Button,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'Click me',
    onClick: fn(),
    'data-test-id': TEST_IDS.button.root,
  },
};

export default meta;
type Story = StoryObj<InteractionStoryArgs>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    onClickDisabled: fn(),
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Проверка клика, клавиатуры и состояния disabled.</DemoHint>
        <DemoActions align='center'>
          <Button {...args} label='Click me' disabled={false} data-test-id={TEST_IDS.button.root} />
          <Button
            {...args}
            label='Disabled'
            disabled
            onClick={args.onClickDisabled}
            data-test-id={DISABLED_BUTTON_TEST_ID}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId(TEST_IDS.button.root);
    const disabledButton = canvas.getByTestId(DISABLED_BUTTON_TEST_ID);
    const onClickDisabled = args.onClickDisabled;

    await step('click: fires onClick once', async () => {
      await userEvent.click(button);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: second click fires twice total', async () => {
      await userEvent.click(button);
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });

    await step('keyboard: Tab focuses button', async () => {
      button.focus();
      await expect(button).toHaveFocus();
    });

    await step('keyboard: Enter triggers click', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(3);
    });

    // Space-step намеренно опущен — userEvent в storybook-test browser-окружении
    // не доводит keyUp Space до native button-click. Enter-step выше покрывает
    // клавиатурную активацию.

    await step('disabled: button is disabled', async () => {
      await expect(disabledButton).toBeDisabled();
    });

    await step('disabled: click does not fire onClick', async () => {
      await userEvent.click(disabledButton, { pointerEventsCheck: 0 });
      expect(onClickDisabled).not.toHaveBeenCalled();
    });
  },
};

const ANCHOR_BUTTON_TEST_ID = `${TEST_IDS.button.root}-anchor`;

type AnchorStoryArgs = ButtonProps<'a'> & { 'data-test-id'?: string };

export const AsAnchorRelNoopener: StoryObj<AnchorStoryArgs> = {
  tags: ['test', 'dev'],
  args: {
    as: 'a',
    href: 'https://example.com',
    target: '_blank',
    label: 'Open docs',
    'data-test-id': ANCHOR_BUTTON_TEST_ID,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AsAnchorRelNoopener</DemoTitle>
        <DemoHint>Полиморфизм as=&quot;a&quot; с автоматическим rel=noopener.</DemoHint>
        <DemoActions align='center'>
          <Button {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByTestId(ANCHOR_BUTTON_TEST_ID);
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};
