import { HEADER_LOGO_MODE, Logo } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof Logo> = {
  title: 'Uikit Product/Layout/Header Legacy/Logo/tests',
  component: Logo,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const InteractionTest: Story = {
  tags: ['dev', 'test'],
  args: {
    href: '#',
    mode: HEADER_LOGO_MODE.Prod,
    'data-test-id': TEST_IDS.root,
    onClick: fn(),
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Interaction</DemoTitle>
        <DemoHint>Клик по логотипу вызывает onClick.</DemoHint>
        <DemoActions align='center'>
          <Logo {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);

    await step('logo is visible', async () => {
      await expect(root).toBeVisible();
      await expect(canvas.getByTestId(TEST_IDS.icon)).toBeVisible();
    });

    await step('click calls onClick', async () => {
      await userEvent.click(root);
      await expect(args.onClick).toHaveBeenCalledOnce();
    });
  },
};
