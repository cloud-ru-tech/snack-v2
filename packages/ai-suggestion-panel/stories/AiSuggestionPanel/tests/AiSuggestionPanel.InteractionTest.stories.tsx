import { AiSuggestionPanel, AiSuggestionPanelItem, TEST_IDS } from '@ds/ai-suggestion-panel';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { QUESTIONS } from '../constants';
import styles from '../styles.module.scss';

const [first, second, third, ...rest] = QUESTIONS;

const ITEMS: AiSuggestionPanelItem[] = [first, { ...second, disabled: true }, { ...third, loading: true }, ...rest];

const meta: Meta<typeof AiSuggestionPanel> = {
  title: 'AI/AiSuggestionPanel/Tests/Interaction',
  component: AiSuggestionPanel,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    items: ITEMS,
    onItemClick: fn(),
    onClose: fn(),
    onLogoClick: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiSuggestionPanel>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>
          Нажатие на вопрос сообщает его value; disabled и loading не реагируют; «+N» открывает список скрытых вопросов
          и закрывает его после выбора.
        </DemoHint>
        <DemoActions align='start'>
          <div className={styles.wide}>
            <AiSuggestionPanel {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(canvasElement.ownerDocument.body);
    const getItem = (value: string) => {
      const item = canvas.getAllByTestId(TEST_IDS.item).find(node => node.getAttribute('data-value') === value);

      if (!item) throw new Error(`Сегмент вопроса ${value} не найден`);

      return item;
    };

    await step('click: вопрос сообщает свой value', async () => {
      await userEvent.click(getItem(first.value));
      await expect(args.onItemClick).toHaveBeenCalledWith(first.value);
    });

    await step('click: disabled и loading не вызывают onItemClick', async () => {
      await expect(getItem(second.value)).toBeDisabled();
      await userEvent.click(getItem(third.value));
      await expect(args.onItemClick).toHaveBeenCalledTimes(1);
    });

    await step('click: «+N» открывает список, выбор закрывает его', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.more));
      const [hiddenItem] = await body.findAllByTestId(TEST_IDS.moreListItem);

      await userEvent.click(hiddenItem);
      await expect(args.onItemClick).toHaveBeenCalledTimes(2);
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.moreList)).not.toBeInTheDocument());
    });

    await step('click: кнопка Giga и крестик вызывают свои колбэки', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.logo));
      await expect(args.onLogoClick).toHaveBeenCalledTimes(1);
      await userEvent.click(canvas.getByTestId(TEST_IDS.close));
      await expect(args.onClose).toHaveBeenCalledTimes(1);
    });

    await step('keyboard: Enter на вопросе в фокусе сообщает value', async () => {
      getItem(first.value).focus();
      await userEvent.keyboard('{Enter}');
      await expect(args.onItemClick).toHaveBeenLastCalledWith(first.value);
    });
  },
};
