import { AiHistoryLineIndicator, AiHistoryLineStepper } from '@ds/ai-history-line';
import { BulletListSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const OFFSET = 'var(--ds-ai-history-line-indicator-offset)';

const meta: Meta<typeof AiHistoryLineStepper> = {
  title: 'Components/AiHistoryLine/AiHistoryLineStepper',
  component: AiHistoryLineStepper,
};

export default meta;
type Story = StoryObj<typeof AiHistoryLineStepper>;

function Rail({
  offset,
  showLeadingConnector = false,
  showClosingConnector = false,
}: {
  offset?: string;
  showLeadingConnector?: boolean;
  showClosingConnector?: boolean;
}): ReactElement {
  return (
    <div className={styles.frame}>
      <AiHistoryLineStepper
        offset={offset}
        showLeadingConnector={showLeadingConnector}
        showClosingConnector={showClosingConnector}
      >
        <AiHistoryLineIndicator>
          <BulletListSVG aria-hidden />
        </AiHistoryLineIndicator>
      </AiHistoryLineStepper>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='offset'
      firstColumnHeader='верхний коннектор'
      columnHeaders={['нижний есть', 'нижнего нет']}
      rows={[
        {
          variantLabel: 'линия видна',
          cells: [
            <Rail key='line-both' offset={OFFSET} showLeadingConnector showClosingConnector />,
            <Rail key='line-leading' offset={OFFSET} showLeadingConnector />,
          ],
        },
        {
          variantLabel: 'линия скрыта',
          cells: [
            <Rail key='hidden-both' offset={OFFSET} showClosingConnector />,
            <Rail key='hidden-leading' offset={OFFSET} />,
          ],
        },
        {
          variantLabel: 'без offset',
          cells: [<Rail key='empty-closing' showClosingConnector />, <Rail key='empty' />],
        },
      ]}
    />
  ),
};
