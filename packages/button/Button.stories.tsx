import type { Meta, StoryObj } from '@storybook/react';
import { Button, ButtonProps } from './src';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Click me',
    variant: 'primary',
    size: 'md'
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: ['primary', 'secondary', 'ghost']
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg']
    },
    isFullWidth: {
      control: 'boolean'
    }
  }
};

export default meta;
type Story = StoryObj<ButtonProps>;

export const Basic: Story = {};

export const FullWidth: Story = {
  args: { isFullWidth: true }
};

export const Disabled: Story = {
  args: { disabled: true }
};

export const Variants: Story = {
  render: (args) => (
    <div style={{ display: 'grid', gap: 12, gridTemplateColumns: 'repeat(3, 1fr)' }}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
    </div>
  )
};

