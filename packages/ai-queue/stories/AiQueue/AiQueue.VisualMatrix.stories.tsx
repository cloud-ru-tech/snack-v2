import { AI_QUEUE_STEP_STATE, AiQueue } from '@ds/ai-queue';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';
import { matrixCellTestId } from './testIds';

const meta: Meta<typeof AiQueue> = {
  title: 'AI/AiQueue',
  component: AiQueue,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiQueue>;

const queueRows: Array<{ key: string; label: string; props: Parameters<typeof AiQueue>[0] }> = [
  {
    key: 'collapsed',
    label: 'collapsed',
    props: {
      open: false,
      steps: [
        { id: 'planned', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Planned },
        { id: 'progress', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Progress },
        { id: 'done', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
      ],
    },
  },
  {
    key: 'expanded',
    label: 'expanded',
    props: {
      open: true,
      steps: [
        { id: 'done', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
        { id: 'error', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Error },
        { id: 'done-2', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
        { id: 'progress', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Progress },
        { id: 'planned', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Planned },
      ],
    },
  },
  {
    key: 'expanded-scroll',
    label: 'expanded (scroll)',
    props: {
      open: true,
      steps: [
        { id: 'step-1', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
        { id: 'step-2', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Error },
        { id: 'step-3', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
        { id: 'step-4', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Progress },
        { id: 'step-5', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Planned },
        { id: 'step-6', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
        { id: 'step-7', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Error },
        { id: 'step-8', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Done },
        { id: 'step-9', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Progress },
        { id: 'step-10', label: 'Step Description', state: AI_QUEUE_STEP_STATE.Planned },
      ],
    },
  },
];

function renderQueueCell(
  props: Parameters<typeof AiQueue>[0],
  testId: string,
  className = styles.queueCell,
): ReactElement {
  return (
    <div className={className}>
      <AiQueue {...props} data-test-id={testId} />
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Open state'
        firstColumnHeader='State'
        columnHeaders={['Queue']}
        rows={queueRows.map(({ key, label, props }) => ({
          variantLabel: label,
          cells: [renderQueueCell(props, matrixCellTestId(key, 'default'))],
        }))}
      />
    </div>
  ),
};
