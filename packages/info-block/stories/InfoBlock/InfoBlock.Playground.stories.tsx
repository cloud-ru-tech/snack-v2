import { Button, VIEW } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';

import { ALIGN, InfoBlock, InfoBlockProps, SIZE } from '../../src';
import styles from './styles.module.scss';

type PlaygroundArgs = InfoBlockProps & { showIcon?: boolean; showFooter?: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  parameters: { layout: 'centered' },
  args: {
    title: 'Title text',
    description: 'Content text',
    size: SIZE.S,
    align: ALIGN.Vertical,
    showIcon: true,
    showFooter: true,
    icon: {
      icon: PlaceholderSVG,
      appearance: 'primary',
      decor: true,
    },
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Заголовок',
    },
    description: {
      control: 'text',
      description: 'Подзаголовок',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    align: {
      control: 'radio',
      options: Object.values(ALIGN),
      description: 'Расположение элементов',
    },
    showIcon: {
      control: 'boolean',
      description: 'Показать иконку',
    },
    showFooter: {
      control: 'boolean',
      description: 'Показать футер с кнопками',
    },
    icon: {
      control: false,
      description: 'Иконка (IconPredefined props)',
    },
    className: {
      control: 'text',
      description: 'Дополнительный CSS-класс',
    },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <InfoBlock
      title={args.title}
      description={args.description}
      size={args.size}
      align={args.align}
      icon={args.showIcon ? args.icon : undefined}
      footer={
        args.showFooter ? (
          <div className={styles.footerRow}>
            <Button label='Label text' view={VIEW.Filled} size={args.size} />
            <Button label='Label text' view={VIEW.Tonal} size={args.size} />
          </div>
        ) : undefined
      }
      className={args.className}
    />
  ),
};
