import { AiHistoryLineIndicator, AiHistoryLineStepper } from '@ds/ai-history-line';
import { BulletListSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import styles from './styles.module.scss';

const OFFSET = 'var(--ds-ai-history-line-indicator-offset)';

function Mark() {
  return (
    <AiHistoryLineIndicator>
      <BulletListSVG aria-hidden />
    </AiHistoryLineIndicator>
  );
}

const meta: Meta<typeof AiHistoryLineStepper> = {
  title: 'Components/AiHistoryLine/AiHistoryLineStepper',
  component: AiHistoryLineStepper,
  args: {
    offset: OFFSET,
    showLeadingConnector: true,
    showClosingConnector: true,
  },
  argTypes: {
    children: { table: { disable: true } },
  },
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineStepper>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ offset, showLeadingConnector, showClosingConnector }) => (
    <div className={styles.chain}>
      <AiHistoryLineStepper
        className={styles.step}
        offset={offset}
        showLeadingConnector={showLeadingConnector}
        showClosingConnector
      >
        <Mark />
      </AiHistoryLineStepper>
      <AiHistoryLineStepper
        className={styles.step}
        offset={offset}
        showLeadingConnector
        showClosingConnector={showClosingConnector}
      >
        <Mark />
      </AiHistoryLineStepper>
    </div>
  ),
};
