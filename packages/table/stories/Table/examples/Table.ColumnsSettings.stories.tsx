import { Table } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { buildUserColumns, SAMPLE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/ColumnsSettings',
  ...tableExampleMeta,
};

export default meta;
type Story = StoryObj<typeof Table>;

// Широкая таблица (≥20 колонок) с управлением через тулбар: сортировка по клику в
// заголовок, меню настроек колонок (показать/скрыть), drag-перетаскивание.
// withColumnSettings вешает per-column `columnSettings` (режимы COLUMN_SETTINGS_MODE):
// email → DefaultTrue, role → DefaultFalse, amount → Hidden (в меню disabled).
// Колонки без columnSettings (name, createdAt, status) тоже в меню — disabled.
// wide добавляет ~16 колонок (отдел, город, тариф, менеджер, …).
//
// Behavioral (open / enable / hidden) — в Table/Tests/Interaction::play.
// Real DnD строк меню → порядок колонок — в Playwright interaction.spec
// (HTML5 DnD в storybook-test ненадёжен).
const columns = buildUserColumns({
  withStatusColumn: true,
  withColumnSettings: true,
  withResizing: true,
  withDates: true,
  wide: true,
});

export const ColumnsSettings: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      // enableDrag: переупорядочивание заголовков таблицы и строк в меню настроек
      // (onItemsReorder у Droplist).
      columnsSettings={{ enableSettingsMenu: true, enableDrag: true }}
      outline
    />
  ),
};
