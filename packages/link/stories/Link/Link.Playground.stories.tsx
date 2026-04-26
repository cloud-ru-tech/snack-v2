import { APPEARANCE, Link, ROLE } from '@ds/link';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'centered' },
  args: {
    text: 'Link',
    appearance: APPEARANCE.Primary,
    role: ROLE.Regular,
    insideText: false,
    underlined: false,
    href: 'https://example.com',
    className: '',
    'data-test-id': 'link',
  },
  argTypes: {
    text: { control: 'text', description: 'Текст ссылки' },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    role: {
      control: 'radio',
      options: Object.values(ROLE),
      description: 'Роль: regular / onAccent',
    },
    insideText: { control: 'boolean', description: 'Ссылка внутри текста' },
    underlined: { control: 'boolean', description: 'Подчёркивание' },
    truncateVariant: {
      control: 'radio',
      options: ['end', 'middle'],
      description: 'Вариант обрезания строки',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Link>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('link')).toBeVisible();
  },
};
