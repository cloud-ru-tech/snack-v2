import { DRAG_MODE, DragGhost } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof DragGhost> = {
  title: 'Components/DragAndDrop/DragGhost',
  component: DragGhost,
  parameters: { layout: 'fullscreen' },
  args: {
    dragging: true,
    mode: DRAG_MODE.Static,
    'data-test-id': TEST_IDS.dragGhost,
  },
};

export default meta;
type Story = StoryObj<typeof DragGhost>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Исходная сущность на время переноса: в `static` остаётся на месте приглушённой, в `dynamic` — уступает место,
          и её слот пустеет. Компонент презентационный, поэтому Playground показывает вид состояния, а не сам перенос —
          живой перенос собран в story `DragGhost/Examples/SortableList`.
        </DemoHint>
        <DemoActions align='center'>
          {/* Соседи вокруг: без них пустой слот не с чем сравнить. */}
          <div className={cn(styles.canvas, styles.list)}>
            <div className={styles.row}>ListItem 1</div>
            <DragGhost {...args} className={cn(styles.radiusRounded, args.className)}>
              <div className={styles.row}>ListItem 2</div>
            </DragGhost>
            <div className={styles.row}>ListItem 3</div>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.dragGhost)).toBeVisible();
  },
};
