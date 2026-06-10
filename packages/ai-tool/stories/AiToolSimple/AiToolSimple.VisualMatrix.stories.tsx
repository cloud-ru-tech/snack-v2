import { AI_TOOL_ICON_TYPE, AI_TOOL_STATUS_STATE, AiToolSimple } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';
import { badgesPreset, SIMPLE_DESCRIPTION, SIMPLE_NAME } from './presets';

const meta: Meta<typeof AiToolSimple> = {
  title: 'AI/AiTool/AiToolSimple',
  component: AiToolSimple,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolSimple>;

const LONG_NAME = 'request_statuses_for_users_in_all_connected_services_and_aggregate';

type OpenedCase = {
  label: string;
  suffix: string;
  name: ReactNode;
};

const openedCases: OpenedCase[] = [
  { label: 'default', suffix: 'default', name: SIMPLE_NAME },
  { label: 'длинное имя', suffix: 'long-name', name: LONG_NAME },
];

type SlotCase = {
  label: string;
  suffix: string;
  description?: ReactNode;
  children?: ReactNode;
};

const slotCases: SlotCase[] = [
  { label: 'только description', suffix: 'description', description: SIMPLE_DESCRIPTION },
  { label: 'только badges', suffix: 'badges', children: badgesPreset },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Opened × Name'
        firstColumnHeader='Name'
        columnHeaders={['CLOSED', 'OPENED']}
        rows={openedCases.map(({ label, suffix, name }) => ({
          variantLabel: label,
          cells: [false, true].map(opened => (
            <div key={String(opened)} className={styles.cell}>
              <AiToolSimple
                name={name}
                icon={AI_TOOL_ICON_TYPE.Search}
                opened={opened}
                description={SIMPLE_DESCRIPTION}
                data-test-id={`${TEST_IDS.simple}-${suffix}-${opened ? 'opened' : 'closed'}`}
              >
                {badgesPreset}
              </AiToolSimple>
            </div>
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Slots (opened)'
        firstColumnHeader='Slots'
        columnHeaders={['—']}
        rows={slotCases.map(({ label, suffix, description, children }) => ({
          variantLabel: label,
          cells: [
            <div key={suffix} className={styles.cell}>
              <AiToolSimple
                name='create_instance'
                icon={AI_TOOL_ICON_TYPE.Act}
                opened
                description={description}
                data-test-id={`${TEST_IDS.simple}-slots-${suffix}`}
              >
                {children}
              </AiToolSimple>
            </div>,
          ],
        }))}
      />
      <StoryTable
        sectionTitle='Timeline (connector + loading)'
        firstColumnHeader='—'
        columnHeaders={['—']}
        rows={[
          {
            variantLabel: 'timeline',
            cells: [
              <div key='timeline' className={styles.timeline}>
                <AiToolSimple
                  name='search_documents'
                  icon={AI_TOOL_ICON_TYPE.Search}
                  connector
                  data-test-id={`${TEST_IDS.simple}-timeline-1`}
                />
                <AiToolSimple
                  name='read_document'
                  icon={AI_TOOL_ICON_TYPE.Read}
                  connector
                  data-test-id={`${TEST_IDS.simple}-timeline-2`}
                />
                <AiToolSimple
                  name={SIMPLE_NAME}
                  icon={AI_TOOL_ICON_TYPE.Act}
                  state={AI_TOOL_STATUS_STATE.Loading}
                  data-test-id={`${TEST_IDS.simple}-timeline-3`}
                />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
