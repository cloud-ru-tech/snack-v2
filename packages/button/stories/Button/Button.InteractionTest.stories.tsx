import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import styles from './stories.module.scss';
import { BUTTON_TEST_ID } from './testIds';

const DISABLED_BUTTON_TEST_ID = `${BUTTON_TEST_ID}-disabled`;

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'centered', controls: { disable: true } },
  args: {
    label: 'Click me',
    onClick: fn(),
    'data-test-id': BUTTON_TEST_ID,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    onClickDisabled: fn(),
  } as never,
  render: args => (
    <div className={styles.row}>
      <Button {...args} label='Click me' disabled={false} data-test-id={BUTTON_TEST_ID} />
      <Button
        {...args}
        label='Disabled'
        disabled
        onClick={(args as unknown as { onClickDisabled: () => void }).onClickDisabled}
        data-test-id={DISABLED_BUTTON_TEST_ID}
      />
    </div>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByTestId(BUTTON_TEST_ID);
    const disabledButton = canvas.getByTestId(DISABLED_BUTTON_TEST_ID);
    const onClickDisabled = (args as unknown as { onClickDisabled: () => void }).onClickDisabled;

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

    await step('keyboard: Space triggers click', async () => {
      await userEvent.keyboard(' ');
      expect(args.onClick).toHaveBeenCalledTimes(4);
    });

    await step('disabled: button is disabled', async () => {
      await expect(disabledButton).toBeDisabled();
    });

    await step('disabled: click does not fire onClick', async () => {
      await userEvent.click(disabledButton, { pointerEventsCheck: 0 });
      expect(onClickDisabled).not.toHaveBeenCalled();
    });
  },
};
