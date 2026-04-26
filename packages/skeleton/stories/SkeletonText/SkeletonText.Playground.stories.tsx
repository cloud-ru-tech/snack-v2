import { ALIGN, SIZE, SkeletonText, VARIANT } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from '../styles.module.scss';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/Skeleton/SkeletonText',
  component: SkeletonText,
  parameters: { layout: 'centered' },
  args: {
    loading: true,
    variant: VARIANT.Body,
    size: SIZE.M,
    align: ALIGN.Left,
    lines: 3,
    'data-test-id': 'skeleton-text',
  },
  argTypes: {
    loading: { control: 'boolean', description: 'Флаг состояния загрузки' },
    lines: { control: { type: 'number', min: 1, max: 10 }, description: 'Количество строк' },
    variant: { options: Object.values(VARIANT), control: 'select', description: 'Роль типографики' },
    size: { options: Object.values(SIZE), control: 'radio', description: 'Масштаб: s / m / l' },
    align: { options: Object.values(ALIGN), control: 'radio', description: 'Выравнивание' },
    width: { control: { type: 'number' }, description: 'Ширина контейнера' },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.wrapper}>
      <SkeletonText {...args}>
        <span>Контент после загрузки.</span>
      </SkeletonText>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId('skeleton-text')).toBeVisible();
  },
};
