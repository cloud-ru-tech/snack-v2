import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip/Tests/Interaction',
  component: Tooltip,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const InteractionTest: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>{'Открытие/закрытие Tooltip по клику, Tab и Escape.'}</DemoHint>
        <DemoActions align='center'>
          <Tooltip tip='Подсказка раскрылась' trigger={TRIGGER.Click} data-test-id={TEST_IDS.tooltip.content}>
            <Button
              data-test-id={TEST_IDS.tooltip.triggerOpen}
              label='Открыть'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
            />
          </Tooltip>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const trigger = canvas.getByTestId(TEST_IDS.tooltip.triggerOpen);

    await step('click: opens tooltip content', async () => {
      await userEvent.click(trigger);
      await waitFor(() => {
        expect(within(document.body).getByTestId(TEST_IDS.tooltip.content)).toBeVisible();
      });
    });

    await step('keyboard: Escape closes tooltip', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => {
        const content = within(document.body).queryByTestId(TEST_IDS.tooltip.content);
        expect(content).toBeNull();
      });
    });

    await step('keyboard: Tab focuses trigger', async () => {
      trigger.blur();
      await userEvent.tab();
      await expect(trigger).toHaveFocus();
    });
  },
};
