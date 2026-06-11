import { Button } from '@ds/button';
import { NotificationPanel, NotificationPanelPopover } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SAMPLE_CARDS } from '../../NotificationPanel/fixtures';
import { TEST_IDS } from '../../testIds';

function InteractionRender() {
  const [open, setOpen] = useState(false);
  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Открытие drawer триггером; закрытие по Escape проверяется в Playwright (keyboard.spec.ts).</DemoHint>
        <DemoActions align='center'>
          <Button
            data-test-id={TEST_IDS.drawer.triggerOpen}
            label='Open'
            view='outline'
            appearance='neutral'
            onClick={() => setOpen(true)}
          />
        </DemoActions>
      </DemoPanel>
      <NotificationPanelPopover
        open={open}
        onClose={() => setOpen(false)}
        content={<NotificationPanel title='Уведомления' content={SAMPLE_CARDS} data-test-id={TEST_IDS.panel.root} />}
      />
    </DemoPage>
  );
}

const meta: Meta<typeof NotificationPanelPopover> = {
  title: 'Uikit Product/Notification/NotificationPanelPopover/Tests/Interaction',
  component: NotificationPanelPopover,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  render: () => <InteractionRender />,
};
export default meta;
type Story = StoryObj<typeof NotificationPanelPopover>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('click: trigger opens drawer', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.drawer.triggerOpen));
      await waitFor(() => expect(body.getByTestId(TEST_IDS.panel.title)).toBeVisible());
    });
    // Закрытие по Escape проверяется в Playwright (keyboard.spec.ts): rc-drawer
    // не получает keydown в синтетической среде storybook-test, хотя в реальном
    // браузере Escape закрывает drawer. См. test-environment-pitfalls.md.
  },
};
