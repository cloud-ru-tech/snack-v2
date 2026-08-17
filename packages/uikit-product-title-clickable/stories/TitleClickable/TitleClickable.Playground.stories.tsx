import { PlaceholderSVG } from '@ds/icons/interface/system';
import { TitleClickable, TitleClickableProps } from '@ds/uikit-product-title-clickable';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const avatar = {
  name: 'John Doe',
  subtitle: 'jdoe@example.com',
};

const customChildren = <span>Custom node</span>;

type StoryProps = TitleClickableProps & {
  showIcon: boolean;
  showChildren: boolean;
  showAvatar: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/TitleClickable',
  component: TitleClickable,
  parameters: { layout: 'fullscreen' },
  args: {
    href: '#',
    target: '_self',
    title: 'Title',
    fullWidth: true,
    showArrow: true,
    showIcon: false,
    showChildren: false,
    showAvatar: false,
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
    showIcon: {
      name: '[Story]: Show icon',
      type: 'boolean',
    },
    showChildren: {
      name: '[Story]: Show children',
      type: 'boolean',
    },
    showAvatar: {
      name: '[Story]: Show avatar',
      type: 'boolean',
    },
    icon: { table: { disable: true } },
    avatar: { table: { disable: true } },
    children: { table: { disable: true } },
    titleTag: { control: 'text' },
    onClick: { action: 'onClick' },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showIcon, showChildren, showAvatar, ...args }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Кликабельный заголовок-ссылка: иконка слева, children или avatar после заголовка, стрелка справа.
        </DemoHint>
        <DemoActions align='center'>
          <TitleClickable
            {...args}
            icon={showIcon ? <PlaceholderSVG /> : undefined}
            avatar={showAvatar ? avatar : undefined}
          >
            {showChildren ? customChildren : undefined}
          </TitleClickable>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
