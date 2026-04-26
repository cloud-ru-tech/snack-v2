import { PLACEMENT, PopoverPrivate, type PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

const keyPlacements = [
  PLACEMENT.Top,
  PLACEMENT.TopStart,
  PLACEMENT.TopEnd,
  PLACEMENT.Bottom,
  PLACEMENT.BottomStart,
  PLACEMENT.BottomEnd,
  PLACEMENT.Left,
  PLACEMENT.LeftStart,
  PLACEMENT.LeftEnd,
  PLACEMENT.Right,
  PLACEMENT.RightStart,
  PLACEMENT.RightEnd,
];

const PopoverContent = ({ label }: { label: string }) => <div className={styles.popoverContent}>{label}</div>;

export const Placements: Story = {
  tags: ['!dev', 'autodocs'],
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, padding: 64, justifyContent: 'center' }}>
      {keyPlacements.map(placement => (
        <PopoverPrivate
          key={placement}
          trigger={TRIGGER.Click}
          placement={placement}
          popoverContent={<PopoverContent label={placement} />}
        >
          <button type='button'>{placement}</button>
        </PopoverPrivate>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Доступные варианты позиционирования поповера относительно триггера.',
      },
    },
  },
};
