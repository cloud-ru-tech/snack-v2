import { APPEARANCE, ButtonGroup, SIZE, VIEW } from '@ds/button';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<typeof ButtonGroup> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Группа связанных кнопок-действий с заданным порядком и выравниванием.</DemoHint>
        <DemoActions align='center'>
          <ButtonGroup {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    size: SIZE.M,
    vertical: false,
    centered: false,
    break: false,
    filled: false,
    primaryAction: {
      label: 'Сохранить',
      appearance: APPEARANCE.Primary,
      view: VIEW.Filled,
      'data-test-id': TEST_IDS.buttonGroup.primary,
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: APPEARANCE.Neutral,
      view: VIEW.Outline,
      'data-test-id': TEST_IDS.buttonGroup.secondary,
    },
    'data-test-id': TEST_IDS.buttonGroup.root,
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
    await expect(root.getByTestId(TEST_IDS.buttonGroup.primary)).toBeVisible();
    await expect(root.getByTestId(TEST_IDS.buttonGroup.secondary)).toBeVisible();
  },
};

/** E2E: nested `primaryAction` via URL `args` is unreliable on static iframe loads. */
export const PlaygroundPrimaryDisabled: Story = {
  tags: ['dev', 'test'],
  args: {
    primaryAction: {
      label: 'Сохранить',
      appearance: APPEARANCE.Primary,
      view: VIEW.Filled,
      disabled: true,
      'data-test-id': TEST_IDS.buttonGroup.primary,
    },
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.buttonGroup.primary)).toBeDisabled();
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
      'data-test-id': TEST_IDS.buttonGroup.primary,
    },
    secondaryAction: {
      label: 'Отмена',
      appearance: APPEARANCE.Neutral,
      view: VIEW.Simple,
      'data-test-id': TEST_IDS.buttonGroup.secondary,
    },
  },
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId(TEST_IDS.buttonGroup.primary)).toHaveTextContent('Применить');
    await expect(root.getByTestId(TEST_IDS.buttonGroup.secondary)).toHaveAttribute('data-view', 'simple');
  },
};
