import { InputPrivate, TYPE } from '@ds/input-private';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof InputPrivate> = {
  title: 'Components/InputPrivate',
  component: InputPrivate,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    value: '',
    placeholder: 'Введите значение',
    disabled: false,
    readonly: false,
    type: TYPE.Text,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    type: { control: 'select', options: Object.values(TYPE) },
    disabled: { control: 'boolean' },
    readonly: { control: 'boolean' },
  },
};
export default meta;
type Story = StoryObj<typeof InputPrivate>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Базовый text input без обёрток-полей.</DemoHint>
        <DemoActions align='center'>
          <InputPrivate {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const input = within(canvasElement).getByTestId(TEST_IDS.root);
    await expect(input).toBeVisible();
  },
};
