import { AiToolArray, AiToolArrayProps, AiToolKeyValue, AiToolObject } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiToolArray> = {
  title: 'AI/AiToolElements/Content/AiToolArray',
  component: AiToolArray,
  parameters: { layout: 'fullscreen' },
  args: {
    name: 'Key[ArrayName]',
    count: 2,
    unit: 'шт.',
    opened: true,
    'data-test-id': TEST_IDS.array,
  },
  argTypes: {
    onToggle: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  render: function Render(args: AiToolArrayProps) {
    const [{ opened }, updateArgs] = useArgs<AiToolArrayProps>();
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>
            Список однотипных элементов со счётчиком. Шеврон раскрывает и сворачивает содержимое. В элементы можно
            вкладывать любой контент — здесь массив сложных объектов с парами «ключ — значение».
          </DemoHint>
          <DemoActions block>
            <AiToolArray {...args} opened={opened} onToggle={next => updateArgs({ opened: next })}>
              <AiToolObject name='Key[0]' opened>
                <AiToolKeyValue label='region' value='ru-central1' />
                <AiToolKeyValue label='status' value='ok' />
              </AiToolObject>
              <AiToolObject name='Key[1]' opened>
                <AiToolKeyValue label='region' value='ru-central1-a' />
                <AiToolKeyValue label='status' value='pending' />
              </AiToolObject>
            </AiToolArray>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AiToolArray>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.array)).toBeVisible();
  },
};
