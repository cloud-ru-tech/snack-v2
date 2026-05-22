import { Checkbox, CheckboxProps, SIZE } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<CheckboxProps> = {
  title: 'Components/Toggles/Checkbox',
  component: Checkbox,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<CheckboxProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  args: {
    size: SIZE.XS,
    defaultChecked: false,
    indeterminateDefault: false,
    loading: false,
    disabled: false,
    /** Без ключей в args Storybook не применяет id/name из URL (автотесты / шаринг ссылки). */
    id: undefined,
    name: undefined,
    'data-test-id': TEST_IDS.checkbox.root,
  },
  argTypes: {
    checked: { table: { disable: true } },
    indeterminate: { table: { disable: true } },
    defaultChecked: { control: 'boolean' },
    indeterminateDefault: { control: 'boolean' },
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер',
    },
    'data-test-id': {
      control: 'text',
      description: 'Test ID для автотестов',
      table: { category: 'HTML Attributes' },
    },
    id: {
      control: 'text',
      description: 'HTML id нативного input',
      table: { category: 'HTML Attributes' },
    },
    name: {
      control: 'text',
      description: 'HTML name нативного input',
      table: { category: 'HTML Attributes' },
    },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Чекбокс для выбора одного или нескольких значений.</DemoHint>
        <DemoActions align='center'>
          <Checkbox {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.checkbox.root)).toBeVisible();
  },
};
