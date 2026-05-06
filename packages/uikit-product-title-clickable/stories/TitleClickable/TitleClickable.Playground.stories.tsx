import { PlaceholderSVG } from '@ds/icons';
import { TitleClickable, TitleClickableAvatar, TitleClickableIcon } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { TITLE_CLICKABLE_TEST_ID } from './testIds';

const beforePresets = {
  none: undefined,
  icon: <TitleClickableIcon icon={<PlaceholderSVG />} />,
  avatar: <TitleClickableAvatar name='John Doe' subtitle='jdoe@example.com' />,
  node: <span>Custom node</span>,
};

const meta: Meta<typeof TitleClickable> = {
  title: 'Uikit Product/TitleClickable',
  component: TitleClickable,
  parameters: { layout: 'centered' },
  args: {
    href: '#',
    target: '_self',
    title: 'Title',
    fullWidth: false,
    showArrow: true,
    before: beforePresets.none,
    'data-test-id': TITLE_CLICKABLE_TEST_ID,
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
    icon: { control: false },
    avatar: { control: false },
    children: { control: false },
    titleTag: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<typeof TitleClickable>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TITLE_CLICKABLE_TEST_ID)).toBeVisible();
  },
};
