/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- unit-тест в jsdom: контейнер для
   пробника создаётся вне компонента, ssr-гварды здесь неприменимы. */
import { ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import { useColumnSizes } from '../src/components/Table/hooks/useColumnSizes';
import { TABLE_COLUMN_CSS_VARS } from '../src/constants';

/** Флаг React'а «мы внутри act()» — глобального объявления в типах нет, ставим точечно. */
const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

type Row = { id: string; name: string; chargeType: string };

const DATA: Row[] = [
  { id: '1', name: 'first', chargeType: 'monthly' },
  { id: '2', name: 'second', chargeType: 'hourly' },
];

const SIZE_VAR = (columnId: string) => `--table-column-${columnId}-size`;

type ProbeApi = {
  renders: number;
  vars: Record<string, string>;
  columnSizing: Record<string, number>;
  toMeasure: string[];
  measureHistory: string[][];
  setColumnSizing(sizes: Record<string, number>): void;
  startResizing(columnId: string): void;
};

/**
 * Рендерит хук поверх реального инстанса tanstack-таблицы. `headers` пересоздаются на
 * каждый рендер — так ведёт себя Table, когда потребитель передаёт `columnDefinitions`
 * новой ссылкой: `useMemo` внутри хука пересчитывается всегда, поэтому лишняя запись
 * размеров превращается в бесконечные обновления.
 */
function renderProbe(columns: ColumnDef<Row>[]) {
  const container = document.createElement('div');
  document.body.append(container);

  const api: ProbeApi = {
    renders: 0,
    vars: {},
    columnSizing: {},
    toMeasure: [],
    measureHistory: [],
    setColumnSizing: () => undefined,
    startResizing: () => undefined,
  };

  function Probe() {
    const table = useReactTable<Row>({
      data: DATA,
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    const { columnSizes } = useColumnSizes<Row>({
      table,
      headers: [...table.getFlatHeaders()],
      isLoadingState: false,
      savedState: undefined,
    });

    api.renders += 1;
    api.vars = columnSizes.vars;
    api.columnSizing = table.getState().columnSizing;
    api.toMeasure = columnSizes.headerIdsToMeasure;
    api.measureHistory.push(columnSizes.headerIdsToMeasure);
    api.setColumnSizing = sizes => table.setColumnSizing(sizes);
    api.startResizing = columnId =>
      table.setColumnSizingInfo(old => ({ ...old, isResizingColumn: columnId, startOffset: 0, startSize: 0 }));

    return null;
  }

  let root: Root;

  act(() => {
    root = createRoot(container);
    root.render(<Probe />);
  });

  return {
    api,
    unmount: () =>
      act(() => {
        root.unmount();
        container.remove();
      }),
  };
}

describe('useColumnSizes', () => {
  beforeEach(() => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;
  });

  afterEach(() => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = false;
  });

  it('не пишет размер колонки, у которой только minSize', () => {
    // `minSize` больше size по умолчанию (150): `getSize()` вернёт 240 и никогда не
    // совпадёт с `columnDef.size`. Раньше это считалось изменением ширины пользователем,
    // и страница завершалась с ошибкой «Maximum update depth exceeded».
    const { api, unmount } = renderProbe([
      { id: 'name', accessorKey: 'name', header: 'Наименование', size: 350, minSize: 350, maxSize: 350 },
      { id: 'chargeType', accessorKey: 'chargeType', header: 'Тип тарификации', minSize: 240 },
    ]);

    expect(api.columnSizing).toEqual({});
    // Колонка тянется, минимум даёт CSS min-width из columnDef.minSize.
    expect(api.vars[SIZE_VAR('chargeType')]).toBe('100%');
    expect(api.vars[SIZE_VAR('name')]).toBe('350px');
    expect(api.renders).toBeLessThan(5);

    unmount();
  });

  it('не перерендеривает таблицу, когда размеры не изменились', () => {
    const { api, unmount } = renderProbe([
      { id: 'name', accessorKey: 'name', header: 'Наименование' },
      { id: 'chargeType', accessorKey: 'chargeType', header: 'Тип тарификации', minSize: 240, maxSize: 240 },
    ]);

    const rendersBefore = api.renders;

    // Повторная запись тех же размеров не должна давать лишних рендеров.
    act(() => {
      api.setColumnSizing({ chargeType: 400 });
    });

    const rendersAfterResize = api.renders;

    act(() => {
      api.setColumnSizing({ chargeType: 400 });
    });

    expect(api.renders - rendersAfterResize).toBeLessThan(rendersAfterResize - rendersBefore + 2);
    expect(api.renders).toBeLessThan(12);

    unmount();
  });

  it('отдаёт px колонке, у которой minSize совпал с дефолтным размером', () => {
    const { api, unmount } = renderProbe([
      { id: 'name', accessorKey: 'name', header: 'Наименование', size: 200 },
      { id: 'chargeType', accessorKey: 'chargeType', header: 'Тип тарификации', minSize: 200 },
    ]);

    expect(api.vars[SIZE_VAR('chargeType')]).toBe('100%');

    act(() => {
      api.setColumnSizing({ chargeType: 200 });
    });

    expect(api.vars[SIZE_VAR('chargeType')]).toBe('200px');

    unmount();
  });

  it('на старте перетаскивания фиксирует и НЕресайзимые тянущиеся колонки', () => {
    // Тянущиеся колонки делят ширину сообща (`width: 100%` + `flex-shrink: 1`). Если заморозить
    // только ресайзимые, остаток перераспределится на остальные и таблица дёрнется на нажатии.
    const { api, unmount } = renderProbe([
      { id: 'name', accessorKey: 'name', header: 'Наименование', enableResizing: true },
      { id: 'chargeType', accessorKey: 'chargeType', header: 'Тип тарификации', enableResizing: false },
    ]);

    expect(api.measureHistory.flat()).toEqual([]);

    act(() => {
      api.startResizing('name');
    });

    // обе колонки уходят на замер — и ресайзимая, и нет
    // (в jsdom замер возвращает 0, поэтому в vars они останутся тянущимися — проверяем очередь)
    const queued = api.measureHistory.flat();

    expect(queued).toContain('name');
    expect(queued).toContain('chargeType');

    unmount();
  });

  it('имя CSS-переменной не ломается о точку в id колонки', () => {
    expect(TABLE_COLUMN_CSS_VARS.size('diskType.name')).toBe('--table-column-diskType_2e_name-size');
    expect(TABLE_COLUMN_CSS_VARS.flex('diskType.name')).toBe('--table-column-diskType_2e_name-flex');
    expect(TABLE_COLUMN_CSS_VARS.size('a.b')).not.toBe(TABLE_COLUMN_CSS_VARS.size('a_b'));
    expect(TABLE_COLUMN_CSS_VARS.size('snack_predefined_statusColumn')).toBe(
      '--table-column-snack_predefined_statusColumn-size',
    );
  });

  it('сохраняет ширину колонки, изменённую пользователем', () => {
    const { api, unmount } = renderProbe([
      { id: 'name', accessorKey: 'name', header: 'Наименование', size: 200 },
      { id: 'chargeType', accessorKey: 'chargeType', header: 'Тип тарификации', minSize: 240 },
    ]);

    act(() => {
      api.setColumnSizing({ name: 420 });
    });

    expect(api.vars[SIZE_VAR('name')]).toBe('420px');
    expect(api.columnSizing).toEqual({ name: 420 });

    unmount();
  });
});
