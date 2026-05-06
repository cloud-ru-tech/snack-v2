import { CopyButton } from '@ds/uikit-product-copy';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { COPY_BUTTON_TEST_ID } from './testIds';

const meta: Meta<typeof CopyButton> = {
  title: 'Uikit Product/Copy/CopyButton',
  component: CopyButton,
  parameters: { layout: 'centered' },
  args: {
    valueToCopy: 'example-value',
    size: 's',
    label: '',
    'data-test-id': COPY_BUTTON_TEST_ID,
  },
  argTypes: {
    valueToCopy: { control: 'text', description: 'Значение для копирования' },
    size: { control: 'radio', options: ['s', 'm', 'l'], description: 'Размер кнопки' },
    label: { control: 'text', description: 'Текст рядом с иконкой' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof CopyButton>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(COPY_BUTTON_TEST_ID)).toBeVisible();
  },
};
