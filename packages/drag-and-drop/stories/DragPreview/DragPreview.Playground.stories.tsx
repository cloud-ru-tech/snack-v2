import { DragPreview } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof DragPreview> = {
  title: 'Components/DragAndDrop/DragPreview',
  component: DragPreview,
  parameters: { layout: 'fullscreen' },
  args: {
    'data-test-id': TEST_IDS.dragPreview,
  },
};

export default meta;
type Story = StoryObj<typeof DragPreview>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Поверхность перетаскиваемой копии. Скругление берётся у сущности внутри — обёртка повторяет её форму. Копия за
          курсором показана в story `DragGhost/Examples/SortableList`: там перенос запускается по-настоящему.
        </DemoHint>
        <DemoActions align='center'>
          <div className={cn(styles.canvas)}>
            <DragPreview {...args} className={cn(styles.entity, styles.radiusRounded, args.className)}>
              <div className={styles.row}>ListItem 2</div>
            </DragPreview>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.dragPreview)).toBeVisible();
  },
};
