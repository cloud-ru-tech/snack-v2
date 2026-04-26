import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect } from 'storybook/test';

import styles from './stories.module.scss';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: { layout: 'centered' },
  args: {
    variant: VARIANT.End,
    text: 'Очень длинный текст, который не помещается в контейнер и должен быть обрезан',
    maxLines: 1,
    hideTooltip: false,
    placement: 'top',
    trigger: 'hoverAndFocusVisible',
  },
  argTypes: {
    variant: {
      control: 'radio',
      options: Object.values(VARIANT),
      description: 'Вариант обрезания: end / middle',
    },
    text: { control: 'text', description: 'Текст, который будет обрезаться' },
    maxLines: { control: 'number', description: 'Максимум строк (только для variant=end)' },
    hideTooltip: { control: 'boolean', description: 'Скрывать тултип с полным текстом' },
    placement: {
      control: 'select',
      options: ['top', 'bottom', 'left', 'right'],
      description: 'Позиция тултипа',
    },
  },
  decorators: [
    Story => (
      <div className={styles.container}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(canvasElement.firstElementChild).toBeTruthy();
  },
};
