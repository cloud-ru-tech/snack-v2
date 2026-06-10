import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiTool, AiToolStatusState } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './AiTool.VisualMatrix.module.scss';
import { callPreset, resultPreset, TOOL_DURATION, TOOL_NAME } from './presets';

const meta: Meta<typeof AiTool> = {
  title: 'AI/AiTool/AiTool',
  component: AiTool,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiTool>;

const keyStates: AiToolStatusState[] = [
  AI_TOOL_STATUS_STATE.Pending,
  AI_TOOL_STATUS_STATE.Loading,
  AI_TOOL_STATUS_STATE.Success,
  AI_TOOL_STATUS_STATE.Error,
];

type SlotCase = {
  label: string;
  suffix: string;
  state: AiToolStatusState;
  call?: ReactNode;
  result?: ReactNode;
};

const slotCases: SlotCase[] = [
  {
    label: 'call + result',
    suffix: 'both',
    state: AI_TOOL_STATUS_STATE.Success,
    call: callPreset,
    result: resultPreset,
  },
  { label: 'только call', suffix: 'call', state: AI_TOOL_STATUS_STATE.Success, call: callPreset },
  { label: 'только result', suffix: 'result', state: AI_TOOL_STATUS_STATE.Success, result: resultPreset },
  { label: 'без деталей', suffix: 'none', state: AI_TOOL_STATUS_STATE.Success },
  {
    label: 'error: красный result',
    suffix: 'error',
    state: AI_TOOL_STATUS_STATE.Error,
    call: callPreset,
    result: resultPreset,
  },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='State (closed)'
        firstColumnHeader='State'
        columnHeaders={['—']}
        rows={keyStates.map(state => ({
          variantLabel: state,
          cells: [
            <div key={state} className={styles.cell}>
              <AiTool
                name={TOOL_NAME}
                icon={AI_TOOL_ICON_TYPE.Search}
                state={state}
                duration={TOOL_DURATION}
                call={callPreset}
                result={resultPreset}
                data-test-id={`${TEST_IDS.tool}-${state}-closed`}
              />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Slots (opened)'
        firstColumnHeader='Slots'
        columnHeaders={['—']}
        rows={slotCases.map(({ label, suffix, state, call, result }) => ({
          variantLabel: label,
          cells: [
            <div key={suffix} className={styles.cell}>
              <AiTool
                name='create_instance'
                icon={AI_TOOL_ICON_TYPE.Act}
                state={state}
                opened
                call={call}
                result={result}
                data-test-id={`${TEST_IDS.tool}-slots-${suffix}`}
              />
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Timeline (connector)'
        firstColumnHeader='—'
        columnHeaders={['—']}
        rows={[
          {
            variantLabel: 'timeline',
            cells: [
              <div key='timeline' className={styles.timeline}>
                <AiTool
                  name='search_documents'
                  icon={AI_TOOL_ICON_TYPE.Search}
                  state={AI_TOOL_STATUS_STATE.Success}
                  duration={3}
                  connector
                  data-test-id={`${TEST_IDS.tool}-timeline-1`}
                />
                <AiTool
                  name='read_document'
                  icon={AI_TOOL_ICON_TYPE.Read}
                  state={AI_TOOL_STATUS_STATE.Success}
                  duration={12}
                  connector
                  data-test-id={`${TEST_IDS.tool}-timeline-2`}
                />
                <AiTool
                  name={TOOL_NAME}
                  icon={AI_TOOL_ICON_TYPE.Act}
                  state={AI_TOOL_STATUS_STATE.Loading}
                  duration={9}
                  data-test-id={`${TEST_IDS.tool}-timeline-3`}
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
