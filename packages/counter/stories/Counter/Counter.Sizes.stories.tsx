import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Counter, CounterProps, SIZE } from '../../src';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
};

export default meta;
type Story = StoryObj<CounterProps>;

export const Sizes: Story = {
  tags: ['dev', 'autodocs'],
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Counter value={9} size={SIZE.XS} />
      <Counter value={9} size={SIZE.S} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
Два доступных размера:

\`\`\`tsx
// Extra Small
<Counter value={9} size="xs" />

// Small (по умолчанию)
<Counter value={9} size="s" />
\`\`\`
        `,
      },
    },
  },
};
