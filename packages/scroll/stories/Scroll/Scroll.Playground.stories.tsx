import type { Meta, StoryObj } from '@storybook/react';

import { AUTOSCROLL_TO, BAR_HIDE_STRATEGY, RESIZE, Scroll, type ScrollProps, SIZE } from '../../src';
import styles from './styles.module.scss';

const defaultContent = (
  <div className={styles.scrollContent}>
    {Array.from({ length: 20 }, (_, i) => (
      <div key={i} className={styles.playgroundLine}>
        Line of content {String(i + 1).padStart(2, '0')}. Scroll to see the scrollbar, this is some long long long text.
      </div>
    ))}
  </div>
);

const meta: Meta<ScrollProps> = {
  title: 'Components/Scroll',
  component: Scroll,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=11387-36963',
    },
    docs: {
      description: {
        component: `
# Scroll

Контейнер с кастомными скроллбарами. DOM повторяет структуру из Figma: контейнер (relative) и слои track / handle / state (absolute).
Стили из \`@sbercloud/figma-variables\`.

## Features

- Кастомные скроллбары с размерами s/m
- Автоскрол к bottom/right при маунте и изменении контента
- Управление видимостью скроллбаров (Never / Leave / Scroll / Move)
- Опциональный resize контейнера

## Installation

\`\`\`bash
pnpm add @design-system/scroll
\`\`\`

## Quick Start

\`\`\`tsx
import { Scroll } from '@design-system/scroll';

function Example() {
  return (
    <div style={{ height: 200 }}>
      <Scroll>
        <div>Long content...</div>
      </Scroll>
    </div>
  );
}
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
  },
  args: {
    children: defaultContent,
    size: SIZE.M,
    barHideStrategy: BAR_HIDE_STRATEGY.Leave,
    clickScrolling: true,
    untouchableScrollbars: false,
    resize: RESIZE.None,
    paddingAbsolute: false,
  },
  argTypes: {
    children: {
      control: false,
      description: 'Контент внутри скролла',
    },
    size: {
      options: Object.values(SIZE),
      control: 'radio',
      description: 'Размер скроллбаров',
    },
    barHideStrategy: {
      options: Object.values(BAR_HIDE_STRATEGY),
      control: 'select',
      description: 'Когда показывать/скрывать скроллбары',
    },
    clickScrolling: {
      control: 'boolean',
      description: 'Скроллить по клику в трек скроллбара',
    },
    untouchableScrollbars: {
      control: 'boolean',
      description: 'Отключить взаимодействие со скроллбарами мышью',
    },
    resize: {
      options: Object.values(RESIZE),
      control: 'select',
      description: 'Возможность изменять размер контейнера',
    },
    paddingAbsolute: {
      control: 'boolean',
      description: 'Абсолютные паддинги',
    },
    autoscrollTo: {
      options: [undefined, ...Object.values(AUTOSCROLL_TO)],
      control: 'select',
      description: 'Автоскрол при маунте и изменении контента',
    },
    onScroll: { action: 'scroll', control: false },
    onInitialized: { action: 'initialized', control: false },
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
type Story = StoryObj<ScrollProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: args => <Scroll {...args} className={styles.scroll} />,
};
