import type { Meta, StoryObj } from '@storybook/react';

import { APPEARANCE, Counter, CounterProps, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from '../../src';

const meta: Meta<CounterProps> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/branch/xj0bh1ewSCgStOUXNKS2rp/Snack-Ui-Kit-variables?node-id=2088-10548&p=f&m=dev',
    },
    docs: {
      description: {
        component: `
# Counter Component

Компонент для отображения счётчиков и числовых значений.

## Features

- Компонент поддерживает несколько вариантов отображения значения: обычный счётчик (count), формат с плюсом при превышении порога (count-plus) и укороченную запись в тысячах (count-k), управляемую пропами variant и plusLimit.
- Размер (size) и внешний вид (appearance, color) позволяют адаптировать счётчик под разные сценарии — от базовых меток до критических состояний.
- Форматированное значение отображается в едином контейнере без дополнительных иконок или кнопок, за счёт чего компонент хорошо подходит для использования внутри других UI-элементов (кнопок, тегов, пунктов меню).

## Installation

\`\`\`bash
pnpm add @design-system/counter
\`\`\`

## Quick Start

\`\`\`tsx
import { Counter } from '@snack-uikit/counter';

function Example() {
  return (
    <>
      <Counter value={9} />

      <Counter
        value={10}
        variant='count-plus'
        plusLimit={9}
        appearance='red'
        size='m'
      />

      <Counter
        value={8500}
        variant='count-k'
        color='decor'
      />
    </>
  );
}
\`\`\`

## Source Code

- [GitLab Repository](https://git.sbercloud.tech/sbercloud-ui/tokens-design-system/variables/storybook/-/tree/main/packages/counter)
`,
      },
    },
  },
  args: {
    value: 9,
    appearance: APPEARANCE.Primary,
    size: SIZE.S,
    variant: VARIANT.Count,
    plusLimit: DEFAULT_PLUS_LIMIT,
    color: 'accent',
  },
  argTypes: {
    value: {
      type: 'number',
      description: 'Числовое значение для отображения',
    },
    appearance: {
      control: 'radio',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид счётчика',
    },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер счётчика',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант форматирования значения',
    },
    plusLimit: {
      control: 'number',
      description: 'Предел для варианта count-plus (показывает N+ если значение больше)',
    },
    color: {
      control: 'radio',
      options: ['accent', 'decor'],
      description: 'Цветовая схема',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};

export default meta;
type Story = StoryObj<CounterProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
