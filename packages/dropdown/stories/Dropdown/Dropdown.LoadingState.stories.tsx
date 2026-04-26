import { Button } from '@ds/button';
import { Dropdown, STATE } from '@ds/dropdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const LoadingState: Story = {
  tags: ['dev'],
  render: () => (
    <Dropdown open state={{ type: STATE.Loading }} content={null}>
      <Button label='Загрузка' />
    </Dropdown>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByRole('button', { name: 'Загрузка' })).toBeVisible();
  },
};
