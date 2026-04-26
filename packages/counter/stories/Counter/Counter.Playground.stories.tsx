import { APPEARANCE, COLOR, Counter, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from '@ds/counter'
import { Meta, StoryObj } from '@storybook/react'
import { expect, within } from 'storybook/test'

const meta: Meta<typeof Counter> = {
  title: 'Components/Counter',
  component: Counter,
  parameters: { layout: 'centered' },
  args: {
    value: 9,
    appearance: APPEARANCE.Primary,
    size: SIZE.S,
    variant: VARIANT.Count,
    plusLimit: DEFAULT_PLUS_LIMIT,
    color: COLOR.Accent,
  },
  argTypes: {
    value: { control: 'number', description: 'Числовое значение' },
    appearance: {
      control: 'radio',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    size: { control: 'radio', options: Object.values(SIZE), description: 'Размер' },
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант форматирования',
    },
    plusLimit: { control: 'number', description: 'Порог для варианта `count-plus`' },
    color: {
      control: 'radio',
      options: Object.values(COLOR),
      description: 'Семантический цвет',
    },
  },
}

export default meta
type Story = StoryObj<typeof Counter>

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByText('9')).toBeVisible()
  },
}
