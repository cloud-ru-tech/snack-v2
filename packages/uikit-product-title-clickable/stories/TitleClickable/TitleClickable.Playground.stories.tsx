import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable, TitleClickableAvatar, TitleClickableIcon } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const beforePresets = {
  none: undefined,
  icon: <TitleClickableIcon icon={<PlaceholderSVG />} />,
  avatar: <TitleClickableAvatar name='John Doe' subtitle='jdoe@example.com' />,
  node: <span>Custom node</span>,
};

const meta: Meta<typeof TitleClickable> = {
  title: 'Uikit Product/TitleClickable',
  component: TitleClickable,
  parameters: { layout: 'fullscreen' },
  args: {
    href: '#',
    target: '_self',
    title: 'Title',
    fullWidth: true,
    showArrow: true,
    before: beforePresets.none,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    href: { control: 'text' },
    target: {
      control: 'radio',
      options: ['_self', '_blank', '_parent', '_top'],
    },
    title: { control: 'text' },
    fullWidth: { control: 'boolean' },
    showArrow: { control: 'boolean' },
    before: {
      control: 'select',
      options: Object.keys(beforePresets),
      mapping: beforePresets,
      description: 'Слот слева: иконка / аватар / произвольная нода',
    },
    icon: { table: { disable: true } },
    avatar: { table: { disable: true } },
    children: { table: { disable: true } },
    titleTag: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleClickable>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кликабельный заголовок-ссылка с опциональным слотом слева и стрелкой справа.</DemoHint>
        <DemoActions align='center'>
          <TitleClickable {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
