import { CopyLine } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { COPY_LINE_TEST_ID } from './testIds';

const meta: Meta<typeof CopyLine> = {
  title: 'Uikit Product/Copy/CopyLine',
  component: CopyLine,
  parameters: { layout: 'centered', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof CopyLine>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    content: 'value-to-copy',
    onClick: fn(),
    'data-test-id': COPY_LINE_TEST_ID,
    copyButtonHideStrategy: 'never',
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(COPY_LINE_TEST_ID);

    await step('Click fires onClick', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalled();
    });
  },
};
