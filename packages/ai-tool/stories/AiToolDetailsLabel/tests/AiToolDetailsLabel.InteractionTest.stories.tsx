import { AiToolDetailsLabel, AiToolDetailsLabelProps } from '@ds/ai-tool';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof AiToolDetailsLabel> = {
  title: 'AI/AiTool/Atoms/AiToolDetailsLabel/Tests/Interaction',
  component: AiToolDetailsLabel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    showEyeButton: true,
    onToggleSecret: fn(),
    'data-test-id': TEST_IDS.detailsLabel,
  },
};

export default meta;
type Story = StoryObj<typeof AiToolDetailsLabel>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: function Render(args: AiToolDetailsLabelProps) {
    const [revealed, setRevealed] = useState(false);
    return (
      <DemoPage>
        <DemoPanel width='narrow'>
          <DemoTitle>Interaction</DemoTitle>
          <DemoHint>Проверяет, что нажатие на кнопку-глаз переключает раскрытие секрета.</DemoHint>
          <DemoActions align='start'>
            <AiToolDetailsLabel
              {...args}
              label='Ответ'
              secretRevealed={revealed}
              onToggleSecret={event => {
                setRevealed(prev => !prev);
                args.onToggleSecret?.(event);
              }}
            />
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click secret: onToggleSecret fires', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.detailsLabelSecret));
      expect(args.onToggleSecret).toHaveBeenCalledTimes(1);
    });

    await step('secret button stays reachable after toggle', async () => {
      await expect(canvas.getByTestId(TEST_IDS.detailsLabelSecret)).toBeVisible();
    });
  },
};
