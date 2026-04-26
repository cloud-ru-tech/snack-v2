import { Button } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { BUTTON_TEST_ID } from './testIds';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const LinkButton: Story = {
  tags: ['dev'],
  args: {
    as: 'a',
    href: 'https://example.com',
    target: '_blank',
    label: 'Open docs',
    'data-test-id': BUTTON_TEST_ID,
  },
  play: async ({ canvasElement }) => {
    const link = within(canvasElement).getByTestId(BUTTON_TEST_ID);
    await expect(link).toHaveAttribute('href', 'https://example.com');
    await expect(link).toHaveAttribute('target', '_blank');
    await expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  },
};
