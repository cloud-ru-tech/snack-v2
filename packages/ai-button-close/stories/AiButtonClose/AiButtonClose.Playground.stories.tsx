import { AiButtonClose, AiButtonCloseProps, SIZE } from '@ds/ai-button-close';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiButtonClose> = {
  title: 'AI/AiButtonClose',
  component: AiButtonClose,
  parameters: { layout: 'fullscreen' },
  args: {
    size: SIZE.S,
    outline: false,
    disabled: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE) },
    onClick: { table: { disable: true } },
  },
  render: (args: AiButtonCloseProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Наборы Figma: xs только с подложкой, s — с подложкой и без, m — без подложки.</DemoHint>
        <DemoActions align='center'>
          <AiButtonClose {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiButtonClose>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
