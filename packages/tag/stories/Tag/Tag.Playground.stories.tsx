import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import tagReadme from '../../README.md?raw';
import { APPEARANCE, SIZE, Tag, type TagProps } from '../../src';

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
    label: 'Label text',
    size: SIZE.S,
    appearance: APPEARANCE.Neutral,
    removable: false,
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Текст тега',
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
    removable: {
      control: 'boolean',
      description: 'Показать кнопку удаления',
    },
  },
};

export default meta;

type Story = StoryObj<TagProps & { removable?: boolean }>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => {
    const { removable, ...tagProps } = args;
    return <Tag {...tagProps} onDelete={removable ? fn() : undefined} />;
  },
};
