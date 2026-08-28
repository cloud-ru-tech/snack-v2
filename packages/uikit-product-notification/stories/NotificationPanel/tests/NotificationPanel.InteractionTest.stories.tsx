import { Button } from '@ds/button';
import { NotificationPanel, NotificationPanelProps } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { SAMPLE_CARDS } from '../fixtures';

function InteractionRender(args: NotificationPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Открытие панели триггером, кнопки шапки, меню настроек и chip-фильтр. Закрытие по Escape проверяется в
          Playwright (keyboard.spec.ts).
        </DemoHint>
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
      <NotificationPanel {...args} open={open} onClose={() => setOpen(false)} />
    </DemoPage>
  );
}

const meta: Meta<typeof NotificationPanel> = {
  title: 'Uikit Product/Notification/NotificationPanel/Tests/Interaction',
  component: NotificationPanel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    title: 'Уведомления',
    content: SAMPLE_CARDS,
    readAllButton: { label: 'Прочитать всё', onClick: fn() },
    settings: {
      button: { onClick: fn() },
      actions: [
        { content: { label: 'Настройки' }, onClick: fn() },
        { content: { label: 'Архив' }, onClick: fn() },
      ],
    },
    segments: {
      items: [
        { value: 'all', label: 'Все' },
        { value: 'unread', label: 'Непрочитанные' },
      ],
      value: 'all',
      onChange: fn(),
    },
    chipToggle: { label: 'Только важные', checked: false, onChange: fn() },
  },
  render: args => <InteractionRender {...args} />,
};
export default meta;
type Story = StoryObj<typeof NotificationPanel>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('click: trigger opens the panel', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.drawer.triggerOpen));
      await waitFor(() => expect(body.getByTestId(TEST_IDS.panel.title)).toBeVisible());
    });

    await step('click: readAll button triggers onClick', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.panel.readAll));
      expect(args.readAllButton?.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: settings droplist opens and action triggers onClick', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.panel.settings.droplistTrigger));
      const action = await waitFor(() => body.getByTestId(`${TEST_IDS.panel.settings.droplistAction}-0`));
      await userEvent.click(action);
      expect(args.settings?.actions?.[0]?.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: chipToggle triggers onChange', async () => {
      await userEvent.click(body.getByTestId(TEST_IDS.panel.chipToggle));
      expect(args.chipToggle?.onChange).toHaveBeenCalled();
    });
    // Закрытие по Escape проверяется в Playwright (keyboard.spec.ts): rc-drawer
    // не получает keydown в синтетической среде storybook-test. См. test-environment-pitfalls.md.
  },
};
