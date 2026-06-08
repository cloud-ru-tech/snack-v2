import { AiToolText } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolText> = {
  title: 'AI/AiToolElements/Content/AiToolText',
  component: AiToolText,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiToolText>;

const monoStates = [false, true] as const;
const errorStates = [false, true] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Error × Mono'
      firstColumnHeader='Error'
      columnHeaders={monoStates.map(m => (m ? 'MONO' : 'LABEL'))}
      rows={errorStates.map(error => ({
        variantLabel: error ? 'error' : 'default',
        cells: monoStates.map(mono => (
          <AiToolText
            key={`${error}-${mono}`}
            error={error}
            mono={mono}
            data-test-id={`${TEST_IDS.text}-${error ? 'error' : 'default'}-${mono ? 'mono' : 'label'}`}
          >
            TextBlock Text
          </AiToolText>
        )),
      }))}
    />
  ),
};
