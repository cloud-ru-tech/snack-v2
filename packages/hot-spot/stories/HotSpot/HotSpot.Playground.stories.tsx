import { Button } from '@ds/button';
import { APPEARANCE, HotSpot, HotSpotProps, PLACEMENT } from '@ds/hot-spot';
import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<HotSpotProps> = {
  title: 'Components/HotSpot',
  component: HotSpot,
  args: {
    appearance: APPEARANCE.Primary,
    pulse: true,
    duration: '2s',
    placement: PLACEMENT.Right,
    enabled: true,
    offsetX: 16,
    offsetY: 0,
    'data-test-id': 'hot-spot',
  },
  argTypes: {
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид (цвет точки)',
    },
    pulse: {
      control: 'boolean',
      description: 'Анимация пульсации',
    },
    duration: {
      control: 'text',
      description: 'Время анимации пульсации',
    },
    placement: {
      control: 'select',
      options: Object.values(PLACEMENT),
      description: 'Положение dot относительно children',
    },
    enabled: {
      control: 'boolean',
      description: 'Управление отображением',
    },
    offsetX: {
      control: { type: 'number' },
      description: 'Смещение dot по оси X',
    },
    offsetY: {
      control: { type: 'number' },
      description: 'Смещение dot по оси Y',
    },
  },
};

export default meta;
type Story = StoryObj<HotSpotProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    children: (
      <Button
        label='Уведомления'
        view='function'
        appearance='neutral'
        icon={<PlaceholderSVG />}
        iconPosition='before'
      />
    ),
    'data-test-id': 'hot-spot',
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('hot-spot')).toBeVisible();
  },
};
