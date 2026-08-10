import { DropIndicator, ORIENTATION } from '@ds/drag-and-drop';
import { Meta, StoryObj } from '@storybook/react';
import cn from 'classnames';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof DropIndicator> = {
  title: 'Components/DragAndDrop/DropIndicator',
  component: DropIndicator,
  parameters: { layout: 'fullscreen' },
  args: {
    orientation: ORIENTATION.Horizontal,
    'data-test-id': TEST_IDS.dropIndicator,
  },
};

export default meta;
type Story = StoryObj<typeof DropIndicator>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Линия позиции вставки: показывает, куда встанет сущность, если отпустить её сейчас. Как линия ведёт себя во
          время переноса — в story `DragGhost/Examples/SortableList` в статическом режиме.
        </DemoHint>
        <DemoActions align='center'>
          <div
            className={cn(styles.canvas, styles.entity, {
              [styles.verticalCell]: args.orientation === ORIENTATION.Vertical,
            })}
          >
            <DropIndicator {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.dropIndicator)).toBeVisible();
  },
};
