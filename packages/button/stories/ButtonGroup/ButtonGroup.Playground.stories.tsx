import { APPEARANCE, ButtonGroup, SIZE, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { BUTTON_GROUP_PRIMARY_TEST_ID, BUTTON_GROUP_SECONDARY_TEST_ID, BUTTON_GROUP_TEST_ID } from './testIds';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  args: {
    size: SIZE.M,
    vertical: false,
    centered: false,
    break: false,
    filled: false,
    primaryAction: {
      label: 'Сохранить',
      appearance: 'primary',
      view: 'filled',
      'data-test-id': BUTTON_GROUP_PRIMARY_TEST_ID,
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: 'neutral',
      view: 'outline',
      'data-test-id': BUTTON_GROUP_SECONDARY_TEST_ID,
    },
    'data-test-id': BUTTON_GROUP_TEST_ID,
  },
  argTypes: {
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер всех кнопок группы' },
    vertical: { control: 'boolean', description: 'Вертикальное расположение' },
    centered: { control: 'boolean', description: 'Центрирование по горизонтали' },
    break: { control: 'boolean', description: 'Перенос на новую строку при нехватке места' },
    filled: { control: 'boolean', description: 'Заливка контейнера (кнопки тянутся)' },
    primaryAction: { control: 'object', description: 'Основное действие' },
    secondaryAction: { control: 'object', description: 'Вторичное действие' },
    tertiaryAction: { control: 'object', description: 'Третичное действие' },
  },
};

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toBeVisible();
    await expect(root.getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toBeVisible();
  },
};

/** E2E: nested `primaryAction` via URL `args` is unreliable on static iframe loads. */
export const PlaygroundPrimaryDisabled: Story = {
  tags: ['dev', 'test'],
  args: {
    primaryAction: {
      label: 'Сохранить',
      appearance: 'primary',
      view: 'filled',
      disabled: true,
      'data-test-id': BUTTON_GROUP_PRIMARY_TEST_ID,
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toBeDisabled();
  },
};

/** E2E: same assertions as former URL-only nested `primaryAction` / `secondaryAction` overrides. */
export const PlaygroundCriticalPrimary: Story = {
  tags: ['dev', 'test'],
  args: {
    primaryAction: {
      label: 'Применить',
      appearance: APPEARANCE.Critical,
      view: VIEW.Filled,
      'data-test-id': BUTTON_GROUP_PRIMARY_TEST_ID,
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: APPEARANCE.Neutral,
      view: VIEW.Simple,
      'data-test-id': BUTTON_GROUP_SECONDARY_TEST_ID,
    },
  },
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId(BUTTON_GROUP_PRIMARY_TEST_ID)).toHaveTextContent('Применить');
    await expect(root.getByTestId(BUTTON_GROUP_SECONDARY_TEST_ID)).toHaveAttribute('data-view', 'simple');
  },
};
