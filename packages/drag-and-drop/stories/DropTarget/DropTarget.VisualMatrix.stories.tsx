import { DropTarget } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';

import { StoryTable } from '#storybook/components';

import styles from '../stories.module.scss';

const meta: Meta<typeof DropTarget> = {
  title: 'Components/DragAndDrop/DropTarget',
  component: DropTarget,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof DropTarget>;

const states = [
  { label: 'default', active: false },
  { label: 'active', active: true },
] as const;

const contents = [
  { label: 'Empty', render: () => null, className: styles.emptyZone },
  {
    label: 'With content',
    render: () => (
      <>
        <div className={styles.row}>ListItem 1</div>
        <div className={styles.row}>ListItem 2</div>
      </>
    ),
    className: styles.entity,
  },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='State × Content'
        firstColumnHeader='State'
        columnHeaders={contents.map(({ label }) => label)}
        rows={states.map(({ label, active }) => ({
          variantLabel: label,
          cells: contents.map(content => (
            <div key={content.label} className={styles.canvas}>
              <DropTarget active={active} className={cn(content.className)}>
                {content.render()}
              </DropTarget>
            </div>
          )),
        }))}
      />
    </div>
  ),
};
