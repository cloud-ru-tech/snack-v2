import { Skeleton } from '@ds/skeleton';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from '../styles.module.scss';

const WRAPPER_TEST_ID = 'skeleton-playground-wrapper';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: { layout: 'centered' },
  args: {
    loading: true,
    width: 200,
    height: 24,
    borderRadius: 4,
  },
  argTypes: {
    loading: { control: 'boolean', description: 'Флаг состояния загрузки. true — скелетон, false — children.' },
    width: { control: { type: 'number' }, description: 'Ширина блока (CSS width)' },
    height: { control: { type: 'number' }, description: 'Высота блока (CSS height)' },
    borderRadius: { control: { type: 'number' }, description: 'Радиус скругления (CSS borderRadius)' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <div className={styles.wrapper} data-testid={WRAPPER_TEST_ID}>
      <Skeleton {...args}>
        <span>Контент после загрузки</span>
      </Skeleton>
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(WRAPPER_TEST_ID)).toBeVisible();
  },
};
