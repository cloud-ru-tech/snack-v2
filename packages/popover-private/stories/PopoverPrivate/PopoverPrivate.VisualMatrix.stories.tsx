import { PLACEMENT, PopoverPrivate, type PopoverPrivateProps, TRIGGER } from '@ds/popover-private';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<PopoverPrivateProps> = {
  title: 'Components/PopoverPrivate',
  component: PopoverPrivate,
};

export default meta;
type Story = StoryObj<PopoverPrivateProps>;

const keyPlacements = [PLACEMENT.Top, PLACEMENT.Bottom, PLACEMENT.Left, PLACEMENT.Right];
const keyTriggers = [TRIGGER.Click, TRIGGER.Hover];

import styles from './styles.module.scss';

const PopoverContent = ({ label }: { label: string }) => <div className={styles.popoverContent}>{label}</div>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true, figma: { disable: true } } },
  render: () => (
    <StoryTable
      sectionTitle='Trigger & Placement'
      firstColumnHeader='Trigger'
      columnHeaders={keyPlacements.map(p => p)}
      rows={keyTriggers.map(trigger => ({
        variantLabel: trigger,
        cells: keyPlacements.map(placement => (
          <PopoverPrivate
            key={placement}
            trigger={trigger}
            placement={placement}
            popoverContent={<PopoverContent label={`${trigger} ${placement}`} />}
          >
            <button type='button'>Open</button>
          </PopoverPrivate>
        )),
      }))}
    />
  ),
};
