import { Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { buildUserColumns, makeUsers } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/Virtualization',
  component: Table,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Table>;

// 500 строк — достаточно, чтобы почувствовать виртуализацию строк.
const MANY_ROWS = makeUsers(500);

// Широкая таблица — 20 дополнительных колонок для виртуализации по горизонтали.
const WIDE_COLUMNS = buildUserColumns({ wide: true, withStatusColumn: true, withDates: true });

// ─── Row virtualization ────────────────────────────────────────────────────────

function RowVirtualizationTable() {
  const columns = buildUserColumns({ withStatusColumn: true });

  return (
    <div className={styles.scrollArea}>
      <Table
        data-test-id={TEST_IDS.table.root}
        data={MANY_ROWS}
        columnDefinitions={columns}
        enableRowVirtualization
        suppressPagination
        pageSize={MANY_ROWS.length}
        outline
      />
    </div>
  );
}

/**
 * Таблица из 500 строк с виртуализацией по вертикали.
 * В DOM одновременно присутствует только «окно» видимых строк (overscan=10);
 * остальные монтируются при прокрутке.
 */
export const RowVirtualization: Story = {
  tags: ['dev', 'test'],
  render: () => <RowVirtualizationTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await expect(root).toBeVisible();
    // В DOM должно быть значительно меньше строк, чем всего 500
    const renderedRows = within(root).getAllByTestId(TEST_IDS.component.bodyRow);

    expect(renderedRows.length).toBeGreaterThan(0);
    expect(renderedRows.length).toBeLessThan(500);
  },
};

// ─── Column virtualization ─────────────────────────────────────────────────────

function ColumnVirtualizationTable() {
  return (
    <div className={styles.scrollArea}>
      <Table
        data-test-id={TEST_IDS.table.root}
        data={MANY_ROWS.slice(0, 20)}
        columnDefinitions={WIDE_COLUMNS}
        enableColumnVirtualization
        suppressPagination
        pageSize={20}
        outline
      />
    </div>
  );
}

/**
 * Таблица с ~20 колонками и виртуализацией по горизонтали.
 * В DOM одновременно присутствует только «окно» видимых колонок (overscan=3);
 * остальные монтируются при горизонтальной прокрутке.
 */
export const ColumnVirtualization: Story = {
  tags: ['dev', 'test'],
  render: () => <ColumnVirtualizationTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await expect(root).toBeVisible();
  },
};

// ─── Row + Column virtualization ──────────────────────────────────────────────

function FullVirtualizationTable() {
  return (
    <div className={styles.scrollArea}>
      <Table
        data-test-id={TEST_IDS.table.root}
        data={MANY_ROWS}
        columnDefinitions={WIDE_COLUMNS}
        enableRowVirtualization
        enableColumnVirtualization
        suppressPagination
        pageSize={MANY_ROWS.length}
        outline
      />
    </div>
  );
}

/**
 * Комбинация виртуализации строк и колонок: 500 строк × ~20 колонок.
 * DOM содержит только «окно» видимых строк и колонок одновременно.
 */
export const FullVirtualization: Story = {
  tags: ['dev', 'test'],
  render: () => <FullVirtualizationTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.table.root);

    await expect(root).toBeVisible();
    const renderedRows = within(root).getAllByTestId(TEST_IDS.component.bodyRow);

    expect(renderedRows.length).toBeGreaterThan(0);
    expect(renderedRows.length).toBeLessThan(500);
  },
};
