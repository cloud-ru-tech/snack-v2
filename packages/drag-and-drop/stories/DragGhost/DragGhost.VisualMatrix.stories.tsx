import { DRAG_MODE, DragGhost } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { StoryTable } from '#storybook/components';

import styles from '../stories.module.scss';

const meta: Meta<typeof DragGhost> = {
  title: 'Components/DragAndDrop/DragGhost',
  component: DragGhost,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DragGhost>;

const states = [
  { label: 'default', dragging: false },
  { label: 'dragging', dragging: true },
] as const;

const modes = [DRAG_MODE.Static, DRAG_MODE.Dynamic] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      {/* Соседи в ячейке обязательны: пустой слот читается только рядом с ними. */}
      <StoryTable
        sectionTitle='State × Mode'
        firstColumnHeader='State'
        columnHeaders={modes.map(mode => mode.toUpperCase())}
        rows={states.map(({ label, dragging }) => ({
          variantLabel: label,
          cells: modes.map(mode => (
            <div key={mode} className={cn(styles.canvas, styles.list)}>
              <div className={styles.row}>ListItem 1</div>
              <DragGhost dragging={dragging} mode={mode} className={styles.radiusRounded}>
                <div className={styles.row}>ListItem 2</div>
              </DragGhost>
              <div className={styles.row}>ListItem 3</div>
            </div>
          )),
        }))}
      />
    </div>
  ),
};
