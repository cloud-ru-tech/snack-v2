import { APPEARANCE as BUTTON_APPEARANCE, Button, VIEW as BUTTON_VIEW } from '@ds/button';
import { TrashSVG } from '@ds/icons/interface/system';
import {
  ClientTableProps,
  ColumnDefinition,
  getRowActionsColumnDef,
  StickyControls,
  Table,
  TABLE_ROW_COLOR,
  TABLE_STICKY_CONTROLS_BACKGROUND_PREDEFINED_OPTIONS,
  TableRowColor,
  TableStickyControlsBackgroundPredefined,
  ToolbarCheckBoxMode,
  VIEW,
} from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType, useEffect, useMemo, useState } from 'react';
import { fn } from 'storybook/test';

import { withTableStorySurface } from '../decorators';
import { buildUserColumns, filterUsers, SAMPLE_USERS, User, USER_FILTERS, UserFiltersState } from '../fixtures';
import { TEST_IDS } from '../testIds';

// Тогглы фич уровня story (`[Stories]: show*`) — собираются в render в реальные
// пропсы/колонки таблицы. В API компонента их нет.
type StoryToggles = {
  showStatusColumn: boolean;
  showCopyColumn: boolean;
  showRowActions: boolean;
  wideColumns: boolean;
  showSorting: boolean;
  showColumnSettings: boolean;
  showSelection: boolean;
  showFilters: boolean;
  showBulkActions: boolean;
  showRowColors: boolean;
  showHeaderRowColor: TableRowColor | 'none';
};

/** Плоские контролы Playground для `stickyControls` — собираются в render в проп Table. */
type StickyControlsStoryArgs = {
  stickyControlsEnabled?: boolean;
  stickyControlsOffsetTop?: number;
  stickyControlsOffsetBottom?: number;
  stickyControlsBackgroundPredefined?: TableStickyControlsBackgroundPredefined;
};

function buildStickyControlsProp({
  stickyControlsEnabled,
  stickyControlsOffsetTop,
  stickyControlsOffsetBottom,
  stickyControlsBackgroundPredefined,
}: StickyControlsStoryArgs): StickyControls | undefined {
  if (
    stickyControlsEnabled === undefined &&
    stickyControlsOffsetTop === undefined &&
    stickyControlsOffsetBottom === undefined &&
    stickyControlsBackgroundPredefined === undefined
  ) {
    return undefined;
  }

  return {
    ...(stickyControlsEnabled !== undefined && { enabled: stickyControlsEnabled }),
    ...(stickyControlsOffsetTop !== undefined && { offsetTop: stickyControlsOffsetTop }),
    ...(stickyControlsOffsetBottom !== undefined && { offsetBottom: stickyControlsOffsetBottom }),
    ...(stickyControlsBackgroundPredefined !== undefined && {
      backgroundPredefined: stickyControlsBackgroundPredefined,
    }),
  };
}

// Радужная тонировка строк по id (без neutral). getRowBackgroundColor получает
// только данные строки, поэтому цвет привязан заранее.
const RAINBOW: TableRowColor[] = [
  TABLE_ROW_COLOR.Red,
  TABLE_ROW_COLOR.Orange,
  TABLE_ROW_COLOR.Yellow,
  TABLE_ROW_COLOR.Green,
  TABLE_ROW_COLOR.Blue,
  TABLE_ROW_COLOR.Violet,
  TABLE_ROW_COLOR.Pink,
];
const rowColorById = new Map<string, TableRowColor>(
  SAMPLE_USERS.map((user, index) => [user.id, RAINBOW[index % RAINBOW.length]]),
);

// `TableProps` — discriminated union (Infinite | Client). Сторибуковский `Args`
// над union даёт `Partial<A> | Partial<B>` и ломает `args`. Берём конкретную
// client-ветку как плоский тип контролов и кастуем компонент.
type StoryArgs = Omit<ClientTableProps<User>, 'stickyControls'> & StoryToggles & StickyControlsStoryArgs;

const rowActionClick = fn();

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/Table',
  component: Table as ComponentType<StoryArgs>,
  // Порядок контролов — по объявлению в argTypes (как в Toolbar.Playground).
  // Без controls.sort: 'alpha' — иначе [Stories]:* уезжают наверх.
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    // [Stories]: фичи, собираемые в render. По умолчанию включены все — Playground
    // показывает таблицу со всеми возможностями сразу; любую можно выключить тогглом.
    showStatusColumn: true,
    showCopyColumn: true,
    showRowActions: true,
    wideColumns: true,
    showSorting: true,
    showColumnSettings: true,
    showSelection: true,
    showFilters: true,
    showBulkActions: true,
    showRowColors: true,
    showHeaderRowColor: 'none',

    // стабильные row-id из данных: selection/sorting-ассерты e2e адресуют строки по data-row-id
    getRowId: (user: User) => user.id,
    view: undefined,
    showDataView: true,
    headlineId: 'name',
    cardColumns: undefined,
    cardMinWidth: 292,

    toolbarAfter: 'none',

    pageSize: 10,
    outline: true,
    fullWidth: true,
    loading: false,
    pagination: { options: [5, 10, 20] },
    moreActions: [{ content: { option: 'Архивировать' }, onClick: fn() }],
    toolbarCheckBoxMode: ToolbarCheckBoxMode.PageRows,
    onRefresh: fn(),
    onExport: fn(),
    onRowClick: fn(),
    'data-test-id': TEST_IDS.table.root,

    stickyControlsEnabled: undefined,
    stickyControlsOffsetTop: undefined,
    stickyControlsOffsetBottom: undefined,
    stickyControlsBackgroundPredefined: undefined,
  },
  argTypes: {
    stickyControlsEnabled: {
      name: 'stickyControls.enabled',
      control: 'boolean',
      description:
        'Sticky тулбар, header row и пагинация при скролле страницы. По умолчанию true на mobile, false на desktop. При включении — фон story синхронизируется с подложкой chrome.',
    },
    stickyControlsOffsetTop: {
      name: 'stickyControls.offsetTop',
      control: 'number',
      description: 'Дополнительный отступ sticky-хрома сверху (px), например под app header.',
      if: { arg: 'stickyControlsEnabled', eq: true },
    },
    stickyControlsOffsetBottom: {
      name: 'stickyControls.offsetBottom',
      control: 'number',
      description: 'Дополнительный отступ sticky-хрома снизу (px), например над tab bar.',
      if: { arg: 'stickyControlsEnabled', eq: true },
    },
    stickyControlsBackgroundPredefined: {
      name: 'stickyControls.backgroundPredefined',
      control: 'select',
      options: TABLE_STICKY_CONTROLS_BACKGROUND_PREDEFINED_OPTIONS,
      description: 'Подложка chrome-контролов. При включённом sticky — фон story синхронизируется с этим значением.',
      if: { arg: 'stickyControlsEnabled', eq: true },
    },
    layoutPresets: { table: { disable: true } },
    // [Stories]: тогглы фич
    showStatusColumn: { name: '[Stories]: showStatusColumn', control: 'boolean' },
    showCopyColumn: { name: '[Stories]: showCopyColumn', control: 'boolean' },
    showRowActions: { name: '[Stories]: showRowActions', control: 'boolean' },
    wideColumns: { name: '[Stories]: wideColumns (≥20 колонок)', control: 'boolean' },
    showSorting: { name: '[Stories]: showSorting', control: 'boolean' },
    showColumnSettings: { name: '[Stories]: showColumnSettings', control: 'boolean' },
    showSelection: { name: '[Stories]: showSelection', control: 'boolean' },
    showFilters: { name: '[Stories]: showFilters', control: 'boolean' },
    // массовые операции имеют смысл только при включённом выборе строк
    showBulkActions: { name: '[Stories]: showBulkActions', control: 'boolean', if: { arg: 'showSelection', eq: true } },
    showRowColors: { name: '[Stories]: showRowColors (радуга)', control: 'boolean' },
    showHeaderRowColor: {
      name: '[Stories]: showHeaderRowColor',
      control: 'select',
      options: ['none', ...Object.values(TABLE_ROW_COLOR)],
      if: { arg: 'view', eq: VIEW.Table },
    },

    view: {
      control: 'radio',
      options: Object.values(VIEW),
      description: 'Режим отображения: таблица или карточки. Синхронизируется с переключателем в тулбаре.',
    },
    toolbarCheckBoxMode: {
      control: 'radio',
      options: Object.values(ToolbarCheckBoxMode),
      if: { arg: 'showSelection', eq: true },
    },
    defaultView: { table: { disable: true } },
    // headlineId / cardColumns / cardMinWidth имеют смысл только в режиме карточек
    headlineId: { if: { arg: 'view', eq: VIEW.Cards } },
    cardColumns: { if: { arg: 'view', eq: VIEW.Cards } },
    cardMinWidth: { if: { arg: 'view', eq: VIEW.Cards } },

    // renderCard — функция, в панели Controls не редактируется
    renderCard: { table: { disable: true } },

    // Слот после строки поиска — ReactNode, в контролах через mapping-пресеты
    toolbarAfter: {
      control: 'select',
      options: ['none', 'extraButton'],
      mapping: {
        none: undefined,
        extraButton: <Button appearance={BUTTON_APPEARANCE.Neutral} label='Экспорт' view={BUTTON_VIEW.Outline} />,
      },
    },

    // Структурные пропсы собираются из тогглов в render — из панели не редактируются
    data: { table: { disable: true } },
    columnDefinitions: { table: { disable: true } },
    sorting: { table: { disable: true } },
    rowSelection: { table: { disable: true } },
    columnsSettings: { table: { disable: true } },
    columnFilters: { table: { disable: true } },
    bulkActions: { table: { disable: true } },
    // search содержит controlled-пару state/onChange — контрол «ничего не делает»
    search: { table: { disable: true } },
    // rowPinning конфликтует с expanding и требует согласованного getRowId
    rowPinning: { table: { disable: true } },
    expanding: { table: { disable: true } },
    savedState: { table: { disable: true } },
    moreActions: { table: { disable: true } },
    noDataState: { table: { disable: true } },
    noResultsState: { table: { disable: true } },
    errorDataState: { table: { disable: true } },
    // control: false дополнительно к disable — глушит color-матчер preview (имя пропа
    // оканчивается на Color, матчер навязал бы color-контрол функции и сыпал warning).
    getRowBackgroundColor: { control: false, table: { disable: true } },
    headerRowBackgroundColor: { control: false, table: { disable: true } },
    getRowId: { table: { disable: true } },
    scrollRef: { table: { disable: true } },
    scrollContainerRef: { table: { disable: true } },
    onRowClick: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
    onExport: { table: { disable: true } },
    onViewChange: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

function PlaygroundRender({
  showStatusColumn,
  showCopyColumn,
  showRowActions,
  wideColumns,
  showSorting,
  showColumnSettings,
  showSelection,
  showFilters,
  showBulkActions,
  showRowColors,
  showHeaderRowColor,
  stickyControlsEnabled,
  stickyControlsOffsetTop,
  stickyControlsOffsetBottom,
  stickyControlsBackgroundPredefined,
  view: viewFromArgs,
  onViewChange,
  ...rest
}: StoryArgs) {
  const [view, setView] = useState(viewFromArgs);

  useEffect(() => {
    setView(viewFromArgs);
  }, [viewFromArgs]);

  const handleViewChange = (nextView: (typeof VIEW)[keyof typeof VIEW]) => {
    setView(nextView);
    onViewChange?.(nextView);
  };

  const [filters, setFilters] = useState<UserFiltersState>({});

  // Фильтрация — на стороне потребителя (Table только рисует filter-row).
  const data = useMemo(() => (showFilters ? filterUsers(SAMPLE_USERS, filters) : SAMPLE_USERS), [showFilters, filters]);

  const columns = useMemo<ColumnDefinition<User>[]>(() => {
    let cols = buildUserColumns({
      withStatusColumn: showStatusColumn,
      withCopyColumn: showCopyColumn,
      withColumnSettings: showColumnSettings,
      withResizing: true,
      withDates: true,
      wide: wideColumns,
    });

    if (!showSorting) {
      cols = cols.map(column => ({ ...column, enableSorting: false }));
    }

    if (showRowActions) {
      cols = [
        ...cols,
        getRowActionsColumnDef<User>({
          pinned: true,
          actionsGenerator: () => [
            { content: { option: 'Дублировать' }, onClick: rowActionClick },
            { content: { option: 'Удалить' }, onClick: rowActionClick },
          ],
        }),
      ];
    }

    return cols;
  }, [showStatusColumn, showCopyColumn, showColumnSettings, wideColumns, showSorting, showRowActions]);

  const stickyControls = useMemo(
    () =>
      buildStickyControlsProp({
        stickyControlsEnabled,
        stickyControlsOffsetTop,
        stickyControlsOffsetBottom,
        stickyControlsBackgroundPredefined,
      }),
    [stickyControlsEnabled, stickyControlsOffsetTop, stickyControlsOffsetBottom, stickyControlsBackgroundPredefined],
  );

  return (
    <Table
      {...rest}
      stickyControls={stickyControls}
      view={view}
      onViewChange={handleViewChange}
      data={data}
      columnDefinitions={columns}
      sorting={{}}
      rowSelection={showSelection ? { enable: true, multiRow: true } : undefined}
      columnsSettings={showColumnSettings ? { enableDrag: true, enableSettingsMenu: true } : undefined}
      columnFilters={
        showFilters ? { filters: USER_FILTERS, value: filters, onChange: setFilters, initialOpen: true } : undefined
      }
      bulkActions={
        showBulkActions
          ? [
              {
                label: 'Удалить выбранные',
                icon: TrashSVG,
                onClick: (_state, resetRowSelection) => resetRowSelection(),
              },
            ]
          : undefined
      }
      getRowBackgroundColor={showRowColors ? user => rowColorById.get(user.id) : undefined}
      headerRowBackgroundColor={showHeaderRowColor !== 'none' ? showHeaderRowColor : undefined}
    />
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: (args, { updateArgs }) => (
    <PlaygroundRender {...args} onViewChange={nextView => updateArgs({ view: nextView })} />
  ),
};
