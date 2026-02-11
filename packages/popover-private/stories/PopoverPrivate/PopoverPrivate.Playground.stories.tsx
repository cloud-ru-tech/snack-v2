import type { Meta, StoryObj } from '@storybook/react';

import popoverReadme from '../../README.md?raw';
import {
  PLACEMENT,
  POPOVER_HEIGHT_STRATEGY,
  POPOVER_WIDTH_STRATEGY,
  PopoverPrivate,
  PopoverPrivateProps,
  TRIGGER,
} from '../../src';
import styles from './styles.module.scss';

const PopoverContent = () => <div className={styles.popoverContent}>Popover content</div>;

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/Popover Private',
  component: PopoverPrivate,
  parameters: {
    readme: {
      content: popoverReadme,
    },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/YOUR_FILE_ID/...',
    },
    docs: {
      description: {
        component: `
# Popover Private Component

Низкоуровневый компонент поповера на базе Floating UI. Используется для построения Tooltip, Dropdown и других overlay-компонентов.

## Features

- Поддержка различных триггеров: click, hover, focus
- Гибкое позиционирование (12 placement вариантов)
- Стратегии управления шириной и высотой
- Опциональная стрелка
- Контролируемый и неконтролируемый режимы

## Installation

\`\`\`bash
pnpm add @design-system/popover-private
\`\`\`

## Quick Start

\`\`\`tsx
import { PopoverPrivate, PLACEMENT, TRIGGER } from '@design-system/popover-private';

function Example() {
  return (
    <PopoverPrivate
      trigger={TRIGGER.Click}
      placement={PLACEMENT.Top}
      popoverContent={<div>Content</div>}
    >
      <button type="button">Open</button>
    </PopoverPrivate>
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    placement: PLACEMENT.Right,
    trigger: TRIGGER.Click,
    hasArrow: false,
    outsideClick: true,
    closeOnEscapeKey: true,
    widthStrategy: POPOVER_WIDTH_STRATEGY.Auto,
    heightStrategy: POPOVER_HEIGHT_STRATEGY.Auto,
    arrowElementClassName: styles.popoverArrowElement,
    arrowContainerClassName: styles.popoverArrowContainer,
  },
  argTypes: {
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Положение поповера относительно триггера',
    },
    trigger: {
      control: 'radio',
      options: Object.values(TRIGGER),
      description: 'Тип триггера для открытия',
    },
    hasArrow: {
      control: 'boolean',
      description: 'Отображать стрелку',
    },
    outsideClick: {
      control: 'boolean',
      description: 'Закрывать при клике вне поповера',
    },
    closeOnEscapeKey: {
      control: 'boolean',
      description: 'Закрывать по Escape',
    },
    widthStrategy: {
      control: 'radio',
      options: Object.values(POPOVER_WIDTH_STRATEGY),
      description: 'Стратегия ширины контейнера',
    },
    heightStrategy: {
      control: 'radio',
      options: Object.values(POPOVER_HEIGHT_STRATEGY),
      description: 'Стратегия высоты контейнера',
    },
    offset: {
      control: 'number',
      description: 'Отступ от триггера',
    },
    hoverDelayOpen: {
      control: 'number',
      description: 'Задержка открытия по hover',
    },
    hoverDelayClose: {
      control: 'number',
      description: 'Задержка закрытия по hover',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
    arrowElementClassName: {
      table: { disable: true },
    },
    arrowContainerClassName: {
      table: { disable: true },
    },
  },
  render: args => (
    <div className={styles.pageWrapper}>
      <PopoverPrivate {...args} popoverContent={<PopoverContent />}>
        <button type='button'>Open popover</button>
      </PopoverPrivate>
    </div>
  ),
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
};
