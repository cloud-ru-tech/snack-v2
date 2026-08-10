import { DropIndicator, ORIENTATION } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { StoryTable } from '#storybook/components';

import styles from '../stories.module.scss';

const meta: Meta<typeof DropIndicator> = {
  title: 'Components/DragAndDrop/DropIndicator',
  component: DropIndicator,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DropIndicator>;

const orientations = Object.values(ORIENTATION);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Orientation'
        firstColumnHeader='Orientation'
        columnHeaders={['Indicator']}
        rows={orientations.map(orientation => ({
          variantLabel: orientation,
          cells: [
            // Линия растягивается по родителю, поэтому у ячейки задан размер вдоль её оси.
            <div
              key={orientation}
              className={cn(styles.canvas, styles.entity, {
                [styles.verticalCell]: orientation === ORIENTATION.Vertical,
              })}
            >
              <DropIndicator orientation={orientation} />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
