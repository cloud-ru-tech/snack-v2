import { AiButtonGigaMama, APPEARANCE } from '@ds/ai-button-giga';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiButtonGigaMama> = {
  title: 'AI/ButtonGiga/Mama',
  component: AiButtonGigaMama,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Создать ресурс',
    appearance: APPEARANCE.Primary,
    loading: false,
    disabled: false,
    'data-test-id': TEST_IDS.mama.root,
  },
  argTypes: {
    innerRef: { table: { disable: true } },
    onClick: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
    appearance: { control: 'radio', options: Object.values(APPEARANCE) },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AiButtonGigaMama</DemoTitle>
        <DemoHint>Внешний вид и состояние задаются свойствами кнопки.</DemoHint>
        <DemoActions align='center'>
          <AiButtonGigaMama {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
export default meta;
type Story = StoryObj<typeof AiButtonGigaMama>;
export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.mama.root)).toBeVisible();
  },
};
