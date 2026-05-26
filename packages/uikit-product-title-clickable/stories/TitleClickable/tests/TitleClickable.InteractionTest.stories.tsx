import { TitleClickable } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof TitleClickable> = {
  title: 'Uikit Product/TitleClickable/Tests/Interaction',
  component: TitleClickable,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TitleClickable>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    href: '#',
    title: 'Click me',
    onClick: fn(e => {
      e.preventDefault();
      e.stopPropagation();
    }),
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по заголовку вызывает onClick один раз.</DemoHint>
        <DemoActions
          align='center'
          onClickCapture={e => {
            const anchor = (e.target as HTMLElement).closest('a');
            if (anchor) e.preventDefault();
          }}
        >
          <TitleClickable {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);

    await step('click: fires onClick once', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Tab focuses the title', async () => {
      root.blur();
      await userEvent.tab();
      await expect(root).toHaveFocus();
    });

    await step('keyboard: Enter fires onClick', async () => {
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });
  },
};
