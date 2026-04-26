import { APPEARANCE, SIZE, Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: { layout: 'centered' },
  args: {
    label: 'Tag',
    size: SIZE.Xs,
    appearance: APPEARANCE.Neutral,
  },
  argTypes: {
    size: { control: 'select', options: Object.values(SIZE) },
    appearance: { control: 'select', options: Object.values(APPEARANCE) },
  },
};
export default meta;

type Story = StoryObj<typeof Tag>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('Tag')).toBeVisible();
  },
};
