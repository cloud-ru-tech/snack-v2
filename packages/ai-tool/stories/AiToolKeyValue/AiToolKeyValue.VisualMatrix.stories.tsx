import { AI_TOOL_KEY_VALUE_TYPE, AiToolKeyValue } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './AiToolKeyValue.VisualMatrix.module.scss';

const meta: Meta<typeof AiToolKeyValue> = {
  title: 'AI/AiTool/Content/AiToolKeyValue',
  component: AiToolKeyValue,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolKeyValue>;

const types = Object.values(AI_TOOL_KEY_VALUE_TYPE);
const monoStates = [false, true] as const;
const errorStates = [false, true] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='Variant'
        firstColumnHeader='—'
        columnHeaders={types.map(t => t.toUpperCase())}
        rows={[
          {
            variantLabel: 'key-value',
            cells: types.map(type => (
              <div key={type} className={styles.cell}>
                <AiToolKeyValue
                  label='Key'
                  value='Value'
                  variant={type}
                  data-test-id={`${TEST_IDS.keyValue}-${type}`}
                />
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
              <AiToolKeyValue
                label='Key'
                value='Value'
                error={error}
                mono={mono}
                data-test-id={`${TEST_IDS.keyValue}-${error ? 'error' : 'default'}-${mono ? 'mono' : 'label'}`}
              />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
