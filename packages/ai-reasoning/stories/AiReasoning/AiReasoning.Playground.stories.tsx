import { AiReasoning, AiReasoningProps } from '@ds/ai-reasoning';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiReasoning> = {
  title: 'AI/AiReasoning',
  component: AiReasoning,
  parameters: {
    layout: 'fullscreen',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/tCbbB5RUGyJeBRtjF3dt4d/AI-COMPONENTS?node-id=7250-14770&m=dev',
    },
  },
  args: {
    description: 'Tool is reasoning about the next action',
    stepperLine: true,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    description: { control: 'text', description: 'Текст reasoning-сообщения' },
    stepperLine: { control: 'boolean', description: 'Показывает вертикальное продолжение степпера' },
    connector: { control: 'boolean', description: 'Явно управляет нижним коннектором' },
  },
};

export default meta;
type Story = StoryObj<typeof AiReasoning>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: (args: AiReasoningProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Строка reasoning для AI-цепочки с вложенным контентом и явным контролем коннектора.</DemoHint>
        <DemoActions align='start'>
          <AiReasoning {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
