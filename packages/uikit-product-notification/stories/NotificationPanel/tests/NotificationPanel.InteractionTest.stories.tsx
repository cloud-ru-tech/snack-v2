import { Button } from '@ds/button';
import { segmentTestId } from '@ds/segment-control';
import { NotificationPanel, NotificationPanelProps } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import { SAMPLE_CARDS } from '../fixtures';

const SEGMENT = {
  all: 'all',
  unread: 'unread',
  system: 'system',
} as const;

function InteractionRender(args: NotificationPanelProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Открытие панели триггером, кнопки шапки, меню настроек, сегменты и chip-фильтр. Кнопка «Загрузка» внутри
          панели включает loading: сегменты остаются доступными, скелетоны, readAll и chip блокируются. Закрытие по
          Escape проверяется в Playwright (keyboard.spec.ts).
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
      <NotificationPanel
        {...args}
        open={open}
        onClose={() => setOpen(false)}
        loading={loading}
        content={
          <>
            <Button
              data-test-id={TEST_IDS.drawer.triggerLoading}
              label='Загрузка'
              view='outline'
              appearance='neutral'
              onClick={() => setLoading(true)}
            />
            {args.content}
          </>
        }
      />
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
        { value: SEGMENT.all, label: 'Все' },
        { value: SEGMENT.unread, label: 'Непрочитанные' },
        { value: SEGMENT.system, label: 'Системные', disabled: true },
      ],
      value: SEGMENT.all,
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

    const onSegmentChange = args.segments?.onChange as ReturnType<typeof fn>;
    const onReadAllClick = args.readAllButton?.onClick as ReturnType<typeof fn>;
    const onChipChange = args.chipToggle?.onChange as ReturnType<typeof fn>;
    const selected = body.getByTestId(segmentTestId(SEGMENT.all));
    const unread = body.getByTestId(segmentTestId(SEGMENT.unread));
    const disabledSegment = body.getByTestId(segmentTestId(SEGMENT.system));

    await step('click: enabled segment triggers onChange', async () => {
      await expect(selected).toHaveAttribute('aria-checked', 'true');
      await expect(selected).not.toBeDisabled();
      await expect(selected).not.toHaveAttribute('data-disabled');
      await userEvent.click(unread);
      expect(onSegmentChange).toHaveBeenCalledTimes(1);
      expect(onSegmentChange).toHaveBeenCalledWith(SEGMENT.unread);
    });

    await step('disabled segment stays unavailable', async () => {
      await expect(disabledSegment).toBeDisabled();
      await expect(disabledSegment).toHaveAttribute('data-disabled', 'true');
      await userEvent.click(disabledSegment, { pointerEventsCheck: 0 });
      expect(onSegmentChange).not.toHaveBeenCalledWith(SEGMENT.system);
      expect(onSegmentChange).toHaveBeenCalledTimes(1);
    });

    await step('loading: segments stay enabled, skeletons and filters stay blocked', async () => {
      const readAllCalls = onReadAllClick.mock.calls.length;
      const chipCalls = onChipChange.mock.calls.length;

      await userEvent.click(body.getByTestId(TEST_IDS.drawer.triggerLoading));

      const skeletons = await waitFor(() => body.getAllByTestId(TEST_IDS.card.skeleton));
      expect(skeletons).toHaveLength(2);
      const panelBody = skeletons[0]?.parentElement;
      if (!panelBody) {
        throw new Error('Тело панели не найдено');
      }
      expect(panelBody).toHaveAttribute('aria-busy', 'true');

      await expect(selected).toHaveAttribute('aria-checked', 'true');
      await expect(selected).not.toBeDisabled();
      await expect(selected).not.toHaveAttribute('data-disabled');
      await expect(unread).not.toBeDisabled();
      await expect(unread).not.toHaveAttribute('data-disabled');
      await userEvent.click(unread);
      expect(onSegmentChange).toHaveBeenCalledTimes(2);
      expect(onSegmentChange).toHaveBeenLastCalledWith(SEGMENT.unread);

      await expect(disabledSegment).toBeDisabled();
      await expect(disabledSegment).toHaveAttribute('data-disabled', 'true');
      await userEvent.click(disabledSegment, { pointerEventsCheck: 0 });
      expect(onSegmentChange).not.toHaveBeenCalledWith(SEGMENT.system);

      const readAll = body.getByTestId(TEST_IDS.panel.readAll);
      await expect(readAll).toBeDisabled();
      await userEvent.click(readAll, { pointerEventsCheck: 0 });
      expect(onReadAllClick).toHaveBeenCalledTimes(readAllCalls);

      const chip = body.getByTestId(TEST_IDS.panel.chipToggle);
      await expect(chip).toHaveAttribute('data-disabled', 'true');
      await userEvent.click(chip, { pointerEventsCheck: 0 });
      expect(onChipChange).toHaveBeenCalledTimes(chipCalls);
    });
    // Закрытие по Escape проверяется в Playwright (keyboard.spec.ts): rc-drawer
    // не получает keydown в синтетической среде storybook-test. См. test-environment-pitfalls.md.
  },
};
