import { Meta, StoryFn, StoryObj } from '@storybook/react';

import { APPEARANCE, Rating, RatingProps, SIZE } from '../../src';
import { DEFAULT_RATING_VALUE, DEFAULT_STAR_COUNT } from '../../src/constants';

const meta: Meta<RatingProps> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: { layout: 'centered' },
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
  tags: ['dev', 'test'],
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
