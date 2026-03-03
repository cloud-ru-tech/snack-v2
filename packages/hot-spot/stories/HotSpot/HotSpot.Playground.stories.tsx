import { Button } from '@design-system/button';
import { PlaceholderSVG } from '@design-system/icons';
import type { Meta, StoryObj } from '@storybook/react';

import { APPEARANCE, HotSpot, type HotSpotProps, PLACEMENT } from '../../src';

const meta: Meta<HotSpotProps> = {
  title: 'Components/HotSpot',
  component: HotSpot,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=8968-2435',
    },
  },
  args: {
    appearance: APPEARANCE.Primary,
    pulse: true,
    duration: '2s',
    placement: PLACEMENT.Right,
    enabled: true,
    offsetX: 16,
    offsetY: 0,
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
  },
};
