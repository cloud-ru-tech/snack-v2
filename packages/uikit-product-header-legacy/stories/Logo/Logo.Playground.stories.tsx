import { HEADER_LOGO_MODE, Logo } from '@ds/uikit-product-header-legacy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof Logo> = {
  title: 'Uikit Product/Layout/Header Legacy/Logo',
  component: Logo,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Логотип legacy Header (Figma buttonSimpleNeutral + CloudLogo).</DemoHint>
        <DemoActions align='center'>
          <Logo {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    href: '#',
    mode: HEADER_LOGO_MODE.Prod,
    loading: false,
    'data-test-id': TEST_IDS.root,
    onClick: fn(),
  },
  argTypes: {
    mode: {
      control: 'radio',
      options: Object.values(HEADER_LOGO_MODE),
      description: 'Окружение / вариант логотипа',
    },
    path: { control: 'text', description: 'URL кастомной картинки' },
    href: { control: 'text' },
    loading: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof Logo>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
