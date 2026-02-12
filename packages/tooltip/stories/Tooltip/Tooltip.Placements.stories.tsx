import type { Meta, StoryObj } from '@storybook/react';

import { PLACEMENT, Tooltip, TooltipProps } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<TooltipProps> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<TooltipProps>;

const keyPlacements = [PLACEMENT.Top, PLACEMENT.Bottom, PLACEMENT.Left, PLACEMENT.Right];

export const Placements: Story = {
  tags: ['!dev', 'autodocs'],
  render: () => (
    <div className={styles.placementsWrapper}>
      {keyPlacements.map(placement => (
        <Tooltip key={placement} content={`Placement: ${placement}`} placement={placement}>
          <button type='button'>{placement}</button>
        </Tooltip>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Основные варианты расположения тултипа относительно триггера (top, bottom, left, right). Наведи курсор на кнопку.',
      },
    },
  },
};
