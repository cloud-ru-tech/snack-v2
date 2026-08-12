import { PlatformLogo, VARIANT } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof PlatformLogo> = {
  title: 'Uikit Product/Layout/Header Legacy/Platform Logo',
  component: PlatformLogo,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Иконка платформы legacy Header (Figma platformSelectorIcons).</DemoHint>
        <DemoActions align='center'>
          <PlatformLogo {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    variant: VARIANT.Evolution,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант платформы',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PlatformLogo>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
