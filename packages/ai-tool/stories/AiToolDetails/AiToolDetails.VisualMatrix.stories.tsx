import { AI_TOOL_DETAILS_STATE, AiToolDetails, AiToolKeyValue, AiToolObject, AiToolText } from '@ds/ai-tool';
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

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
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
  ),
};
