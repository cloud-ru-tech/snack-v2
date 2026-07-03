import { SimpleTable } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoHint } from '#storybook/components';

import { withTableStorySurface } from '../../decorators';
import { PRESET_USERS, presetUserColumns } from '../../presetFixtures';
import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof SimpleTable> = {
  title: 'Components/Table/Table/Examples/FullWidth',
  component: SimpleTable,
  parameters: { layout: 'padded' },
  decorators: [withTableStorySurface],
};

export default meta;
type Story = StoryObj<typeof SimpleTable>;

const baseProps = {
  data: PRESET_USERS.slice(0, 5),
  columns: presetUserColumns,
  pageSize: 5,
  getRowId: (user: (typeof PRESET_USERS)[number]) => user.id,
  outline: true,
} as const;

export const FullWidth: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <div className={styles.fullWidthDemo}>
      <DemoHint>
        В широком контейнере: <code>fullWidth=true</code> (дефолт) растягивает таблицу; <code>fullWidth=false</code> —
        по сумме колонок.
      </DemoHint>
      <div className={styles.fullWidthDemoRow}>
        <SimpleTable {...baseProps} fullWidth data-test-id={`${TEST_IDS.table.root}-full`} />
        <SimpleTable {...baseProps} fullWidth={false} data-test-id={`${TEST_IDS.table.root}-fit`} />
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(`${TEST_IDS.table.root}-full`)).toBeVisible();
    await expect(canvas.getByTestId(`${TEST_IDS.table.root}-fit`)).toBeVisible();
  },
};
