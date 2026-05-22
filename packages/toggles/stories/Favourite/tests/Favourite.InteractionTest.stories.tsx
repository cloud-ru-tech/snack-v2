import { Favourite, FAVOURITE_ICON, FavouriteProps, SIZE } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<FavouriteProps> = {
  title: 'Components/Toggles/Favourite/Tests/Interaction',
  component: Favourite,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    size: SIZE.XS,
    icon: FAVOURITE_ICON.Star,
    defaultChecked: false,
    onChange: fn(),
    'data-test-id': TEST_IDS.favourite.root,
  },
};

export default meta;
type Story = StoryObj<FavouriteProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по иконке избранного переключает значение и вызывает onChange.</DemoHint>
        <DemoActions align='center'>
          <Favourite {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByTestId(TEST_IDS.favourite.nativeInput);

    await step('click: triggers onChange(true)', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledTimes(1);
      expect(args.onChange).toHaveBeenLastCalledWith(true);
    });

    await step('click again: triggers onChange(false)', async () => {
      await userEvent.click(input);
      expect(args.onChange).toHaveBeenCalledTimes(2);
      expect(args.onChange).toHaveBeenLastCalledWith(false);
    });
  },
};
