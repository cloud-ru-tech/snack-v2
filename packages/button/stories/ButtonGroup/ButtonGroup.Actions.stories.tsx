import { ButtonGroup } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Actions: Story = {
  tags: ['dev'],
  args: {
    'data-test-id': 'button-group',
    primaryAction: { label: 'Сохранить', appearance: 'primary', view: 'filled' },
    secondaryAction: { label: 'Отмена', appearance: 'neutral', view: 'outline' },
  },
  play: async ({ canvasElement }) => {
    const buttons = within(canvasElement).getAllByRole('button');
    await expect(buttons).toHaveLength(2);
    await expect(buttons[0]).toHaveTextContent('Отмена');
    await expect(buttons[1]).toHaveTextContent('Сохранить');
  },
};
