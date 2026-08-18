import { AI_TOOL_OBJECT_TYPE, AiToolKeyValue, AiToolObject, AiToolObjectProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolObject> = {
  title: 'AI/AiTool/Content/AiToolObject',
  component: AiToolObject,
  parameters: { layout: 'fullscreen' },
  args: {
    name: 'Key[ObjectName]',
    variant: AI_TOOL_OBJECT_TYPE.Complex,
    opened: true,
    'data-test-id': TEST_IDS.object,
  },
  argTypes: {
    onToggle: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render(args: AiToolObjectProps) {
    const [{ opened }, updateArgs] = useArgs<AiToolObjectProps>();
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>
            Узел дерева аргументов. Тип complex сворачивается по шеврону и содержит вложенные узлы, string показывает
            значение сразу рядом с ключом.
          </DemoHint>
          <DemoActions block>
            <AiToolObject {...args} opened={opened} onToggle={next => updateArgs({ opened: next })}>
              <AiToolKeyValue label='region' value='ru-central1' />
              <AiToolKeyValue label='status' value='ok' />
            </AiToolObject>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AiToolObject>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.object)).toBeVisible();
  },
};
