import { afterEach, describe, expect, it, vi } from 'vitest';

import { getEnabledColumnsInitialState } from '../src/components/Table/hooks/useColumnSettings/utils/getEnabledColumnsInitialState';
import { COLUMN_SETTINGS_MODE } from '../src/constants';
import { ColumnDefinition } from '../src/types';

// Барель utils реэкспортирует getTableColumnsDefinitions, который тянет JSX-heavy
// helperComponents (покрываются play-функциями, см. coverage-standard.md).
// Подменяем барель на реальные leaf-модули, нужные getEnabledColumnsInitialState.
vi.mock('../src/components/Table/utils', async () => {
  const getColumnIdentifier = await vi.importActual<typeof import('../src/components/Table/utils/getColumnIdentifier')>(
    '../src/components/Table/utils/getColumnIdentifier',
  );
  const isEveryArrayItemString = await vi.importActual<
    typeof import('../src/components/Table/utils/isEveryArrayItemString')
  >('../src/components/Table/utils/isEveryArrayItemString');

  return { ...getColumnIdentifier, ...isEveryArrayItemString };
});

type Row = { name: string; age: number; status: string };

type SavedState = Parameters<typeof getEnabledColumnsInitialState<Row>>[1];

const LOCAL_STORAGE_KEY = 'tbl-column-settings';

const configurableColumns: ColumnDefinition<Row>[] = [
  { accessorKey: 'name', columnSettings: { label: 'Name' } },
  { accessorKey: 'age', columnSettings: { label: 'Age', mode: COLUMN_SETTINGS_MODE.DefaultHidden } },
  { accessorKey: 'status', columnSettings: { label: 'Status', mode: COLUMN_SETTINGS_MODE.DefaultVisible } },
];

const savedState: SavedState = { id: 'tbl', columnSettings: true };

// In-memory стаб браузерного окружения: isBrowser() из @ds/utils проверяет
// window.document.createElement, чтение настроек идёт через global localStorage.
function stubBrowserEnv(initial: Record<string, string> = {}) {
  const store = new Map<string, string>(Object.entries(initial));

  vi.stubGlobal('window', { document: { createElement: () => ({}) } });
  vi.stubGlobal('localStorage', {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
  });

  return store;
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('getEnabledColumnsInitialState', () => {
  it('returns initially enabled columns outside the browser (defaultHidden excluded)', () => {
    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual([
      'name',
      'status',
    ]);
  });

  it('returns an empty list for an empty column list', () => {
    stubBrowserEnv();

    expect(getEnabledColumnsInitialState<Row>([], savedState, LOCAL_STORAGE_KEY)).toEqual([]);
  });

  it('falls back to defaults when localStorage has no entry', () => {
    stubBrowserEnv();

    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual([
      'name',
      'status',
    ]);
  });

  it('uses the saved list when localStorage and savedState.columnSettings are both present', () => {
    stubBrowserEnv({ [LOCAL_STORAGE_KEY]: JSON.stringify(['age']) });

    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual(['age']);
  });

  it('keeps the configurableColumns order when intersecting with the saved list', () => {
    stubBrowserEnv({ [LOCAL_STORAGE_KEY]: JSON.stringify(['status', 'name']) });

    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual([
      'name',
      'status',
    ]);
  });

  it('treats an empty saved list as "all columns disabled"', () => {
    stubBrowserEnv({ [LOCAL_STORAGE_KEY]: JSON.stringify([]) });

    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual([]);
  });

  it('ignores saved entries that do not match any configurable column', () => {
    stubBrowserEnv({ [LOCAL_STORAGE_KEY]: JSON.stringify(['name', 'unknown-column']) });

    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual(['name']);
  });

  it('ignores localStorage when savedState.columnSettings is not enabled', () => {
    stubBrowserEnv({ [LOCAL_STORAGE_KEY]: JSON.stringify(['age']) });

    expect(getEnabledColumnsInitialState(configurableColumns, { id: 'tbl' }, LOCAL_STORAGE_KEY)).toEqual([
      'name',
      'status',
    ]);
    expect(getEnabledColumnsInitialState(configurableColumns, undefined, LOCAL_STORAGE_KEY)).toEqual([
      'name',
      'status',
    ]);
  });

  it('ignores a malformed localStorage value (not a string array)', () => {
    stubBrowserEnv({ [LOCAL_STORAGE_KEY]: JSON.stringify({ name: true }) });

    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual([
      'name',
      'status',
    ]);
  });

  it('ignores a saved array with non-string items', () => {
    stubBrowserEnv({ [LOCAL_STORAGE_KEY]: JSON.stringify(['name', 42]) });

    expect(getEnabledColumnsInitialState(configurableColumns, savedState, LOCAL_STORAGE_KEY)).toEqual([
      'name',
      'status',
    ]);
  });
});
