import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import { Favourite, FAVOURITE_ICON, FavouriteProps, SIZE } from '../../src';

const meta: Meta<FavouriteProps> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: { layout: 'centered' },
};

export default meta;

type StoryProps = FavouriteProps;
type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = args => {
  const [{ checked }, updateArgs] = useArgs<FavouriteProps>();

  return <Favourite {...args} checked={checked} onChange={updatedValue => updateArgs({ checked: updatedValue })} />;
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    size: SIZE.XS,
    icon: FAVOURITE_ICON.Star,
    checked: undefined,
    defaultChecked: undefined,
    loading: false,
    disabled: false,
    'data-test-id': 'favourite',
  },
  argTypes: {
    checked: { control: 'boolean' },
    defaultChecked: { control: 'boolean' },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    icon: {
      control: 'radio',
      options: Object.values(FAVOURITE_ICON),
      description: 'Иконка',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: {
        category: 'HTML Attributes',
      },
    },
  },
};
