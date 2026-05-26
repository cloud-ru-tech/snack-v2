import { APPEARANCE, Avatar, SHAPE, SIZE } from '@ds/avatar';
import { APPEARANCE as STATUS_APPEARANCE } from '@ds/status';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'fullscreen' },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Аватар пользователя: инициалы или картинка, варианты по size, shape и appearance.</DemoHint>
        <DemoActions align='center'>
          <Avatar {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  args: {
    name: 'John Doe',
    size: SIZE.S,
    shape: SHAPE.Rounded,
    appearance: APPEARANCE.Neutral,
    showTwoSymbols: false,
    className: '',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    name: { control: 'text', description: 'Имя для аббревиатуры' },
    src: { control: 'text', description: 'URL изображения' },
    size: { control: 'select', options: Object.values(SIZE), description: 'Размер' },
    shape: { control: 'radio', options: Object.values(SHAPE), description: 'Форма' },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    showTwoSymbols: { control: 'boolean', description: 'Показать две заглавные буквы' },
    status: {
      control: 'select',
      options: [undefined, ...Object.values(STATUS_APPEARANCE)],
      description: 'Appearance дефолтного StatusIndicator в правом-нижнем углу',
    },
    badge: { table: { disable: true } },
    className: { table: { disable: true } },
    'data-test-id': { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
