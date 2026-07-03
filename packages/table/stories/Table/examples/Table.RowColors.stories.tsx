import { Table, TABLE_ROW_COLOR, TableRowColor } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { buildUserColumns, SAMPLE_USERS, User } from '../../fixtures';
import { TEST_IDS } from '../../testIds';
import { tableExampleMeta } from './sharedMeta';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Examples/RowColors',
  ...tableExampleMeta,
};

export default meta;
type Story = StoryObj<typeof Table>;

const columns = buildUserColumns({ withStatusColumn: true });

// Радужная палитра тонировки строк (без neutral — он почти не заметен).
const RAINBOW: TableRowColor[] = [
  TABLE_ROW_COLOR.Red,
  TABLE_ROW_COLOR.Orange,
  TABLE_ROW_COLOR.Yellow,
  TABLE_ROW_COLOR.Green,
  TABLE_ROW_COLOR.Blue,
  TABLE_ROW_COLOR.Violet,
  TABLE_ROW_COLOR.Pink,
];

// getRowBackgroundColor получает только данные строки (не индекс), поэтому цвет
// привязываем к строке заранее — по её id. Тонировка применяется к строке
// фоном (8% accent); выбранные/disabled-строки её не получают (приоритет у
// selection/disabled — как в Figma).
const rowColorById = new Map<string, TableRowColor>(
  SAMPLE_USERS.map((user, index) => [user.id, RAINBOW[index % RAINBOW.length]]),
);

const getRainbowRowColor = (user: User): TableRowColor | undefined => rowColorById.get(user.id);

export const RowColors: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={SAMPLE_USERS}
      columnDefinitions={columns}
      getRowBackgroundColor={getRainbowRowColor}
      outline
    />
  ),
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getByTestId(TEST_IDS.table.root);
    const rows = within(root).getAllByTestId(TEST_IDS.component.bodyRow);
    // первая строка тонирована (data-row-bg-appearance проставлен)
    expect(rows[0]).toHaveAttribute('data-row-bg-appearance', TABLE_ROW_COLOR.Red);
  },
};
