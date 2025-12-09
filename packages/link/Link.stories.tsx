import type { Meta, StoryObj } from '@storybook/react';
import { Link, LinkProps } from './src';

const meta: Meta<LinkProps> = {
  title: 'Components/Link',
  component: Link,
  args: {
    children: 'Open link',
    href: '#',
    variant: 'primary',
    underline: 'hover'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'muted', 'ghost']
    },
    weight: {
      control: 'radio',
      options: ['regular', 'semibold']
    },
    underline: {
      control: 'radio',
      options: ['hover', 'always', 'none']
    },
    isExternal: { control: 'boolean' }
  }
};

export default meta;
type Story = StoryObj<LinkProps>;

export const Basic: Story = {};

export const External: Story = {
  args: {
    isExternal: true,
    href: 'https://example.com'
  }
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12 }}>
      <Link {...args} variant="primary">
        Primary link
      </Link>
      <Link {...args} variant="muted">
        Muted link
      </Link>
      <Link {...args} variant="ghost">
        Ghost link
      </Link>
    </div>
  )
};

