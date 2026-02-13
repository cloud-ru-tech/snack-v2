import type { Meta, StoryObj } from '@storybook/react';

import { PLACEMENT, QuestionTooltip, type QuestionTooltipProps, TRIGGER } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<QuestionTooltipProps> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3182-9180',
    },
    docs: {
      description: {
        component: `
# QuestionTooltip

Тултип с триггером-иконкой «вопрос». DOM повторяет структуру из Figma: корневой контейнер и слои (фон, контент).

## Features

- Триггер: иконка с вопросительным знаком (16px, стили из Figma)
- Показ по hover/focus или по клику (настраивается через prop \`trigger\`)
- 12 вариантов расположения (\`placement\`)
- Стрелка-указатель к триггеру
- Стили из @sbercloud/figma-variables

## Installation

\`\`\`bash
pnpm add @design-system/tooltip
\`\`\`

## Quick Start

\`\`\`tsx
import { QuestionTooltip } from '@design-system/tooltip';

function Example() {
  return <QuestionTooltip content="Подсказка к полю" />;
}
\`\`\`
        `,
      },
    },
  },
  args: {
    content: 'Текст подсказки',
    placement: PLACEMENT.Top,
    trigger: TRIGGER.HoverAndFocusVisible,
    hoverDelayOpen: 0,
    hoverDelayClose: 0,
    triggerLabel: 'Подсказка',
  },
  argTypes: {
    content: {
      control: 'text',
      description: 'Содержимое тултипа (текст или разметка)',
    },
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Расположение тултипа относительно триггера',
    },
    trigger: {
      control: 'select',
      options: Object.values(TRIGGER),
      description: 'Событие, по которому показывается тултип',
    },
    triggerLabel: {
      control: 'text',
      description: 'aria-label для иконки-триггера',
    },
    hoverDelayOpen: {
      control: 'number',
      description: 'Задержка открытия по ховеру (мс)',
    },
    hoverDelayClose: {
      control: 'number',
      description: 'Задержка закрытия по ховеру (мс)',
    },
    offset: {
      control: 'number',
      description: 'Отступ тултипа от триггера (px)',
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
type Story = StoryObj<QuestionTooltipProps>;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: args => (
    <div className={styles.pageWrapper}>
      <QuestionTooltip {...args} />
    </div>
  ),
};
