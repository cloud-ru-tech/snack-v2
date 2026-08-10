import { DropTarget } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof DropTarget> = {
  title: 'Components/DragAndDrop/DropTarget',
  component: DropTarget,
  parameters: { layout: 'fullscreen' },
  args: {
    active: true,
    'data-test-id': TEST_IDS.dropTarget,
  },
};

export default meta;
type Story = StoryObj<typeof DropTarget>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Зона приёма: подсветка включается, когда перетаскиваемая сущность над зоной (`active`). Живой перенос между
          зонами — в story `DropTarget/Examples/CrossZone`.
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.canvas}>
            <DropTarget {...args} className={cn(styles.entity, args.className)}>
              <div className={styles.row}>ListItemGroup 1</div>
              <div className={styles.row}>ListItem 1</div>
              <div className={styles.row}>ListItem 2</div>
            </DropTarget>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.dropTarget)).toBeVisible();
  },
};
