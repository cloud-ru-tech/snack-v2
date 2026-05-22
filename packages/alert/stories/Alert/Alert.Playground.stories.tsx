import { Alert, ALIGN, APPEARANCE, SIZE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert/Alert',
  component: Alert,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Информационное сообщение с заголовком, описанием и иконкой статуса.</DemoHint>
        <DemoActions block>
          <Alert {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    title: 'Alert title',
    description: 'Alert description text',
    appearance: APPEARANCE.Info,
    size: SIZE.M,
    align: ALIGN.Horizontal,
    icon: true,
    outline: true,
    collapsible: false,
    onClose: fn(),
    'data-test-id': TEST_IDS.alert.root,
  },
  argTypes: {
    title: { control: 'text', description: 'Заголовок' },
    description: { control: 'text', description: 'Описание' },
    appearance: { control: 'select', options: Object.values(APPEARANCE), description: 'Внешний вид' },
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер' },
    align: { control: 'radio', options: Object.values(ALIGN), description: 'Выравнивание контента' },
    icon: { control: 'boolean', description: 'Отображать иконку' },
    outline: { control: 'boolean', description: 'Бордер' },
    collapsible: { control: 'boolean', description: 'Сворачиваемый длинный текст' },
    onClose: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
};
export default meta;

type Story = StoryObj<typeof Alert>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.alert.root)).toBeVisible();
  },
};
