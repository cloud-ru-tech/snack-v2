import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import ratingReadme from '../../README.md?raw';
import { APPEARANCE, Rating, RatingProps, SIZE } from '../../src';
import { DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../../src/constants';

const meta: Meta<RatingProps> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: {
    readme: { content: ratingReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=7725-1502&p=f&m=dev',
    },
    docs: {
      description: {
        component: `
# Rating

Компонент рейтинга в виде звёзд. Поддерживает настраиваемое количество звёзд (\`count\`), контролируемый и неконтролируемый режимы (\`value\` / \`defaultValue\`), половинчатые звёзды (\`allowHalf\`), сброс при повторном клике (\`allowClear\`) и режим только чтения (\`readonly\`). Значение — число от 0 до \`count\` (при \`allowHalf\` возможны шаги 0.5).

## Features

- Количество звёзд: \`count\` (по умолчанию 5)
- Контролируемый режим: \`value\` и \`onChange(value: number)\`
- Неконтролируемый: \`defaultValue\`, опционально \`onChange\`
- \`allowHalf\` — половинчатые звёзды, \`allowClear\` — сброс при повторном клике, \`readonly\` — только отображение
- Размеры: \`xs\`, \`s\`; цветовые схемы: \`appearance\` (primary, red, orange, yellow, green, blue, violet, pink)
- Клавиатура: Tab, Enter, Space; каждая звезда — \`role="radio"\`

## Installation

\`\`\`bash
pnpm add @design-system/rating
\`\`\`

## Quick Start

\`\`\`tsx
import { Rating } from '@design-system/rating';

function Example() {
  return (
    <Rating
      count={5}
      defaultValue={0}
      allowHalf={false}
      allowClear
      onChange={(value) => console.log(value)}
    />
  );
}
\`\`\`
        `,
      },
    },
  },
  args: {},
  argTypes: {
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

type StoryProps = RatingProps;

type Story = StoryObj<RatingProps>;

const Template: StoryFn<StoryProps> = args => <Rating {...args} />;

export const Playground: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: Template,
  args: {
    size: 'xs',
    appearance: APPEARANCE.Yellow,
    allowHalf: false,
    allowClear: false,
    count: DEFAULT_STAR_COUNT,
    defaultValue: DEFAULT_RATING_VALUE,
    value: undefined,
    readonly: false,
    className: '',
  },
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид (цветовая схема)',
    },
  },
};
