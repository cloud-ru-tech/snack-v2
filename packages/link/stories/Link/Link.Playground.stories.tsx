import { APPEARANCE, Link, ROLE_APPEARANCE } from '@ds/link';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: { layout: 'fullscreen' },
  args: {
    label: 'Link',
    appearance: APPEARANCE.Primary,
    roleAppearance: ROLE_APPEARANCE.Regular,
    insideText: false,
    underlined: false,
    href: 'https://example.com',
    className: '',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    label: { control: 'text', description: 'Текст ссылки' },
    appearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
      description: 'Цветовая схема',
    },
    roleAppearance: {
      control: 'radio',
      options: Object.values(ROLE_APPEARANCE),
      description: 'Роль применения appearance: regular / onAccent',
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
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Ссылка с appearance, ролью его применения и поведением внутри текста.</DemoHint>
        <DemoActions align='center'>
          <Link {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
