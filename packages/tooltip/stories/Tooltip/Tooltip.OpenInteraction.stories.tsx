import { Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const OpenInteraction: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Tooltip tip='Подсказка раскрылась' trigger={TRIGGER.Click}>
      <button type='button'>Открыть</button>
    </Tooltip>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    await step('Click trigger', async () => {
      await userEvent.click(canvas.getByRole('button'));
    });
    await step('Tooltip becomes visible', async () => {
      await waitFor(() => {
        expect(within(document.body).getByRole('tooltip')).toBeVisible();
      });
    });
  },
};
