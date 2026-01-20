import type { Meta, StoryObj, StoryFn } from '@storybook/react';
import cn from 'classnames';
import { Fragment } from 'react';
import { Counter, CounterProps, APPEARANCE, SIZE, VARIANT, DEFAULT_PLUS_LIMIT } from './src';

import styles from './styles.module.scss';

const sizes = Object.values(SIZE);
const appearances = Object.values(APPEARANCE);
const variants = Object.values(VARIANT);

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
# Avatar Component

Компонент для отображения аватара пользователя или организации.

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
    value: { type: 'number' },
    appearance: {
      control: 'radio',
      options: appearances,
    },
    size: {
      control: 'radio',
      options: sizes,
    },
    variant: {
      control: 'radio',
      options: variants,
    },
  },
};

export default meta;
type Story = StoryObj<CounterProps>;
type StoryProps = CounterProps;

const Template: StoryFn<StoryProps> = ({ ...args }) => {
  const headerCellClassnames = cn(styles.cell, styles.headerCell);

  return (
    <>
      <div className={styles.wrapper}>
        Controlled:
        <Counter {...args} />
      </div>

      <div className={styles.table}>
        <div className={headerCellClassnames} style={{ gridRow: '1 / 3' }} />
        {sizes.map((size, index) => (
          <div
            key={size}
            className={headerCellClassnames}
            style={{ gridColumnStart: index * 3 + 2, gridColumnEnd: index * 3 + 5 }}
          >
            {size}
          </div>
        ))}
        {variants.map(variant => (
          <div key={variant} className={headerCellClassnames}>
            {variant}
          </div>
        ))}
        {variants.map(variant => (
          <div key={variant} className={headerCellClassnames}>
            {variant}
          </div>
        ))}
        {appearances.map(appearance => (
          <Fragment key={appearance}>
            <div className={headerCellClassnames}>{appearance}</div>
            {variants.map(variant => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === VARIANT.Count ? 9 : 9000}
                  size={SIZE.XS}
                  variant={variant}
                  appearance={appearance}
                  color={args.color}
                />
              </div>
            ))}
            {variants.map(variant => (
              <div key={variant} className={styles.cell}>
                <Counter
                  value={variant === VARIANT.Count ? 9 : 9000}
                  size={SIZE.S}
                  variant={variant}
                  appearance={appearance}
                  color={args.color}
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </>
  );
};

export const Basic: Story = {
  render: Template,
};
