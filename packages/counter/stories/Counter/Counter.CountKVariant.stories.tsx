import type { Meta, StoryObj } from '@storybook/react';

import { Counter, CounterProps, VARIANT } from '../../src';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
};

export default meta;
type Story = StoryObj<CounterProps>;

export const CountKVariant: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    value: 8500,
    variant: VARIANT.CountK,
  },
  parameters: {
    docs: {
      description: {
        story: `
Укороченный формат - сокращает большие числа до тысяч:

\`\`\`tsx
<Counter 
  value={8500} 
  variant="count-k"
/>
// Отобразит "8.5k"
\`\`\`
        `,
      },
    },
  },
};
