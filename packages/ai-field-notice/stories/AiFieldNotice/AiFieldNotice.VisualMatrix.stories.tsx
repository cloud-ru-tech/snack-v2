import { AiFieldNotice, AiFieldNoticeProps, SIZE } from '@ds/ai-field-notice';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import {
  FIXTURE_PASSWORD_NOTICE,
  FIXTURE_QUEUE_NOTICE,
  FIXTURE_SSH_NOTICE,
  FIXTURE_SUPPORT_NOTICE,
  FIXTURE_VM_AGENT_NOTICE,
} from './fixtures';
import styles from './stories.module.scss';
import { matrixCellTestId } from './testIds';

const meta: Meta<typeof AiFieldNotice> = {
  title: 'Ai/AiFieldNotice',
  component: AiFieldNotice,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiFieldNotice>;

const sizes = Object.values(SIZE);

const scenarioRows: Array<{
  key: string;
  label: string;
  props: AiFieldNoticeProps;
}> = [
  {
    key: 'password',
    label: 'password',
    props: FIXTURE_PASSWORD_NOTICE,
  },
  {
    key: 'ssh',
    label: 'ssh',
    props: FIXTURE_SSH_NOTICE,
  },
  {
    key: 'support',
    label: 'support',
    props: FIXTURE_SUPPORT_NOTICE,
  },
  {
    key: 'queue',
    label: 'queue',
    props: FIXTURE_QUEUE_NOTICE,
  },
  {
    key: 'vm-agent',
    label: 'vm agent',
    props: FIXTURE_VM_AGENT_NOTICE,
  },
];

function renderNoticeCell(props: AiFieldNoticeProps, testId: string): ReactElement {
  return (
    <div className={styles.noticeCell}>
      <AiFieldNotice {...props} data-test-id={testId} />
    </div>
  );
}

export const VisualMatrixScenarioSize: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Scenario × Size'
        firstColumnHeader='Scenario'
        columnHeaders={sizes.map(size => size.toUpperCase())}
        rows={scenarioRows.map(({ key, label, props }) => ({
          variantLabel: label,
          cells: sizes.map(size =>
            renderNoticeCell({ ...props, size }, matrixCellTestId('scenario-size', `${key}-size-${size}`)),
          ),
        }))}
      />
    </div>
  ),
};
