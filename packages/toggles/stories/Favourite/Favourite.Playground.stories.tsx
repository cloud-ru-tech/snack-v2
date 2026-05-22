import { Favourite, FAVOURITE_ICON, FavouriteProps, SIZE } from '@ds/toggles';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<FavouriteProps> = {
  title: 'Components/Toggles/Favourite',
  component: Favourite,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type StoryProps = FavouriteProps;
type Story = StoryObj<StoryProps>;

const Template: StoryFn<StoryProps> = args => {
  const [{ checked }, updateArgs] = useArgs<FavouriteProps>();

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Кнопка добавления в избранное с двумя состояниями.</DemoHint>
        <DemoActions align='center'>
          <Favourite {...args} checked={checked} onChange={updatedValue => updateArgs({ checked: updatedValue })} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.favourite.root)).toBeVisible();
  },
  args: {
    size: SIZE.XS,
    icon: FAVOURITE_ICON.Star,
    checked: undefined,
    defaultChecked: undefined,
    loading: false,
    disabled: false,
    'data-test-id': TEST_IDS.favourite.root,
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
