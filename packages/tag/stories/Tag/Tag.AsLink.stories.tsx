import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import tagReadme from '../../README.md?raw';
import { APPEARANCE, SIZE, Tag, type TagProps } from '../../src';
import styles from './styles.module.scss';

const meta: Meta<TagProps> = {
  title: 'Components/Tag/Tag',
  component: Tag,
  parameters: {
    readme: { content: tagReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3862-10223',
    },
  },
  args: {
    label: 'Тег-ссылка',
    href: '#',
    size: SIZE.S,
    appearance: APPEARANCE.Primary,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст тега',
    },
    href: {
      control: 'text',
      description: 'URL ссылки',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер тега',
    },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    target: {
      control: 'text',
      description: 'Атрибут target (например _blank)',
    },
  },
};

export default meta;

type Story = StoryObj<TagProps>;

export const AsLink: Story = {
  tags: ['dev'],
  parameters: {
    docs: {
      description: {
        story:
          'Тег в виде ссылки. При передаче `href` рендерится как `<a>`. Варианты: обычная ссылка, внешняя (`target="_blank"`), с обработчиком `onClick`.',
      },
    },
  },
  render: (args: TagProps) => (
    <div className={styles.wrapper}>
      <div className={styles.row}>
        <span className={styles.label}>Обычная ссылка:</span>
        <Tag {...args} label='Тег-ссылка' href='#' size={SIZE.S} appearance={APPEARANCE.Primary} />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>Внешняя (target=&quot;_blank&quot;):</span>
        <Tag
          label='Внешняя ссылка'
          href='https://example.com'
          target='_blank'
          size={SIZE.S}
          appearance={APPEARANCE.Neutral}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>С onClick:</span>
        <Tag label='Клик по ссылке' href='#' onClick={fn()} size={SIZE.S} appearance={APPEARANCE.Primary} />
      </div>
    </div>
  ),
};
