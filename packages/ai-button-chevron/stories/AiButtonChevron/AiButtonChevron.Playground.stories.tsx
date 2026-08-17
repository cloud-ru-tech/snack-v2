import { AiButtonChevron, AiButtonChevronProps } from '@ds/ai-button-chevron';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiButtonChevron> = {
  title: 'AI/ButtonChevron',
  component: AiButtonChevron,
  parameters: { layout: 'fullscreen' },
  args: {
    open: false,
    disabled: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    onClick: { table: { disable: true } },
  },
  render: function Render(args: AiButtonChevronProps) {
    const [{ open }, updateArgs] = useArgs<AiButtonChevronProps>();
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Playground</DemoTitle>
          <DemoHint>Кнопка-шеврон для раскрытия / сворачивания — клик переключает направление.</DemoHint>
          <DemoActions align='center'>
            <AiButtonChevron {...args} open={open} onClick={() => updateArgs({ open: !open })} />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<typeof AiButtonChevron>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
