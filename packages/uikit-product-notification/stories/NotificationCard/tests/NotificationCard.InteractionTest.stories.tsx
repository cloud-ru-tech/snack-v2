import { NotificationCard } from '@ds/uikit-product-notification';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof NotificationCard> = {
  title: 'Uikit Product/Notification/NotificationCard/Tests/Interaction',
  component: NotificationCard,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    id: 'card-it',
    title: 'Резервная копия завершена',
    content: 'Бэкап загружен',
    date: 'сегодня · 14:32',
    onClick: fn(),
    primaryButton: { label: 'Открыть', onClick: fn() },
    secondaryButton: { label: 'Скрыть', onClick: fn() },
    link: { text: 'Подробнее', href: '#', onClick: fn() },
    actions: [
      { content: { option: 'Прочитано' }, onClick: fn() },
      { content: { option: 'Удалить' }, onClick: fn() },
    ],
    'data-test-id': TEST_IDS.card.root,
  },
};

export default meta;
type Story = StoryObj<typeof NotificationCard>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по карточке/кнопкам/ссылке/действию и клавиатура (Enter/Space).</DemoHint>
        <DemoActions align='center'>
          <NotificationCard {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const root = canvas.getByTestId(TEST_IDS.card.root);

    await step('click: card triggers onClick', async () => {
      await userEvent.click(root);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: primary button does not bubble to card', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.card.primaryButton));
      expect(args.primaryButton?.onClick).toHaveBeenCalledTimes(1);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: secondary button does not bubble to card', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.card.secondaryButton));
      expect(args.secondaryButton?.onClick).toHaveBeenCalledTimes(1);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: link triggers onClick and does not bubble', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.card.link));
      expect(args.link?.onClick).toHaveBeenCalledTimes(1);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('click: actions droplist opens and action triggers onClick', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.card.actions.droplistTrigger));
      const action = await waitFor(() => body.getByTestId(`${TEST_IDS.card.actions.droplistAction}-0`));
      await userEvent.click(action);
      expect(args.actions?.[0]?.onClick).toHaveBeenCalledTimes(1);
      expect(args.onClick).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Enter on focused card triggers onClick', async () => {
      root.focus();
      await userEvent.keyboard('{Enter}');
      expect(args.onClick).toHaveBeenCalledTimes(2);
    });

    await step('keyboard: Space on focused card triggers onClick', async () => {
      root.focus();
      await userEvent.keyboard(' ');
      expect(args.onClick).toHaveBeenCalledTimes(3);
    });

    await step('keyboard: Enter on focused nested button does not trigger card onClick', async () => {
      canvas.getByTestId(TEST_IDS.card.primaryButton).focus();
      await userEvent.keyboard('{Enter}');
      // Вложенная кнопка активируется (2-й раз), карточка — нет (остаётся 3).
      expect(args.primaryButton?.onClick).toHaveBeenCalledTimes(2);
      expect(args.onClick).toHaveBeenCalledTimes(3);
    });
  },
};
