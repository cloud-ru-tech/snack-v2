import { AiSuggestionPanel, SIZE, TEST_IDS } from '@ds/ai-suggestion-panel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { QUESTIONS } from './constants';

const meta: Meta<typeof AiSuggestionPanel> = {
  title: 'AI/AiSuggestionPanel',
  component: AiSuggestionPanel,
  parameters: { layout: 'fullscreen' },
  args: {
    items: QUESTIONS,
    size: SIZE.S,
    onItemClick: fn(),
    onClose: fn(),
    onLogoClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    layoutPresets: { table: { disable: true } },
    innerRef: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Вопросы, которые не помещаются по ширине панели, уходят в «+N».</DemoHint>
        <DemoActions align='start'>
          <AiSuggestionPanel {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiSuggestionPanel>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
