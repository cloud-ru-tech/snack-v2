import type { Meta, StoryObj } from '@storybook/react';

import { Counter, CounterProps, VARIANT } from '../../src';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
};

export default meta;
type Story = StoryObj<CounterProps>;

export const CountPlusVariant: Story = {
  tags: ['dev', 'autodocs'],
  args: {
    value: 99,
    variant: VARIANT.CountPlus,
    plusLimit: 9,
  },
  parameters: {
    docs: {
      description: {
        story: `
Формат с плюсом - показывает "N+" когда значение превышает plusLimit:

\`\`\`tsx
<Counter 
  value={99} 
  variant="count-plus"
  plusLimit={9}
/>
// Отобразит "9+"
\`\`\`
        `,
      },
    },
  },
};
