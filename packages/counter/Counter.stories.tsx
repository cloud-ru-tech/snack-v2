import type { Meta, StoryObj } from '@storybook/react';
import { APPEARANCE, Counter, CounterProps, SIZE, VARIANT } from './src';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
  args: {
    value: 9,
    size: SIZE.Xs,
    variant: VARIANT.Accent,
    appearance: APPEARANCE.Neutral,
  },
  argTypes: {
    value: {
      control: 'number',
      description: 'Значение счетчика',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер счетчика',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант отображения',
    },
    maxValue: {
      control: 'number',
      description: 'Максимальное значение для отображения',
    },
  },
};

export default meta;
type Story = StoryObj<CounterProps>;

export const Basic: Story = {
  args: {
    value: 9,
    size: SIZE.Xs,
    variant: VARIANT.Accent,
    appearance: APPEARANCE.Neutral,
  },
};

export const WithPlus: Story = {
  args: {
    value: 100,
  },
};

export const WithKilo: Story = {
  args: {
    value: 5000,
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#666' }}>XS</div>
        <Counter value={9} size={SIZE.Xs} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter
          value={100}
          size={SIZE.Xs}
          variant={VARIANT.Accent}
          appearance={APPEARANCE.Green}
        />
        <Counter
          value={5000}
          size={SIZE.Xs}
          variant={VARIANT.Accent}
          appearance={APPEARANCE.Green}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
        <div style={{ fontSize: 12, color: '#666' }}>S</div>
        <Counter value={9} size={SIZE.S} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={100} size={SIZE.S} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter
          value={5000}
          size={SIZE.S}
          variant={VARIANT.Accent}
          appearance={APPEARANCE.Green}
        />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 100, fontSize: 12, color: '#666' }}>Accent (solid)</div>
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 100, fontSize: 12, color: '#666' }}>Decor (light)</div>
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Green} />
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Neutral} />
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Red} />
      </div>
    </div>
  ),
};

export const Appearances: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 100, fontSize: 12, color: '#666' }}>Accent</div>
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 100, fontSize: 12, color: '#666' }}>Decor</div>
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Green} />
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Neutral} />
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Red} />
      </div>
    </div>
  ),
};

export const ContentTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 100, fontSize: 12, color: '#666' }}>Single digit</div>
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 100, fontSize: 12, color: '#666' }}>With plus (99+)</div>
        <Counter value={100} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={100} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
        <Counter value={100} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 100, fontSize: 12, color: '#666' }}>With kilo (9K)</div>
        <Counter value={5000} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={5000} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
        <Counter value={5000} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
      </div>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 120, fontSize: 12, color: '#666', fontWeight: 600 }}>
          Accent / Green
        </div>
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={100} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
        <Counter value={5000} variant={VARIANT.Accent} appearance={APPEARANCE.Green} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 120, fontSize: 12, color: '#666', fontWeight: 600 }}>
          Accent / Neutral
        </div>
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
        <Counter value={100} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
        <Counter value={5000} variant={VARIANT.Accent} appearance={APPEARANCE.Neutral} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 120, fontSize: 12, color: '#666', fontWeight: 600 }}>
          Accent / Red
        </div>
        <Counter value={9} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
        <Counter value={100} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
        <Counter value={5000} variant={VARIANT.Accent} appearance={APPEARANCE.Red} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 120, fontSize: 12, color: '#666', fontWeight: 600 }}>
          Decor / Green
        </div>
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Green} />
        <Counter value={100} variant={VARIANT.Decor} appearance={APPEARANCE.Green} />
        <Counter value={5000} variant={VARIANT.Decor} appearance={APPEARANCE.Green} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 120, fontSize: 12, color: '#666', fontWeight: 600 }}>
          Decor / Neutral
        </div>
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Neutral} />
        <Counter value={100} variant={VARIANT.Decor} appearance={APPEARANCE.Neutral} />
        <Counter value={5000} variant={VARIANT.Decor} appearance={APPEARANCE.Neutral} />
      </div>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ minWidth: 120, fontSize: 12, color: '#666', fontWeight: 600 }}>
          Decor / Red
        </div>
        <Counter value={9} variant={VARIANT.Decor} appearance={APPEARANCE.Red} />
        <Counter value={100} variant={VARIANT.Decor} appearance={APPEARANCE.Red} />
        <Counter value={5000} variant={VARIANT.Decor} appearance={APPEARANCE.Red} />
      </div>
    </div>
  ),
};
