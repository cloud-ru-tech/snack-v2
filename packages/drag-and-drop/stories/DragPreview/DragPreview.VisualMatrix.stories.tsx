import { DragPreview } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { StoryTable } from '#storybook/components';

import styles from '../stories.module.scss';

const meta: Meta<typeof DragPreview> = {
  title: 'Components/DragAndDrop/DragPreview',
  component: DragPreview,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DragPreview>;

const radii = [
  { label: 'rounded', className: styles.radiusRounded },
  { label: 'square', className: styles.radiusSquare },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Radius (наследуется от сущности)'
        firstColumnHeader='Radius'
        columnHeaders={['Preview']}
        rows={radii.map(({ label, className }) => ({
          variantLabel: label,
          cells: [
            <div key={label} className={styles.canvas}>
              <DragPreview className={cn(styles.entity, className)}>
                <div className={styles.row}>ListItem 2</div>
              </DragPreview>
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
