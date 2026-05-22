import { SegmentControl, SIZE, TEST_IDS, WIDTH } from '@ds/segment-control';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';

const ITEMS = [
  { value: 'overview', label: 'Overview' },
  { value: 'analytics', label: 'Analytics' },
  { value: 'reports', label: 'Reports' },
  { value: 'settings', label: 'Settings' },
];

const meta: Meta<typeof SegmentControl> = {
  title: 'Components/SegmentControl',
  component: SegmentControl,
  parameters: { layout: 'fullscreen' },
  args: {
    items: ITEMS,
    defaultValue: 'overview',
    size: SIZE.M,
    width: WIDTH.Auto,
    outline: false,
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Сегментный контрол для переключения между связанными вариантами.</DemoHint>
        <DemoActions block>
          <div className={styles.item}>
            <SegmentControl key={String(args.defaultValue ?? '')} {...args} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
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
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    items: { table: { disable: true } },
    onChange: { action: 'change' },
  },
};

export default meta;
type Story = StoryObj<typeof SegmentControl>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
