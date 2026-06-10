import { AI_QUEUE_STEP_STATE, AiQueue, AiQueueProps } from '@ds/ai-queue';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const baseSteps: NonNullable<AiQueueProps['steps']> = [
  { id: 'step-1', label: 'Шаг 1', state: AI_QUEUE_STEP_STATE.Done },
  { id: 'step-2', label: 'Шаг 2', state: AI_QUEUE_STEP_STATE.Error },
  { id: 'step-3', label: 'Шаг 3', state: AI_QUEUE_STEP_STATE.Done },
  { id: 'step-4', label: 'Шаг 4', state: AI_QUEUE_STEP_STATE.Progress },
  { id: 'step-5', label: 'Шаг 5', state: AI_QUEUE_STEP_STATE.Planned },
];

const meta: Meta<typeof AiQueue> = {
  title: 'AI/AiQueue',
  component: AiQueue,
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/tCbbB5RUGyJeBRtjF3dt4d/AI-COMPONENTS?node-id=7099-4119&m=dev',
    },
  },
  args: {
    open: false,
    steps: baseSteps,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    open: { control: 'boolean', description: 'Контролируемое состояние раскрытия.' },
    defaultOpen: { control: 'boolean', description: 'Начальное раскрытие в uncontrolled-режиме.' },
    summary: { control: 'object', description: 'Принудительные значения счётчиков.' },
    labels: { control: 'object', description: 'Локализация текста в заголовке.' },
    steps: { control: 'object', description: 'Список шагов очереди.' },
    onOpenChange: { table: { disable: true } },
  },
  render: function Render(args: AiQueueProps) {
    const [{ open }, updateArgs] = useArgs<AiQueueProps>();

    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Клик по заголовку раскрывает и сворачивает список шагов.</DemoHint>
          <DemoActions align='start'>
            <AiQueue {...args} open={open} onOpenChange={(nextOpen: boolean) => updateArgs({ open: nextOpen })} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AiQueue>;

export const Playground: Story = {
  args: {
    open: true,
  },

  tags: ['dev', 'test'],

  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
