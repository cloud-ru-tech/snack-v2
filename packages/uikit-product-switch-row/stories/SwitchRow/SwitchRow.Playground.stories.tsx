import { SWITCH_ROW_TYPES, SwitchRow } from '@ds/uikit-product-switch-row';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof SwitchRow> = {
  title: 'Uikit Product/SwitchRow',
  component: SwitchRow,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Включить уведомления',
    description: 'Раз в сутки будет приходить дайджест событий',
    defaultChecked: false,
    disabled: false,
    loading: false,
    disableTitleTruncate: false,
    type: SWITCH_ROW_TYPES.Block,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    title: { control: 'text', description: 'Заголовок' },
    description: { control: 'text', description: 'Описание под заголовком' },
    disabled: { control: 'boolean', description: 'Отключено' },
    loading: { control: 'boolean', description: 'Состояние загрузки' },
    disableTitleTruncate: { control: 'boolean', description: 'Отключить truncation заголовка' },
    type: {
      control: 'radio',
      options: Object.values(SWITCH_ROW_TYPES),
      description: 'Вариант лейаута: block (карточка) / line (inline)',
    },
    tip: { control: 'text', description: 'Подсказка рядом с заголовком' },
    disabledToggleTip: { control: 'text', description: 'Тултип поверх Switch в disabled-состоянии' },
    name: { control: 'text', description: 'name для нативного input' },
    checked: { table: { disable: true } },
    defaultChecked: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof SwitchRow>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Строка-переключатель с заголовком, описанием и Switch справа.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.fullWidth}>
            <SwitchRow {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
