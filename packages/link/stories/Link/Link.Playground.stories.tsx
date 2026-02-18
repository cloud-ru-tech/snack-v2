import { VARIANT } from '@design-system/truncate-string';
import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { MouseEventHandler } from 'react';

import linkReadme from '../../README.md?raw';
import { APPEARANCE, Link, LinkProps, ROLE } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<LinkProps> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    readme: { content: linkReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=6913-5372&p=f&m=dev',
    },
    docs: {
      description: {
        component: `
# Link

Стилизованная ссылка для интерфейса и вставки в текст. Поддерживает роли (regular / onAccent), варианты внешнего вида (appearance), обрезку длинного текста и полиморфный рендер через \`as\` (например, для react-router). При \`target="_blank"\` автоматически добавляется \`rel="noopener noreferrer"\`.

## Features

- **Роли** — \`regular\`, \`onAccent\` для размещения на обычном или акцентном фоне
- **Appearance** — neutral, primary, red, blue и др. для контраста с фоном
- **Внутри текста** — \`insideText={true}\` для ссылки в абзаце с переносами
- **Обрезка текста** — \`truncateVariant: 'end' | 'middle'\` при длинной подписи
- **Полиморфный** — \`as={Component}\` для рендера в виде другого элемента или роутер-ссылки

## Installation

\`\`\`bash
pnpm add @design-system/link
\`\`\`

## Quick Start

\`\`\`tsx
import { Link } from '@design-system/link';

function Example() {
  return <Link text="Перейти" href="https://example.com" />;
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

type StoryProps = LinkProps & {
  showBackground: boolean;
};

type Story = StoryObj<StoryProps>;

const handleClick: MouseEventHandler = e => {
  e.preventDefault();
};

const Template: StoryFn<StoryProps> = ({ showBackground, ...args }: StoryProps) => (
  <div className={styles.wrapper}>
    <div
      className={cn(styles.linkWrapper, styles.withResize)}
      data-appearance={args.appearance}
      data-role={args.role}
      data-show-background={showBackground || undefined}
    >
      {args.insideText ? (
        <span>
          Some text some text <Link {...args} insideText={true} onClick={handleClick} /> some text some text
        </span>
      ) : (
        <Link {...args} onClick={handleClick} />
      )}
    </div>
  </div>
);

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    role: 'regular',
    appearance: 'primary',
    showBackground: true,
    text: 'Link text',
    href: '#',
    target: '_blank',
    insideText: false,
    truncateVariant: 'end',
  },
  argTypes: {
    role: {
      control: 'radio',
      options: Object.values(ROLE),
    },
    appearance: {
      control: 'radio',
      options: Object.values(APPEARANCE),
    },
    showBackground: {
      name: '[Stories]: Show background',
    },
    truncateVariant: {
      control: 'radio',
      options: Object.values(VARIANT),
    },
    download: {
      type: 'string',
    },
  },
  render: Template,
};
