import type { Meta, StoryObj } from '@storybook/react';
import {
  APPEARANCE,
  ButtonFilled,
  ButtonFilledProps,
  ButtonTonal,
  ButtonTonalProps,
  ButtonOutline,
  ButtonOutlineProps,
  ButtonElevated,
  ButtonElevatedProps,
  ButtonSimple,
  ButtonSimpleProps,
  ButtonFunction,
  ButtonFunctionProps,
  SIZE,
} from './src';

const filledMeta: Meta<ButtonFilledProps> = {
  title: 'Components/Button/ButtonFilled',
  component: ButtonFilled,
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст кнопки',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид кнопки',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер кнопки',
    },
    disabled: {
      control: 'boolean',
      description: 'Неактивное состояние',
    },
    loading: {
      control: 'boolean',
      description: 'Состояние загрузки',
    },
    fullWidth: {
      control: 'boolean',
      description: 'Полная ширина',
    },
  },
};

export default filledMeta;
type Story = StoryObj<ButtonFilledProps>;

export const FilledBasic: Story = {
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const FilledSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonFilled label="Small" size={SIZE.S} appearance={APPEARANCE.Primary} />
      <ButtonFilled label="Medium" size={SIZE.M} appearance={APPEARANCE.Primary} />
      <ButtonFilled label="Large" size={SIZE.L} appearance={APPEARANCE.Primary} />
    </div>
  ),
};

export const FilledAppearances: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <ButtonFilled label="Primary" appearance={APPEARANCE.Primary} />
      <ButtonFilled label="Neutral" appearance={APPEARANCE.Neutral} />
      <ButtonFilled label="Destructive" appearance={APPEARANCE.Destructive} />
    </div>
  ),
};

export const FilledStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <ButtonFilled label="Default" appearance={APPEARANCE.Primary} />
        <ButtonFilled label="Disabled" appearance={APPEARANCE.Primary} disabled />
        <ButtonFilled label="Loading" appearance={APPEARANCE.Primary} loading />
      </div>
    </div>
  ),
};

export const FilledAllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 60, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <ButtonFilled key={appearance} label="Button" size={size} appearance={appearance} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ButtonTonal Stories
const tonalMeta: Meta<ButtonTonalProps> = {
  title: 'Components/Button/ButtonTonal',
  component: ButtonTonal,
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const TonalBasic: StoryObj<ButtonTonalProps> = {
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const TonalAllVariants: StoryObj<ButtonTonalProps> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 60, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <ButtonTonal key={appearance} label="Button" size={size} appearance={appearance} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ButtonOutline Stories
const outlineMeta: Meta<ButtonOutlineProps> = {
  title: 'Components/Button/ButtonOutline',
  component: ButtonOutline,
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const OutlineBasic: StoryObj<ButtonOutlineProps> = {
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const OutlineAllVariants: StoryObj<ButtonOutlineProps> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 60, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <ButtonOutline key={appearance} label="Button" size={size} appearance={appearance} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ButtonElevated Stories
const elevatedMeta: Meta<ButtonElevatedProps> = {
  title: 'Components/Button/ButtonElevated',
  component: ButtonElevated,
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const ElevatedBasic: StoryObj<ButtonElevatedProps> = {
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const ElevatedAllVariants: StoryObj<ButtonElevatedProps> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 60, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <ButtonElevated key={appearance} label="Button" size={size} appearance={appearance} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ButtonSimple Stories
const simpleMeta: Meta<ButtonSimpleProps> = {
  title: 'Components/Button/ButtonSimple',
  component: ButtonSimple,
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const SimpleBasic: StoryObj<ButtonSimpleProps> = {
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const SimpleAllVariants: StoryObj<ButtonSimpleProps> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 60, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <ButtonSimple key={appearance} label="Button" size={size} appearance={appearance} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ButtonFunction Stories
const functionMeta: Meta<ButtonFunctionProps> = {
  title: 'Components/Button/ButtonFunction',
  component: ButtonFunction,
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const FunctionBasic: StoryObj<ButtonFunctionProps> = {
  args: {
    label: 'Button',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
};

export const FunctionAllVariants: StoryObj<ButtonFunctionProps> = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {Object.values(SIZE).map((size) => (
        <div key={size} style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ minWidth: 60, fontSize: 12, color: '#666' }}>{size}</div>
          {Object.values(APPEARANCE).map((appearance) => (
            <ButtonFunction key={appearance} label="Button" size={size} appearance={appearance} />
          ))}
        </div>
      ))}
    </div>
  ),
};

// All Button Variants Comparison
export const AllButtonVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 600 }}>ButtonFilled</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonFilled label="Primary" appearance={APPEARANCE.Primary} />
          <ButtonFilled label="Neutral" appearance={APPEARANCE.Neutral} />
          <ButtonFilled label="Destructive" appearance={APPEARANCE.Destructive} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 600 }}>ButtonTonal</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonTonal label="Primary" appearance={APPEARANCE.Primary} />
          <ButtonTonal label="Neutral" appearance={APPEARANCE.Neutral} />
          <ButtonTonal label="Destructive" appearance={APPEARANCE.Destructive} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 600 }}>ButtonOutline</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonOutline label="Primary" appearance={APPEARANCE.Primary} />
          <ButtonOutline label="Neutral" appearance={APPEARANCE.Neutral} />
          <ButtonOutline label="Destructive" appearance={APPEARANCE.Destructive} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 600 }}>ButtonElevated</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonElevated label="Primary" appearance={APPEARANCE.Primary} />
          <ButtonElevated label="Neutral" appearance={APPEARANCE.Neutral} />
          <ButtonElevated label="Destructive" appearance={APPEARANCE.Destructive} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 600 }}>ButtonSimple</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonSimple label="Primary" appearance={APPEARANCE.Primary} />
          <ButtonSimple label="Neutral" appearance={APPEARANCE.Neutral} />
          <ButtonSimple label="Destructive" appearance={APPEARANCE.Destructive} />
        </div>
      </div>
      <div>
        <h3 style={{ marginBottom: 16, fontSize: 14, fontWeight: 600 }}>ButtonFunction</h3>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <ButtonFunction label="Primary" appearance={APPEARANCE.Primary} />
          <ButtonFunction label="Neutral" appearance={APPEARANCE.Neutral} />
          <ButtonFunction label="Destructive" appearance={APPEARANCE.Destructive} />
        </div>
      </div>
    </div>
  ),
};
















