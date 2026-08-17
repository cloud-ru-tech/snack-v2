import { AiToolArray, AiToolKeyValue } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import styles from './AiToolArray.VisualMatrix.module.scss';

const meta: Meta<typeof AiToolArray> = {
  title: 'AI/AiTool/Content/AiToolArray',
  component: AiToolArray,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolArray>;

const openStates = [false, true] as const;
const monoStates = [false, true] as const;
const errorStates = [false, true] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='State × Open'
        firstColumnHeader='—'
        columnHeaders={openStates.map(o => (o ? 'OPEN' : 'CLOSED'))}
        rows={[
          {
            variantLabel: 'array',
            cells: openStates.map(open => (
              <div key={String(open)} className={styles.cell}>
                <AiToolArray
                  name='Key[ArrayName]'
                  count={2}
                  unit='шт.'
                  open={open}
                  data-test-id={`${TEST_IDS.array}-${open ? 'open' : 'closed'}`}
                >
                  <AiToolKeyValue label='0' value='alpha' />
                  <AiToolKeyValue label='1' value='beta' />
                </AiToolArray>
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
              <AiToolArray
                name='Key[ArrayName]'
                count={2}
                unit='шт.'
                error={error}
                mono={mono}
                data-test-id={`${TEST_IDS.array}-${error ? 'error' : 'default'}-${mono ? 'mono' : 'label'}`}
              />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
