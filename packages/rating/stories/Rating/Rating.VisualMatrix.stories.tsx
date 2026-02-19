import type { Meta, StoryFn, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import ratingReadme from '../../README.md?raw';
import { APPEARANCE, SIZE } from '../../src';
import { RatingStar, RatingStarProps, VALUE } from '../../src/helperComponents/RatingStar';

const meta: Meta<RatingStarProps> = {
  title: 'Components/Rating',
  component: RatingStar,
  parameters: {
    readme: { content: ratingReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=7725-1502&p=f&m=dev',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

type StoryProps = Pick<RatingStarProps, 'appearance'>;
type Story = StoryObj<StoryProps>;

const sizes = Object.values(SIZE);
const values = Object.values(VALUE);

const Template: StoryFn<StoryProps> = ({ appearance }) => (
  <StoryTable
    sectionTitle='Rating'
    firstColumnHeader='Value'
    columnHeaders={sizes.map(s => s.toUpperCase())}
    rows={values.map(value => ({
      variantLabel: 'Value',
      cells: sizes.map(size => <RatingStar key={size} size={size} value={value} appearance={appearance} />),
    }))}
  />
);

export const VisualMatrix: Story = {
  tags: ['dev', 'test', 'autodocs'],
  render: Template,
  args: {
    appearance: APPEARANCE.Yellow,
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид (цветовая схема)',
    },
  },
};
