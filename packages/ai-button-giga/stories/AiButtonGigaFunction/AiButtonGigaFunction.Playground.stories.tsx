import { AiButtonGigaFunction, APPEARANCE, SIZE } from '@ds/ai-button-giga';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiButtonGigaFunction> = {
  title: 'AI/ButtonGiga/Function',
  component: AiButtonGigaFunction,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Создать ресурс',
    appearance: APPEARANCE.Primary,
    loading: false,
    disabled: false,
    size: SIZE.S,
    'data-test-id': TEST_IDS.function.root,
  },
  argTypes: {
    innerRef: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
    appearance: { control: 'radio', options: Object.values(APPEARANCE) },
    size: { control: 'radio', options: Object.values(SIZE) },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AiButtonGigaFunction</DemoTitle>
        <DemoHint>Внешний вид и состояние задаются свойствами кнопки.</DemoHint>
        <DemoActions align='center'>
          <AiButtonGigaFunction {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;
type Story = StoryObj<typeof AiButtonGigaFunction>;
export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.function.root)).toBeVisible();
  },
};
