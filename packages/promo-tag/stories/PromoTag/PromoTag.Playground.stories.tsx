import { PlaceholderSVG } from '@design-system/icons';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { action } from 'storybook/actions';

import promoTagReadme from '../../README.md?raw';
import { PromoTag, PromoTagProps } from '../../src';
import { APPEARANCE, ROLE_APPEARANCE, SIZE } from '../../src/constants';

const meta: Meta<PromoTagProps> = {
  title: 'Components/PromoTag',
  component: PromoTag,
  parameters: {
    readme: {
      content: promoTagReadme,
    },
  },
  args: {
    text: 'Promo tag',
    appearance: APPEARANCE.Primary,
    role: ROLE_APPEARANCE.Accent,
    size: SIZE.Xs,
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст компонента',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
    role: {
      control: 'select',
      options: Object.values(ROLE_APPEARANCE),
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;

type PlaygroundArgs = Omit<PromoTagProps, 'beforeContent' | 'afterContent'> & {
  beforeContent?: boolean;
  afterContent?: boolean;
  hasOnClick?: boolean;
};

type Story = StoryObj<PlaygroundArgs>;

const icons = {
  before: {
    [SIZE.Xs]: 16,
    [SIZE.S]: 16,
    [SIZE.M]: 24,
  },
  after: {
    [SIZE.Xs]: 16,
    [SIZE.S]: 16,
    [SIZE.M]: 24,
  },
} as const;

const Template: StoryFn<PlaygroundArgs> = ({ beforeContent, afterContent, ...args }: PlaygroundArgs) => (
  <div style={{ display: 'flex' }}>
    <PromoTag
      {...args}
      beforeContent={
        beforeContent ? (
          <PlaceholderSVG data-test-id='before-node' size={icons.before[args.size || SIZE.Xs]} />
        ) : undefined
      }
      afterContent={
        afterContent ? <PlaceholderSVG data-test-id='after-node' size={icons.after[args.size || SIZE.Xs]} /> : undefined
      }
      onClick={args.hasOnClick ? action('onClick') : undefined}
    />
  </div>
);

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: Template,
  args: {
    beforeContent: false,
    afterContent: false,
    hasOnClick: false,
  },
  argTypes: {
    beforeContent: {
      name: '[Stories]: Before content',
    },
    afterContent: {
      name: '[Stories]: After content',
    },
    hasOnClick: {
      name: '[Stories]: Has onClick',
    },
  },
};
