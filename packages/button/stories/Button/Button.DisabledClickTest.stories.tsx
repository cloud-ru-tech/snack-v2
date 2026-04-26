import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { BUTTON_TEST_ID } from './testIds';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const DisabledClickTest: Story = {
  tags: ['test', 'dev'],
  args: {
    label: 'Disabled',
    disabled: true,
    onClick: fn(),
    'data-test-id': BUTTON_TEST_ID,
  },
  play: async ({ args, canvasElement, step }) => {
    const button = within(canvasElement).getByTestId(BUTTON_TEST_ID);

    await step('Button is disabled', async () => {
      await expect(button).toBeDisabled();
    });

    await step('Click does not fire onClick', async () => {
      await userEvent.click(button, { pointerEventsCheck: 0 });
      expect(args.onClick).not.toHaveBeenCalled();
    });
  },
};
