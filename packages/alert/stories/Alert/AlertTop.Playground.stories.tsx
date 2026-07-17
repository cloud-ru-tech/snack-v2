import { AlertTop, AlertTopProps, APPEARANCE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

type AlertTopPlaygroundArgs = AlertTopProps;

const meta: Meta<AlertTopPlaygroundArgs> = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Системное уведомление',
    content: 'Краткое описание изменения, которое касается всех пользователей.',
    appearance: APPEARANCE.Info,
    icon: true,
    onClose: fn(),
    'data-test-id': TEST_IDS.alertTop.root,
  },
  argTypes: {
    title: { control: 'text', description: 'Заголовок' },
    content: { control: 'text', description: 'Описание' },
    appearance: { control: 'select', options: Object.values(APPEARANCE), description: 'Внешний вид' },
    icon: { control: 'boolean', description: 'Отображать иконку' },
    onClose: { table: { disable: true } },
    actions: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Верхнее системное уведомление на всю ширину страницы.</DemoHint>
        <DemoActions block>
          <AlertTop {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<AlertTopPlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.alertTop.root)).toBeVisible();
  },
};
