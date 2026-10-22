import { AiButtonControls, AiButtonControlsProps, DIRECTION } from '@ds/ai-button-controls';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiButtonControls> = {
  title: 'AI/AiButtonControls',
  component: AiButtonControls,
  parameters: { layout: 'fullscreen' },
  args: {
    direction: DIRECTION.Down,
    disabled: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    direction: { control: 'radio', options: Object.values(DIRECTION) },
    onClick: { table: { disable: true } },
  },
  render: (args: AiButtonControlsProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Стрелка сообщает о нажатии; Down — прокрутка ленты, Left/Right — листание ряда вложений.</DemoHint>
        <DemoActions align='center'>
          <AiButtonControls {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiButtonControls>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
