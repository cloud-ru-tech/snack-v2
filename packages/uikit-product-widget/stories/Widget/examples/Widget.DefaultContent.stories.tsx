import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DefaultContent as DefaultContentDemo } from '../../../demos/examples/DefaultContent';
import { TEST_IDS } from '../testIds';

const meta: Meta = {
  title: 'Uikit Product/Widget/Examples/DefaultContent',
};

export default meta;
type Story = StoryObj;

export const DefaultContent: Story = {
  tags: ['dev', 'test'],
  render: () => <DefaultContentDemo />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.header)).toBeVisible();
  },
};
