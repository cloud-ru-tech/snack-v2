import { PLACEMENT, Popover, type PopoverProps, TRIGGER } from '@design-system/popover';
import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<PopoverProps> = {
  title: 'Components/Popover',
  component: Popover,
};

export default meta;
type Story = StoryObj<PopoverProps>;

const keyPlacements = [PLACEMENT.Top, PLACEMENT.Bottom, PLACEMENT.Left, PLACEMENT.Right];
const keyTriggers = [TRIGGER.Click, TRIGGER.Hover];

const PopoverContentSlot = ({ label }: { label: string }) => <div className={styles.popoverContent}>{label}</div>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <StoryTable
      sectionTitle='Trigger & Placement'
      firstColumnHeader='Trigger'
      columnHeaders={keyPlacements.map(p => p)}
      rows={keyTriggers.map(trigger => ({
        variantLabel: trigger,
        cells: keyPlacements.map(placement => (
          <Popover
            key={placement}
            trigger={trigger}
            placement={placement}
            content={<PopoverContentSlot label={`${trigger} ${placement}`} />}
          >
            <button type='button'>Open</button>
          </Popover>
        )),
      }))}
    />
  ),
};
