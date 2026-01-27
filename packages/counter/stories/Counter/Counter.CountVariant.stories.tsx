import type { Meta, StoryObj } from '@storybook/react';

import { Counter, CounterProps, VARIANT } from '../../src';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
};

export default meta;
type Story = StoryObj<CounterProps>;

export const CountVariant: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    value: 9,
    variant: VARIANT.Count,
  },
  parameters: {
    docs: {
      description: {
        story: `
Базовый вариант - отображает число как есть:

\`\`\`tsx
<Counter value={9} variant="count" />
\`\`\`
        `,
      },
    },
  },
};
