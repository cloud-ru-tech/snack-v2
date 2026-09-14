import { AiFieldRequest, AiFieldRequestProps, APPEARANCE } from '@ds/ai-field-request';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const LONG_CONTENT =
  'Виртуальная машина будет остановлена и удалена вместе с дисками. Дополнительное описание действия занимает несколько строк и используется для проверки раскрытия длинного текста в свёрнутом и развёрнутом состояниях. Ещё один абзац с нейтральным содержимым без привязки к предметной области. Третий абзац нужен, чтобы содержимое переполняло предел по высоте и на широком экране: тогда кнопка «Показать» появляется в любой ширине карточки, а не только в узкой.';

const meta: Meta<typeof AiFieldRequest> = {
  title: 'Ai/AiFieldRequest',
  component: AiFieldRequest,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Удалить виртуальную машину?',
    content: LONG_CONTENT,
    hint: 'Подсказка под панелью',
    appearance: APPEARANCE.Primary,
    maxHeight: 88,
    primaryAction: { label: 'Подтвердить', onClick: fn() },
    secondaryAction: { label: 'Отмена', onClick: fn() },
    onOpenChange: fn(),
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    title: { control: 'text' },
    content: { control: 'text' },
    hint: { control: 'text' },
    primaryAction: { control: 'object' },
    secondaryAction: { control: 'object' },
    appearance: {
      control: 'inline-radio',
      options: Object.values(APPEARANCE),
    },
    maxHeight: {
      control: { type: 'number', min: 44, step: 22 },
    },
    open: { table: { disable: true } },
    onOpenChange: { table: { disable: true } },
  },
  render: (args: AiFieldRequestProps) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Панель Field Request: заголовок, контент, раскрытие и кнопки действий.</DemoHint>
        <DemoActions align='start'>
          <AiFieldRequest {...args} className={styles.root} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof AiFieldRequest>;

export const Playground: Story = {
  tags: ['dev', 'test'],

  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.title)).toHaveTextContent('Удалить виртуальную машину?');
    await userEvent.click(await canvas.findByTestId(TEST_IDS.expand));
    await expect(canvas.getByTestId(TEST_IDS.root)).toHaveAttribute('data-open', 'true');
    expect(args.onOpenChange).toHaveBeenCalledTimes(1);
    expect(args.onOpenChange).toHaveBeenLastCalledWith(true);
    await userEvent.click(canvas.getByTestId(TEST_IDS.primaryAction));
    expect(args.primaryAction.onClick).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByTestId(TEST_IDS.secondaryAction));
    expect(args.secondaryAction.onClick).toHaveBeenCalledTimes(1);
  },
};
