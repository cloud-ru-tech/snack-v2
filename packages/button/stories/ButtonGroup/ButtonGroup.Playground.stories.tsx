import { APPEARANCE, ButtonGroup, SIZE, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/ButtonGroup',
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
      'data-test-id': 'button-group-primary',
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: 'neutral',
      view: 'outline',
      'data-test-id': 'button-group-secondary',
    },
    'data-test-id': 'button-group',
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
    await expect(within(canvasElement).getAllByRole('button')).toHaveLength(2);
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
      'data-test-id': 'button-group-primary',
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('button-group-primary')).toBeDisabled();
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
      'data-test-id': 'button-group-primary',
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: APPEARANCE.Neutral,
      view: VIEW.Simple,
      'data-test-id': 'button-group-secondary',
    },
  },
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId('button-group-primary')).toHaveTextContent('Применить');
    await expect(root.getByTestId('button-group-secondary')).toHaveAttribute('data-view', 'simple');
  },
};
