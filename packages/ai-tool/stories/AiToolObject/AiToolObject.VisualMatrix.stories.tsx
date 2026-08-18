import { AI_TOOL_OBJECT_TYPE, AiToolKeyValue, AiToolObject } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './AiToolObject.VisualMatrix.module.scss';

const meta: Meta<typeof AiToolObject> = {
  title: 'AI/AiTool/Content/AiToolObject',
  component: AiToolObject,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolObject>;

const cases: { label: string; node: ReactNode }[] = [
  {
    label: 'complex-closed',
    node: (
      <AiToolObject
        name='Key[ObjectName]'
        variant={AI_TOOL_OBJECT_TYPE.Complex}
        opened={false}
        data-test-id={`${TEST_IDS.object}-complex-closed`}
      />
    ),
  },
  {
    label: 'complex-opened',
    node: (
      <AiToolObject
        name='Key[ObjectName]'
        variant={AI_TOOL_OBJECT_TYPE.Complex}
        opened
        data-test-id={`${TEST_IDS.object}-complex-opened`}
      >
        <AiToolKeyValue label='region' value='ru-central1' />
        <AiToolKeyValue label='status' value='ok' />
      </AiToolObject>
    ),
  },
  {
    label: 'string',
    node: (
      <AiToolObject
        name='Key'
        value='Value'
        variant={AI_TOOL_OBJECT_TYPE.String}
        data-test-id={`${TEST_IDS.object}-string`}
      />
    ),
  },
];

const monoStates = [false, true] as const;
const errorStates = [false, true] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Variant × Opened'
        firstColumnHeader='—'
        columnHeaders={cases.map(c => c.label.toUpperCase())}
        rows={[
          {
            variantLabel: 'object',
            cells: cases.map(c => (
              <div key={c.label} className={styles.cell}>
                {c.node}
              </div>
            )),
          },
        ]}
      />
      <StoryTable
        sectionTitle='Error × Mono'
        firstColumnHeader='Error'
        columnHeaders={monoStates.map(m => (m ? 'MONO' : 'LABEL'))}
        rows={errorStates.map(error => ({
          variantLabel: error ? 'error' : 'default',
          cells: monoStates.map(mono => (
            <div key={`${error}-${mono}`} className={styles.cell}>
              <AiToolObject
                name='Key'
                value='Value'
                variant={AI_TOOL_OBJECT_TYPE.String}
                error={error}
                mono={mono}
                data-test-id={`${TEST_IDS.object}-${error ? 'error' : 'default'}-${mono ? 'mono' : 'label'}`}
              />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
