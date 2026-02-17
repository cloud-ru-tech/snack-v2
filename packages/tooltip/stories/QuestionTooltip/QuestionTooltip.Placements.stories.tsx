import type { Meta, StoryObj } from '@storybook/react';

import { PLACEMENT, QuestionTooltip, type QuestionTooltipProps } from '../../src';
import styles from '../styles.module.scss';

const meta: Meta<QuestionTooltipProps> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
};

export default meta;
type Story = StoryObj<QuestionTooltipProps>;

const keyPlacements = [PLACEMENT.Top, PLACEMENT.Bottom, PLACEMENT.Left, PLACEMENT.Right];

export const Placements: Story = {
  tags: ['!dev', 'autodocs'],
  render: () => (
    <div className={styles.placementsWrapper}>
      {keyPlacements.map(placement => (
        <QuestionTooltip key={placement} tip={`Placement: ${placement}`} placement={placement} />
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Основные варианты расположения тултипа относительно иконки-триггера (top, bottom, left, right). Наведи курсор на иконку.',
      },
    },
  },
};
