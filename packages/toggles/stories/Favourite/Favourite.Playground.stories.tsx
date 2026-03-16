import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';

import togglesReadme from '../../README.md?raw';
import { Favourite, FAVOURITE_ICON, FavouriteProps, SIZE } from '../../src';

const meta: Meta<FavouriteProps> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: {
    readme: { content: togglesReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/BnDZww7tvszWBemlYQS1Pg/%D0%A1%D0%BE%D1%81%D1%82%D0%BE%D1%8F%D0%BD%D0%B8%D1%8F-%D0%B4%D0%BB%D1%8F-list--tab--toggles--FF-8135-?node-id=2852-26425&m=dev',
    },
  },
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
