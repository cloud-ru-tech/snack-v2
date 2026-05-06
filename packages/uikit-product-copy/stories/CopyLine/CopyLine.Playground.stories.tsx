import { COPY_BUTTON_HIDE_STRATEGY, CopyLine } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { COPY_LINE_TEST_ID } from './testIds';

const meta: Meta<typeof CopyLine> = {
  title: 'Uikit Product/Copy/CopyLine',
  component: CopyLine,
  parameters: { layout: 'centered' },
  args: {
    content: 'example-copy-value-12345',
    valueToCopy: 'example-value',
    copyButtonHideStrategy: COPY_BUTTON_HIDE_STRATEGY.Hover,
    'data-test-id': COPY_LINE_TEST_ID,
  },
  argTypes: {
    content: { control: 'text', description: 'Отображаемое содержимое' },
    valueToCopy: { control: 'text', description: 'Значение для копирования (по-умолчанию = content)' },
    copyButtonHideStrategy: {
      control: 'radio',
      options: Object.values(COPY_BUTTON_HIDE_STRATEGY),
      description: 'Стратегия показа кнопки копирования',
    },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CopyLine>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(COPY_LINE_TEST_ID)).toBeVisible();
  },
};
