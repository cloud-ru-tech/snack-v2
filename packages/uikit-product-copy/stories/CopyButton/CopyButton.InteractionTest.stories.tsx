import { CopyButton } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { COPY_BUTTON_TEST_ID } from './testIds';

const meta: Meta<typeof CopyButton> = {
  title: 'Uikit Product/Copy/CopyButton',
  component: CopyButton,
  parameters: { layout: 'centered', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    valueToCopy: 'payload',
    onClick: fn(),
    'data-test-id': COPY_BUTTON_TEST_ID,
  },
  play: async ({ args, canvasElement, step }) => {
    const button = within(canvasElement).getByTestId(COPY_BUTTON_TEST_ID);

    await step('Click fires onClick', async () => {
      await userEvent.click(button);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};
