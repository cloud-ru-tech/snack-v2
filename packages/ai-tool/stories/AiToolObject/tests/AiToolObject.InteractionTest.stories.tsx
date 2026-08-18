import { AiToolKeyValue, AiToolObject, AiToolObjectProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof AiToolObject> = {
  title: 'AI/AiTool/Content/AiToolObject/Tests/Interaction',
  component: AiToolObject,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    name: 'Key[ObjectName]',
    'data-test-id': TEST_IDS.object,
  },
};

export default meta;
type Story = StoryObj<typeof AiToolObject>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function Render(args: AiToolObjectProps) {
    const [opened, setOpened] = useState(false);
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Interaction</DemoTitle>
          <DemoHint>Проверяет, что нажатие на шеврон раскрывает и снова сворачивает вложенное дерево.</DemoHint>
          <DemoActions block>
            <AiToolObject {...args} opened={opened} onToggle={setOpened}>
              <AiToolKeyValue label='region' value='ru-central1' data-test-id='ai-tool-object-child' />
            </AiToolObject>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('closed: nested content is absent', async () => {
      expect(canvas.queryByTestId('ai-tool-object-child')).toBeNull();
    });

    await step('click chevron: nested content appears', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.objectToggle));
      await expect(canvas.getByTestId('ai-tool-object-child')).toBeVisible();
    });

    await step('click chevron again: nested content collapses', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.objectToggle));
      expect(canvas.queryByTestId('ai-tool-object-child')).toBeNull();
    });
  },
};
