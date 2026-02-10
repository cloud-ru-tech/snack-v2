import type { Meta, StoryObj } from '@storybook/react';

import portalcontextReadme from '../../README.md?raw';
import { PortalContextProvider, PortalContextProviderProps } from '../../src';

const meta: Meta<PortalContextProviderProps> = {
  title: 'Components/PortalContext',
  component: PortalContextProvider,
  parameters: {
    readme: { content: portalcontextReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
    docs: {
      description: {
        component: `
# PortalContextProvider

Краткое описание компонента и его назначения.

## Features

- Ключевая особенность 1
- Ключевая особенность 2

## Installation

\`\`\`bash
pnpm add @design-system/portal-context
\`\`\`

## Quick Start

\`\`\`tsx
import { PortalContextProvider } from '@design-system/portal-context';

function Example() {
  return <PortalContextProvider />;
}
\`\`\`
        `,
      },
    },
  },
  args: {},
  argTypes: {
    // 'data-test-id': {
    //   control: 'text',
    //   description: 'Test ID для автотестов',
    //   table: {
    //     category: 'HTML Attributes',
    //   },
    // },
  },
};

export default meta;
type Story = StoryObj<PortalContextProviderProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
