import { Slider } from '@ds/slider';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  parameters: { layout: 'fullscreen' },
  args: {
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 40,
    handleTip: false,
    marksEqualSpacing: false,
    disabled: false,
    reverse: false,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    min: { control: 'number', description: 'Минимальное значение' },
    max: { control: 'number', description: 'Максимальное значение' },
    step: { control: 'number', description: 'Шаг' },
    handleTip: { control: 'boolean', description: 'Показывать tooltip со значением на ручке' },
    marksEqualSpacing: {
      control: 'boolean',
      description: 'Равномерное распределение меток при нелинейных значениях',
    },
    disabled: { control: 'boolean', description: 'Отключён' },
    reverse: { control: 'boolean', description: 'Перевёрнутое направление' },
    value: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Slider>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Ползунок для выбора значения из диапазона.</DemoHint>
        <DemoActions block>
          <div className={styles.item}>
            <Slider {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
