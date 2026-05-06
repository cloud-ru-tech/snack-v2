import { SegmentControl, SIZE, WIDTH } from '@ds/segment-control';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { SEGMENT_CONTROL_TEST_ID } from './testIds';

const ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports' },
  { value: 'settings', label: 'Settings' },
];

const meta: Meta<typeof SegmentControl> = {
  title: 'Components/SegmentControl',
  component: SegmentControl,
  parameters: { layout: 'centered' },
  args: {
    items: ITEMS,
    defaultValue: 'overview',
    size: SIZE.M,
    width: WIDTH.Auto,
    outline: false,
    'data-test-id': SEGMENT_CONTROL_TEST_ID,
  },
  decorators: [
    Story => (
      <div className={styles.item}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: {
      control: 'radio',
      options: Object.values(SIZE),
      description: 'Размер: s / m / l',
    },
    width: {
      control: 'radio',
      options: Object.values(WIDTH),
      description: 'Ширина: auto / full',
    },
    outline: { control: 'boolean', description: 'Обводка контейнера' },
    name: { control: 'text', description: 'Имя поля (hidden input для формы)' },
    value: { control: false },
    defaultValue: { control: false },
    items: { control: false },
    onChange: { action: 'change' },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentControl>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(SEGMENT_CONTROL_TEST_ID)).toBeVisible();
  },
};
