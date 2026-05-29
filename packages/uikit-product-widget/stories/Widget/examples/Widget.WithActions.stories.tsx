import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { WithActions as WithActionsDemo } from '../../../demos/examples/WithActions';
import { TEST_IDS } from '../testIds';

const meta: Meta = {
  title: 'Uikit Product/Widget/Examples/WithActions',
};

export default meta;
type Story = StoryObj;

export const WithActions: Story = {
  tags: ['dev', 'test'],
  render: () => <WithActionsDemo />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.actions)).toBeVisible();
  },
};
