import type { Meta, StoryObj } from '@storybook/react';

import { PLACEMENT, Tooltip, type TooltipProps, TRIGGER } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2254-443',
    },
    docs: {
      description: {
        component: `
# Tooltip

Всплывающая подсказка при наведении на элемент-триггер.

## Features

- Триггер: hover, focus, click или комбинации (настраивается через prop trigger)
- Показ по hover с настраиваемой задержкой
- 12 вариантов расположения (placement)
- Стрелка-указатель к триггеру
- Стили из design tokens (Figma variables)

## Installation

\`\`\`bash
pnpm add @design-system/tooltip
\`\`\`

## Quick Start

\`\`\`tsx
import { Tooltip } from '@design-system/tooltip';

function Example() {
  return (
    <Tooltip content="Подсказка">
      <button type="button">Наведи курсор</button>
    </Tooltip>
  );
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
    hoverDelayOpen: 200,
    hoverDelayClose: 100,
  },
  argTypes: {
    children: {
      control: false,
      description: 'Элемент, при наведении на который показывается тултип',
    },
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
      description: 'Событие, по которому показывается тултип (hover, focus, click или комбинации)',
    },
    hoverDelayOpen: {
      control: 'number',
      description: 'Задержка открытия по ховеру (мс)',
    },
    hoverDelayClose: {
      control: 'number',
      description: 'Задержка закрытия по ховеру (мс)',
    },
  },
};

export default meta;
type Story = StoryObj<TooltipProps>;

const DefaultTrigger = () => <button type='button'>Наведи курсор</button>;

export const Playground: Story = {
  args: {
    hoverDelayOpen: 0,
    hoverDelayClose: 0,
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
  },

  tags: ['dev', 'test', 'autodocs'],

  render: args => (
    <div className={styles.pageWrapper}>
      <Tooltip {...args}>
        <DefaultTrigger />
      </Tooltip>
    </div>
  ),
};
