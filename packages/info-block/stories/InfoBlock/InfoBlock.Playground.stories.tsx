import { ButtonGroup } from '@design-system/button';
import { PlaceholderSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import readme from '../../README.md?raw';
import { ALIGN, InfoBlock, type InfoBlockProps, SIZE } from '../../src';

type PlaygroundArgs = InfoBlockProps & { showIcon?: boolean; showFooter?: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/InfoBlock',
  component: InfoBlock,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=5828-4043',
    },
    readme: { content: readme },
  },
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
          <ButtonGroup
            size={args.size}
            primaryAction={{ label: 'Label text', view: 'filled' }}
            secondaryAction={{ label: 'Label text', view: 'tonal' }}
          />
        ) : undefined
      }
      className={args.className}
    />
  ),
};
