import { AiReasoning } from '@ds/ai-reasoning';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiReasoning> = {
  title: 'AI/AiReasoning',
  component: AiReasoning,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiReasoning>;

const stepperRows = [
  { key: 'with-line', label: 'stepper line on', stepperLine: true },
  { key: 'without-line', label: 'stepper line off', stepperLine: false },
] as const;

const contentRows = [
  { key: 'short', label: 'short text', content: 'reasoning in progress' },
  {
    key: 'long',
    label: 'long text',
    content: 'reasoning is collecting intermediate details from tools and composing a final response for the user',
  },
] as const;

const connectorOverrideRows = [
  { key: 'default-on', label: 'line=true, connector=auto', props: { stepperLine: true } },
  { key: 'default-off', label: 'line=false, connector=auto', props: { stepperLine: false } },
  { key: 'forced-on', label: 'line=false, connector=true', props: { stepperLine: false, connector: true } },
  { key: 'forced-off', label: 'line=true, connector=false', props: { stepperLine: true, connector: false } },
] as const;

function renderCell(props: Parameters<typeof AiReasoning>[0], testId: string): ReactElement {
  return (
    <div className={styles.cell}>
      <AiReasoning {...props} data-test-id={testId} />
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Connector × Content'
        firstColumnHeader='Connector'
        columnHeaders={contentRows.map(row => row.label.toUpperCase())}
        rows={stepperRows.map(stepper => ({
          variantLabel: stepper.label,
          cells: contentRows.map(col =>
            renderCell(
              { stepperLine: stepper.stepperLine, content: col.content },
              `${TEST_IDS.root}-${stepper.key}-${col.key}`,
            ),
          ),
        }))}
      />

      <StoryTable
        sectionTitle='Explicit connector override'
        firstColumnHeader='Mode'
        columnHeaders={['PREVIEW']}
        rows={connectorOverrideRows.map(row => ({
          variantLabel: row.label,
          cells: [
            renderCell(
              { ...row.props, content: 'connector visibility sample' },
              `${TEST_IDS.root}-connector-override-${row.key}`,
            ),
          ],
        }))}
      />
    </div>
  ),
};
