import { AiToolArray, AiToolArrayProps, AiToolKeyValue } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof AiToolArray> = {
  title: 'AI/AiToolElements/Content/AiToolArray/Tests/Interaction',
  component: AiToolArray,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    name: 'Key[ArrayName]',
    count: 1,
    unit: 'шт.',
    'data-test-id': TEST_IDS.array,
  },
};

export default meta;
type Story = StoryObj<typeof AiToolArray>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function Render(args: AiToolArrayProps) {
    const [opened, setOpened] = useState(false);
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Interaction</DemoTitle>
          <DemoHint>Проверяет, что нажатие на шеврон раскрывает и снова сворачивает список.</DemoHint>
          <DemoActions block>
            <AiToolArray {...args} opened={opened} onToggle={setOpened}>
              <AiToolKeyValue label='0' value='alpha' data-test-id='ai-tool-array-child' />
            </AiToolArray>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('closed: items are absent', async () => {
      expect(canvas.queryByTestId('ai-tool-array-child')).toBeNull();
    });

    await step('click chevron: items appear', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.arrayToggle));
      await expect(canvas.getByTestId('ai-tool-array-child')).toBeVisible();
    });

    await step('click chevron again: items collapse', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.arrayToggle));
      expect(canvas.queryByTestId('ai-tool-array-child')).toBeNull();
    });
  },
};
