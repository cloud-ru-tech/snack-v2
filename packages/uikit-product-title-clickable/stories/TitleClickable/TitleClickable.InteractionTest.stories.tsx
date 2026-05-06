import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { TITLE_CLICKABLE_TEST_ID } from './testIds';

const meta: Meta<typeof TitleClickable> = {
  title: 'Uikit Product/TitleClickable',
  component: TitleClickable,
  parameters: { layout: 'centered', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TitleClickable>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    href: '#',
    title: 'Click me',
    onClick: fn(e => e.preventDefault()),
    'data-test-id': TITLE_CLICKABLE_TEST_ID,
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click on title', async () => {
      await userEvent.click(canvas.getByTestId(TITLE_CLICKABLE_TEST_ID));
    });
    await step('onClick called once', () => {
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });
  },
};
