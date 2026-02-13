import type { Meta, StoryObj } from '@storybook/react';
import type { ComponentType } from 'react';

import truncatestringReadme from '../../README.md?raw';
import { TruncateString, TruncateStringProps, VARIANT } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<TruncateStringProps> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: {
    readme: { content: truncatestringReadme },
    docs: {
      description: {
        component: `
# TruncateString

Компонент для обрезки длинного текста с многоточием и опциональным тултипом с полным текстом.

## Features

- **Варианты обрезки**: с конца (End) или по середине (Middle)
- **Тултип**: при обрезке показывается тултип с полным текстом (можно отключить через \`hideTooltip\`)
- **Многострочность** (только End): \`maxLines\` — до скольких строк сворачивать текст
- **Позиция тултипа**: \`placement\` — положение тултипа относительно текста

## Installation

\`\`\`bash
pnpm add @design-system/truncate-string
\`\`\`

## Quick Start

\`\`\`tsx
import { TruncateString, VARIANT } from '@design-system/truncate-string';

function Example() {
  return (
    <>
      <TruncateString text="Очень длинная строка текста, которая будет обрезана с конца" />
      <TruncateString
        variant={VARIANT.Middle}
        text="Путь/к/очень/длинному/файлу/или/ссылке.txt"
      />
    </>
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {
    text: 'Очень длинная строка текста, которая будет обрезана с конца и при наведении покажет полный текст в тултипе',
    variant: VARIANT.End,
    maxLines: 1,
    hideTooltip: false,
  },
  argTypes: {
    text: {
      control: 'text',
      description: 'Текст, который будет обрезаться',
    },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант обрезки: с конца (End) или по середине (Middle)',
    },
    maxLines: {
      control: 'number',
      description: 'Максимальное количество строк (только для variant End)',
      if: { arg: 'variant', eq: VARIANT.End },
    },
    hideTooltip: {
      control: 'boolean',
      description: 'Скрывать тултип с полным текстом',
    },
    placement: {
      control: 'select',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'right'],
      description: 'Положение тултипа относительно текста',
    },
    trigger: {
      control: 'select',
      options: ['hover', 'click', 'focus'],
      description: 'Условие отображения тултипа',
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
type Story = StoryObj<TruncateStringProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  decorators: [
    (Story: ComponentType) => (
      <div className={styles.wrapper}>
        <Story />
      </div>
    ),
  ],
};
