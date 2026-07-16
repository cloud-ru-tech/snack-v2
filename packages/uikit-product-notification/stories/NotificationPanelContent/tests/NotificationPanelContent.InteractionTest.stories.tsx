import { NotificationPanelContent } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { SAMPLE_CARDS } from '../fixtures';

const meta: Meta<typeof NotificationPanelContent> = {
  title: 'Uikit Product/Notification/NotificationPanelContent/Tests/Interaction',
  component: NotificationPanelContent,
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
    'data-test-id': TEST_IDS.panel.root,
  },
};
export default meta;
type Story = StoryObj<typeof NotificationPanelContent>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Кнопки шапки/футера, меню настроек и chip-фильтр.</DemoHint>
        <DemoActions align='center'>
          <NotificationPanelContent {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);

    await step('click: readAll button triggers onClick', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.panel.readAll));
      expect(args.readAllButton?.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: settings droplist opens and action triggers onClick', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.panel.settings.droplistTrigger));
      const action = await waitFor(() => body.getByTestId(`${TEST_IDS.panel.settings.droplistAction}-0`));
      await userEvent.click(action);
      expect(args.settings?.actions?.[0]?.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: chipToggle triggers onChange', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.panel.chipToggle));
      expect(args.chipToggle?.onChange).toHaveBeenCalled();
    });
  },
};
