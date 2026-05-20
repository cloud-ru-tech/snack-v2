import { AiSuggestionSimple, AiSuggestionSimpleProps, APPEARANCE, SIZE } from '@ds/ai-suggestion';
import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<AiSuggestionSimpleProps> = {
  title: 'AI/AiSuggestion/AiSuggestionSimple',
  component: AiSuggestionSimple,
  parameters: {
    layout: 'centered',
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/tCbbB5RUGyJeBRtjF3dt4d/AI-COMPONENTS?node-id=6450-3666',
    },
  },
  args: {
    label: 'Label text',
    icon: <PlaceholderSVG />,
    appearance: APPEARANCE.Neutral,
    size: SIZE.S,
    disabled: false,
    onClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    label: { control: 'text', description: 'Текст подсказки' },
    icon: { control: false, description: 'Иконка слева от текста' },
    appearance: {
      control: 'radio',
      options: Object.values(APPEARANCE),
      description: 'Внешний вид (Figma: Primary)',
    },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер (Figma: Mobile Off → s, Mobile On → m)',
    },
    disabled: { control: 'boolean', description: 'Блокирует взаимодействие' },
    onClick: { action: 'click', description: 'Выбор подсказки' },
  },
};

export default meta;
type Story = StoryObj<AiSuggestionSimpleProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Pill-чип AI-подсказки с иконкой и коротким текстом.</DemoHint>
        <DemoActions align='center'>
          <AiSuggestionSimple {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
