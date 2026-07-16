import { CHIP_CHOICE_TEST_IDS } from '@ds/chips';
import { getPageNumberTestId } from '@ds/pagination';
import {
  ClientTableProps,
  ColumnDefinition,
  getRowActionsColumnDef,
  RowSelectionState,
  SortingState,
  Table,
  VIEW,
} from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPanel, DemoTitle } from '#storybook/components';

import { buildUserColumns, getUserSubRows, SAMPLE_USERS, TREE_USERS, User } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Table> = {
  title: 'Components/Table/Table/Tests/Interaction',
  component: Table,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onRowClick: fn(),
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

const COMPONENT_TEST_IDS = TEST_IDS.component;

// Уникальны для этой story (вторая/третья панели), поэтому инлайн — в общий
// stories/testIds.ts переносим только повторяющиеся id.
const CLIENT_TABLE_TEST_ID = 'table-client';
const COLUMNS_SETTINGS_TABLE_TEST_ID = 'table-columns-settings';

// Базовый id item'а droplist'а из @ds/list — общий для всех
// droplist'ов (row actions и ChipChoice rows-per-page); значение уже
// зафиксировано в src/constants.ts как rowActions.option.
const LIST_OPTION_TEST_ID = COMPONENT_TEST_IDS.rowActions.option;

/** data-test-id пункта меню настроек: `list__base-item_<columnId>` (BaseItem из @ds/list). */
const settingsItemTestId = (columnId: string): string => `list__base-item_${columnId}`;

// email → DefaultTrue, role → DefaultFalse (скрыта), amount → Hidden (в меню disabled).
const columnsSettingsColumns = buildUserColumns({ withColumnSettings: true });

const onSortingChange = fn();
const onSelectionChange = fn();
const onRowAction = fn();
const onExport = fn();

const treeColumns: ColumnDefinition<User>[] = [
  { accessorKey: 'role', header: 'Тип', enableSorting: true, size: 160 },
  { accessorKey: 'email', header: 'Email', enableSorting: true, size: 260 },
  getRowActionsColumnDef<User>({
    pinned: true,
    actionsGenerator: () => [{ content: { label: 'Открыть' }, onClick: () => onRowAction() }],
  }),
];

const clientColumns = buildUserColumns();

type InteractiveTreeTableProps = Pick<ClientTableProps<User>, 'onRowClick'>;

function InteractiveTreeTable({ onRowClick }: InteractiveTreeTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [selection, setSelection] = useState<RowSelectionState>({});

  return (
    <Table
      data-test-id={TEST_IDS.table.root}
      data={TREE_USERS}
      columnDefinitions={treeColumns}
      getRowId={user => user.id}
      onRowClick={onRowClick}
      sorting={{
        state: sorting,
        onChange: next => {
          setSorting(next);
          onSortingChange(next);
        },
      }}
      rowSelection={{
        enable: true,
        multiRow: true,
        state: selection,
        onChange: next => {
          setSelection(next);
          onSelectionChange(next);
        },
      }}
      expanding={{
        getSubRows: getUserSubRows,
        expandingColumnDefinition: { accessorKey: 'name', header: 'Подразделение', showToggle: true },
      }}
      suppressPagination
      outline
    />
  );
}

// Полностью uncontrolled клиентская таблица: поиск, пагинация со списком
// rows-per-page и переключатель вида (`showDataView` включает dataView-сегмент;
// `defaultView` задаёт стартовый вид).
function ClientTable() {
  return (
    <Table
      data-test-id={CLIENT_TABLE_TEST_ID}
      data={SAMPLE_USERS}
      columnDefinitions={clientColumns}
      getRowId={user => user.id}
      pageSize={5}
      pagination={{ options: [5, 10] }}
      defaultView={VIEW.Table}
      showDataView
      headlineId='name'
      onExport={onExport}
      outline
    />
  );
}

function ColumnsSettingsTable() {
  return (
    <Table
      data-test-id={COLUMNS_SETTINGS_TABLE_TEST_ID}
      data={SAMPLE_USERS}
      columnDefinitions={columnsSettingsColumns}
      // DnD меню → порядок колонок ассертится в Playwright interaction.spec
      // на Examples/ColumnsSettings (здесь только click/visibility).
      columnsSettings={{ enableSettingsMenu: true }}
      outline
    />
  );
}

export const Interaction: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <>
      <DemoPanel width='wide'>
        <DemoTitle>Tree-таблица</DemoTitle>
        <DemoHint>Выбор строки, сортировка по заголовку, раскрытие tree-строки, row actions и клик по строке.</DemoHint>
        <DemoActions align='start'>
          <InteractiveTreeTable onRowClick={args.onRowClick} />
        </DemoActions>
      </DemoPanel>
      <DemoPanel width='wide'>
        <DemoTitle>Клиентская таблица</DemoTitle>
        <DemoHint>
          Поиск фильтрует строки, пагинация и rows-per-page меняют страницу, сегмент переключает вид в карточки.
        </DemoHint>
        <DemoActions align='start'>
          <ClientTable />
        </DemoActions>
      </DemoPanel>
      <DemoPanel width='wide'>
        <DemoTitle>Настройки колонок</DemoTitle>
        <DemoHint>
          Меню тулбара: показать скрытую колонку (DefaultFalse), проверить Hidden как disabled в списке.
        </DemoHint>
        <DemoActions align='start'>
          <ColumnsSettingsTable />
        </DemoActions>
      </DemoPanel>
    </>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    // портальный контент (droplist'ы) монтируется в document.body, вне canvasElement
    const body = within(canvasElement.ownerDocument.body);
    const treeRoot = canvas.getByTestId(TEST_IDS.table.root);
    const clientRoot = canvas.getByTestId(CLIENT_TABLE_TEST_ID);
    const columnsSettingsRoot = canvas.getByTestId(COLUMNS_SETTINGS_TABLE_TEST_ID);

    await step('select: click tree node toggles selection', async () => {
      // Хендлер выбора висит на контейнере tree-ноды (TEST_IDS.tree.node),
      // а не на самом чекбоксе — кликаем по узлу с обработчиком.
      const treeNode = within(treeRoot).getAllByTestId(COMPONENT_TEST_IDS.tree.node)[0];
      await userEvent.click(treeNode);
      expect(onSelectionChange).toHaveBeenCalled();
    });

    await step('sort: click a sortable header toggles sort indicator', async () => {
      const headerCells = within(treeRoot).getAllByTestId(COMPONENT_TEST_IDS.headerCell);
      const sortableHeader = headerCells.find(cell => cell.dataset.sortable === 'true');
      expect(sortableHeader).toBeTruthy();
      await userEvent.click(sortableHeader as HTMLElement);
      expect(onSortingChange).toHaveBeenCalled();
    });

    await step('expand: click tree chevron expands a parent row', async () => {
      const chevron = within(treeRoot).getAllByTestId(COMPONENT_TEST_IDS.tree.chevron)[0];
      await userEvent.click(chevron);
      const rows = within(treeRoot).getAllByTestId(COMPONENT_TEST_IDS.bodyRow);
      // после раскрытия родителя в таблице появляются дочерние строки
      expect(rows.length).toBeGreaterThan(TREE_USERS.length);
    });

    await step('row actions: droplist option click triggers the action callback', async () => {
      const trigger = within(treeRoot).getAllByTestId(COMPONENT_TEST_IDS.rowActions.droplistTrigger)[0];
      await userEvent.click(trigger);

      // контент droplist'а портален — ищем по canvas, не внутри строки
      const droplist = await waitFor(() => body.getByTestId(COMPONENT_TEST_IDS.rowActions.droplist));
      const option = within(droplist).getAllByTestId(LIST_OPTION_TEST_ID)[0];
      await userEvent.click(option);

      await waitFor(() => expect(onRowAction).toHaveBeenCalledTimes(1));
    });

    await step('row click: click on a regular body cell calls onRowClick', async () => {
      // tree-нода и rowActions гасят всплытие (stopPropagation) — кликаем
      // по обычной текстовой ячейке, событие доходит до обработчика строки.
      const firstRow = within(treeRoot).getAllByTestId(COMPONENT_TEST_IDS.bodyRow)[0];
      const plainCell = within(firstRow).getAllByTestId(COMPONENT_TEST_IDS.bodyCell)[1];
      await userEvent.click(plainCell);
      expect(args.onRowClick).toHaveBeenCalledTimes(1);
    });

    const searchRoot = within(clientRoot).getByTestId(TEST_IDS.toolbar.search);
    const searchInput = within(searchRoot).getByTestId(TEST_IDS.toolbar.searchInput);

    await step('search: typed query filters rows to a single match', async () => {
      // «Борис» матчит ровно одну строку; «Анна» не годится — substring-поиск
      // по всем колонкам зацепил бы и «Жанну Волкову»
      await userEvent.type(searchInput, 'Борис');
      await waitFor(() => {
        expect(within(clientRoot).getAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(1);
      });
    });

    await step('search: no-match query empties rows (noResults), clear restores the page', async () => {
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'нет-такой-строки');
      // у noResults-экрана (InfoBlock) нет публичного test-id — EmptyStateProps
      // не принимает data-test-id, поэтому ассертим через исчезновение строк.
      await waitFor(() => {
        expect(within(clientRoot).queryAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(0);
      });
      await userEvent.clear(searchInput);
      await waitFor(() => {
        expect(within(clientRoot).getAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(5);
      });
    });

    await step('paginate: page 2 click shows the next slice of rows', async () => {
      await userEvent.click(within(clientRoot).getByTestId(getPageNumberTestId(2)));
      await waitFor(() => {
        const rows = within(clientRoot).getAllByTestId(COMPONENT_TEST_IDS.bodyRow);
        expect(rows[0].getAttribute('data-row-id')).toBe(SAMPLE_USERS[5].id);
      });

      // возвращаемся на первую страницу — следующие шаги рассчитаны на page 1
      await userEvent.click(within(clientRoot).getByTestId(getPageNumberTestId(1)));
      await waitFor(() => {
        const rows = within(clientRoot).getAllByTestId(COMPONENT_TEST_IDS.bodyRow);
        expect(rows[0].getAttribute('data-row-id')).toBe(SAMPLE_USERS[0].id);
      });
    });

    await step('rows-per-page: choosing 10 in ChipChoice grows the page', async () => {
      await userEvent.click(within(clientRoot).getByTestId(CHIP_CHOICE_TEST_IDS.value));

      const droplist = await waitFor(() => body.getByTestId(CHIP_CHOICE_TEST_IDS.droplist));
      const option10 = within(droplist)
        .getAllByTestId(LIST_OPTION_TEST_ID)
        .find(option => option.textContent?.trim() === '10');
      expect(option10).toBeTruthy();
      await userEvent.click(option10 as HTMLElement);

      await waitFor(() => {
        expect(within(clientRoot).getAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(10);
      });
    });

    await step('view: cards segment click switches the table to card grid', async () => {
      const dataView = within(clientRoot).getByTestId(TEST_IDS.toolbar.dataView);
      await userEvent.click(within(dataView).getByTestId(TEST_IDS.toolbar.dataViewCardsSegment));

      await waitFor(() => {
        expect(within(clientRoot).getAllByTestId(COMPONENT_TEST_IDS.card)).toHaveLength(10);
        expect(within(clientRoot).queryAllByTestId(COMPONENT_TEST_IDS.bodyRow)).toHaveLength(0);
      });
    });

    await step('export: click export trigger calls onExport callback', async () => {
      const exportTrigger = within(clientRoot).getByTestId(COMPONENT_TEST_IDS.export.trigger);
      await userEvent.click(exportTrigger);
      expect(onExport).toHaveBeenCalledTimes(1);
    });

    await step('column settings: меню настроек колонок открывается', async () => {
      await userEvent.click(within(columnsSettingsRoot).getByTestId(COMPONENT_TEST_IDS.columnSettings.trigger));
      await waitFor(() => expect(body.getByTestId(COMPONENT_TEST_IDS.columnSettings.droplist)).toBeVisible());
    });

    await step('column settings: включение колонки «Роль» добавляет header-cell', async () => {
      // role → DefaultFalse: изначально скрыта
      const headerCellsBefore = within(columnsSettingsRoot).getAllByTestId(COMPONENT_TEST_IDS.headerCell).length;

      await userEvent.click(body.getByTestId(settingsItemTestId('role')));

      await waitFor(() => {
        expect(within(columnsSettingsRoot).getAllByTestId(COMPONENT_TEST_IDS.headerCell)).toHaveLength(
          headerCellsBefore + 1,
        );
      });
    });

    await step('column settings: колонка с mode=hidden в меню disabled', async () => {
      // amount → Hidden: всегда отрисована, в меню есть, `Switch` disabled
      const amountItem = body.getByTestId(settingsItemTestId('amount'));

      await expect(amountItem).toBeVisible();
      // `data-disabled` на обёртке BaseItem, test-id — на внутреннем `li`.
      await expect(amountItem.parentElement).toHaveAttribute('data-disabled');
      await expect(body.getByTestId(settingsItemTestId('email'))).toBeVisible();
    });
  },
};
