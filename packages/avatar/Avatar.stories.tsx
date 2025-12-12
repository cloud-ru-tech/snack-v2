import type { Meta, StoryObj } from '@storybook/react';
import { APPEARANCE, Avatar, AvatarProps, SHAPE, SIZE } from './src';

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar',
  component: Avatar,
  args: {
    name: 'John Doe',
    size: SIZE.S,
    shape: SHAPE.Round,
    appearance: APPEARANCE.Neutral,
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'Имя пользователя для генерации аббревиатуры',
    },
    src: {
      control: 'text',
      description: 'URL изображения аватара',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер аватара',
    },
    shape: {
      control: 'radio',
      options: Object.values(SHAPE),
      description: 'Форма аватара',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    showTwoSymbols: {
      control: 'boolean',
      description: 'Отображать два символа вместо одного',
    },
  },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const Basic: Story = {};

export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
  },
};

export const TwoSymbols: Story = {
  args: {
    name: 'John Doe',
    showTwoSymbols: true,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="XS" size={SIZE.Xs} />
      <Avatar name="S" size={SIZE.S} />
      <Avatar name="M" size={SIZE.M} />
      <Avatar name="XL" size={SIZE.Xl} />
      <Avatar name="3XL" size={SIZE['3Xl']} />
      <Avatar name="6XL" size={SIZE['6Xl']} />
      <Avatar name="10XL" size={SIZE['10Xl']} />
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Avatar name="Round" shape={SHAPE.Round} />
      <Avatar name="Square" shape={SHAPE.Square} />
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="Neutral" appearance={APPEARANCE.Neutral} />
      <Avatar name="Primary" appearance={APPEARANCE.Primary} />
      <Avatar name="Red" appearance={APPEARANCE.Red} />
      <Avatar name="Orange" appearance={APPEARANCE.Orange} />
      <Avatar name="Yellow" appearance={APPEARANCE.Yellow} />
      <Avatar name="Green" appearance={APPEARANCE.Green} />
      <Avatar name="Blue" appearance={APPEARANCE.Blue} />
      <Avatar name="Violet" appearance={APPEARANCE.Violet} />
      <Avatar name="Pink" appearance={APPEARANCE.Pink} />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <div style={{ minWidth: 80, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <div
              key={appearance}
              style={{ display: 'flex', gap: 8, alignItems: 'center', flexDirection: 'column' }}
            >
              <Avatar name="JD" size={size} shape={SHAPE.Round} appearance={appearance} />
              <Avatar name="JD" size={size} shape={SHAPE.Square} appearance={appearance} />
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const WithLongName: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="John" />
      <Avatar name="John Doe" />
      <Avatar name="John Michael Doe" />
      <Avatar name="John Michael Doe" showTwoSymbols />
    </div>
  ),
};

export const ImageFallback: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <Avatar name="John Doe" src="https://invalid-url.com/image.jpg" />
      <Avatar name="Jane Smith" src="https://i.pravatar.cc/150?img=2" />
      <Avatar name="Bob Johnson" src="https://invalid-url.com/image.jpg" showTwoSymbols />
    </div>
  ),
};
