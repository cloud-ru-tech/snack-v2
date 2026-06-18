import { afterEach, describe, expect, it, vi } from 'vitest';

import { getInitColumnSizeFromLocalStorage, saveStateToLocalStorage } from '../src/components/Table/utils/columnSize';

// In-memory стаб браузерного окружения: isBrowser() из @ds/utils проверяет
// window.document.createElement, сами функции читают/пишут global localStorage.
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

describe('columnSize (non-browser environment)', () => {
  it('getInitColumnSizeFromLocalStorage returns undefined outside the browser', () => {
    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'name' })).toBeUndefined();
  });

  it('saveStateToLocalStorage is a no-op outside the browser', () => {
    expect(() => saveStateToLocalStorage({ id: 'tbl', columnId: 'name', size: '120px' })).not.toThrow();
  });
});

describe('columnSize (browser environment)', () => {
  it('returns undefined when localStorage has no entry for the table id', () => {
    stubBrowserEnv();

    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'name' })).toBeUndefined();
  });

  it('returns undefined for an empty table id', () => {
    stubBrowserEnv();

    expect(getInitColumnSizeFromLocalStorage({ id: '', columnId: 'name' })).toBeUndefined();
  });

  it('round-trips a saved column size', () => {
    stubBrowserEnv();

    saveStateToLocalStorage({ id: 'tbl', columnId: 'name', size: '120px' });

    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'name' })).toBe('120px');
  });

  it('returns undefined for a column without a saved size', () => {
    stubBrowserEnv();

    saveStateToLocalStorage({ id: 'tbl', columnId: 'name', size: '120px' });

    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'age' })).toBeUndefined();
  });

  it('keeps sizes of other columns when saving', () => {
    stubBrowserEnv();

    saveStateToLocalStorage({ id: 'tbl', columnId: 'name', size: '120px' });
    saveStateToLocalStorage({ id: 'tbl', columnId: 'age', size: '80px' });

    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'name' })).toBe('120px');
    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'age' })).toBe('80px');
  });

  it('overwrites the size of the same column', () => {
    stubBrowserEnv();

    saveStateToLocalStorage({ id: 'tbl', columnId: 'name', size: '120px' });
    saveStateToLocalStorage({ id: 'tbl', columnId: 'name', size: '200px' });

    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'name' })).toBe('200px');
  });

  it('preserves unrelated state already stored under the same key', () => {
    const store = stubBrowserEnv({ tbl: JSON.stringify({ columnSettings: ['name'] }) });

    saveStateToLocalStorage({ id: 'tbl', columnId: 'name', size: '120px' });

    expect(JSON.parse(store.get('tbl') ?? '{}')).toEqual({
      columnSettings: ['name'],
      resizeState: { 'RESIZED_COLUMN_KEY-name': '120px' },
    });
  });

  it('returns undefined when the stored state has no resizeState section', () => {
    stubBrowserEnv({ tbl: JSON.stringify({ columnSettings: ['name'] }) });

    expect(getInitColumnSizeFromLocalStorage({ id: 'tbl', columnId: 'name' })).toBeUndefined();
  });
});
