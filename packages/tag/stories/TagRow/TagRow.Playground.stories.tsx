import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import tagReadme from '../../README.md?raw';
import { APPEARANCE, SIZE, TagRow, type TagRowItem, type TagRowProps } from '../../src';
import styles from './styles.module.scss';

const defaultItems: TagRowItem[] = [
  { label: 'Тег 1', appearance: APPEARANCE.Neutral },
  { label: 'Тег 2', appearance: APPEARANCE.Primary },
  { label: 'Тег 3', appearance: APPEARANCE.Red },
  { label: 'Тег 4', appearance: APPEARANCE.Green },
  { label: 'Тег 5', appearance: APPEARANCE.Blue },
];

type PlaygroundArgs = TagRowProps & { withRemove?: boolean };

const meta: Meta<PlaygroundArgs> = {
  title: 'Components/Tag/TagRow',
  component: TagRow,
  parameters: {
    readme: { content: tagReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=3862-10223',
    },
  },
  args: {
    items: defaultItems,
    size: SIZE.S,
    rowLimit: 1,
    moreButtonLabel: 'Ещё',
    withRemove: false,
  },
  argTypes: {
    items: {
      control: 'object',
      description: 'Массив элементов тегов',
    },
    size: {
      control: 'select',
      options: Object.values(SIZE),
      description: 'Размер тегов',
    },
    rowLimit: {
      control: { type: 'number', min: 0 },
      description: 'Макс. число видимых тегов, остальные в выпадающем «+N»',
    },
    moreButtonLabel: {
      control: 'text',
      description: 'Текст кнопки «ещё»',
    },
    withRemove: {
      control: 'boolean',
      description: 'Показать кнопки удаления в выпадающем списке',
    },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => {
    const { withRemove, ...tagRowProps } = args;
    return (
      <div className={styles.playgroundWrapper}>
        <TagRow {...tagRowProps} onItemRemove={withRemove ? fn() : undefined} />
      </div>
    );
  },
};
