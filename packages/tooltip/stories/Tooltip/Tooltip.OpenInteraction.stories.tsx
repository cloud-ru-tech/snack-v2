import { Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { TOOLTIP_CONTENT_TEST_ID, TOOLTIP_TRIGGER_TEST_ID } from './testIds';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const OpenInteraction: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Tooltip tip='Подсказка раскрылась' trigger={TRIGGER.Click} data-test-id={TOOLTIP_CONTENT_TEST_ID}>
      <button type='button' data-test-id={TOOLTIP_TRIGGER_TEST_ID}>
        Открыть
      </button>
    </Tooltip>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click trigger', async () => {
      await userEvent.click(canvas.getByTestId(TOOLTIP_TRIGGER_TEST_ID));
    });
    await step('Tooltip becomes visible', async () => {
      await waitFor(() => {
        expect(within(document.body).getByTestId(TOOLTIP_CONTENT_TEST_ID)).toBeVisible();
      });
    });
  },
};
