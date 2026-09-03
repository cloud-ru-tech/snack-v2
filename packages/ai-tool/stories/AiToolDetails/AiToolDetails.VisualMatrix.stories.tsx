import {
  AI_TOOL_DETAILS_HEIGHT,
  AI_TOOL_DETAILS_STATE,
  AiToolDetails,
  AiToolKeyValue,
  AiToolObject,
  AiToolText,
} from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './AiToolDetails.VisualMatrix.module.scss';

const meta: Meta<typeof AiToolDetails> = {
  title: 'AI/AiTool/Atoms/AiToolDetails',
  component: AiToolDetails,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolDetails>;

const states = Object.values(AI_TOOL_DETAILS_STATE);
const heights = Object.values(AI_TOOL_DETAILS_HEIGHT);
const heightRows = Array.from({ length: 18 }, (_, index) => [`property_${index + 1}`, `value_${index + 1}`] as const);
const copyStates = [
  { key: 'shown', label: 'SHOWN', copyValue: 'TextBlock Text', showCopyButton: true },
  { key: 'hidden', label: 'HIDDEN', copyValue: 'TextBlock Text', showCopyButton: false },
  { key: 'empty', label: 'EMPTY VALUE', copyValue: '', showCopyButton: true },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='State (контент наследует mono/error из контекста)'
        firstColumnHeader='—'
        columnHeaders={states.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'details',
            cells: states.map(state => (
              <div key={state} className={styles.cell}>
                <AiToolDetails
                  label='tool_name'
                  state={state}
                  scroll={false}
                  data-test-id={`${TEST_IDS.details}-${state}`}
                >
                  <AiToolText>TextBlock Text</AiToolText>
                  <AiToolKeyValue label='region' value='ru-central1' />
                  <AiToolObject variant='string' name='status' value='ok' />
                </AiToolDetails>
              </div>
            )),
          },
        ]}
      />
      <StoryTable
        sectionTitle='Copy'
        firstColumnHeader='—'
        columnHeaders={copyStates.map(({ label }) => label)}
        rows={[
          {
            variantLabel: 'copy',
            cells: copyStates.map(({ key, copyValue, showCopyButton }) => (
              <div key={key} className={styles.cell}>
                <AiToolDetails
                  label='tool_name'
                  copyValue={copyValue}
                  showCopyButton={showCopyButton}
                  scroll={false}
                  data-test-id={`${TEST_IDS.details}-copy-${key}`}
                >
                  <AiToolText>TextBlock Text</AiToolText>
                </AiToolDetails>
              </div>
            )),
          },
        ]}
      />
      <StoryTable
        sectionTitle='Height'
        firstColumnHeader='Height'
        columnHeaders={['SCROLL']}
        rows={heights.map(height => ({
          variantLabel: height,
          cells: [
            <div key={height} className={styles.cell}>
              <AiToolDetails label='tool_name' height={height}>
                {heightRows.map(([label, value]) => (
                  <AiToolKeyValue key={label} label={label} value={value} />
                ))}
              </AiToolDetails>
            </div>,
          ],
        }))}
      />
    </>
  ),
};
