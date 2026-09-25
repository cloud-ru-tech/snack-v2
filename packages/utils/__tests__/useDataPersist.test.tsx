/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- Tests run in jsdom. */
import { act } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { DataPersistOptions, DataPersistStorage, useDataPersist } from '../src/hooks/useDataPersist';

type State = { search: string };
const state = { search: 'orders' };
const options: DataPersistOptions<State> = {
  queryKey: 'filters',
  localStorageKey: 'orders_filter',
  validateData: (value): value is State =>
    typeof value === 'object' && value !== null && 'search' in value && typeof value.search === 'string',
};
const allStorages: DataPersistStorage[] = ['queryParams', 'sessionStorage', 'localStorage'];
let root: Root;
let container: HTMLDivElement;

function renderPersist(storages?: DataPersistStorage[], custom = {}) {
  let api: ReturnType<typeof useDataPersist<State>> | undefined;
  function Probe() {
    api = useDataPersist<State>({ options: { ...options, storages }, ...custom });
    return null;
  }
  act(() => root.render(<Probe />));
  if (!api) throw new Error('Hook did not render');
  return api;
}

beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  localStorage.clear();
  sessionStorage.clear();
  history.replaceState({}, '', '/');
  container = document.createElement('div');
  root = createRoot(container);
});
afterEach(() => {
  act(() => root.unmount());
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('useDataPersist', () => {
  const combinations: DataPersistStorage[][] = [
    [],
    ['queryParams'],
    ['localStorage'],
    ['sessionStorage'],
    ['queryParams', 'localStorage'],
    ['queryParams', 'sessionStorage'],
    ['localStorage', 'sessionStorage'],
    allStorages,
  ];
  it.each(combinations.map(storages => ({ storages })))(
    'should read and write only selected sources: $storages',
    ({ storages }) => {
      const api = renderPersist(storages);
      api.setDataToStorages(state);
      expect(localStorage.getItem(options.localStorageKey)).toBe(
        storages.includes('localStorage') ? JSON.stringify(state) : null,
      );
      expect(sessionStorage.getItem(options.localStorageKey)).toBe(
        storages.includes('sessionStorage') ? JSON.stringify(state) : null,
      );
      expect(new URL(location.href).searchParams.get(options.queryKey)).toBe(
        storages.includes('queryParams') ? JSON.stringify(state) : null,
      );
      expect(api.getDefaultData()).toEqual(storages.length ? state : undefined);
    },
  );

  it('should retain the default sources and legacy JSON', () => {
    localStorage.setItem(options.localStorageKey, JSON.stringify(state));
    const api = renderPersist();
    expect(api.getDefaultData()).toEqual(state);
    api.setDataToStorages(state);
    expect(new URL(location.href).searchParams.get(options.queryKey)).toBe(JSON.stringify(state));
    expect(sessionStorage.length).toBe(0);
  });

  it('should prefer URL then sessionStorage then localStorage regardless of array order', () => {
    localStorage.setItem(options.localStorageKey, JSON.stringify({ search: 'local' }));
    sessionStorage.setItem(options.localStorageKey, JSON.stringify({ search: 'session' }));
    history.replaceState({}, '', '/?filters=' + encodeURIComponent(JSON.stringify(state)));
    const api = renderPersist([...allStorages].reverse());
    expect(api.getDefaultData()).toEqual(state);
    history.replaceState({}, '', '/');
    expect(api.getDefaultData()).toEqual({ search: 'session' });
    sessionStorage.clear();
    expect(api.getDefaultData()).toEqual({ search: 'local' });
  });

  it.each(['broken JSON', '{"search":42}'])('should skip invalid data: %s', value => {
    history.replaceState({}, '', '/?filters=' + encodeURIComponent(value));
    sessionStorage.setItem(options.localStorageKey, value);
    localStorage.setItem(options.localStorageKey, JSON.stringify(state));
    expect(renderPersist(allStorages).getDefaultData()).toEqual(state);
  });

  it('should neither read nor write disabled sources', () => {
    localStorage.setItem(options.localStorageKey, JSON.stringify(state));
    const get = vi.spyOn(Storage.prototype, 'getItem');
    const set = vi.spyOn(Storage.prototype, 'setItem');
    const replace = vi.spyOn(history, 'replaceState');
    const api = renderPersist([]);
    expect(api.getDefaultData()).toBeUndefined();
    api.setDataToStorages(state);
    expect(get).not.toHaveBeenCalled();
    expect(set).not.toHaveBeenCalled();
    expect(replace).not.toHaveBeenCalled();
  });

  it('should write a repeated source once', () => {
    const set = vi.spyOn(Storage.prototype, 'setItem');
    renderPersist(['sessionStorage', 'sessionStorage']).setDataToStorages(state);
    expect(set).toHaveBeenCalledTimes(1);
  });

  it('should continue writing when localStorage is unavailable', () => {
    const original = Storage.prototype.setItem;
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(function (this: Storage, key, value) {
      if (this === localStorage) throw new Error('quota');
      original.call(this, key, value);
    });
    const api = renderPersist(allStorages);
    expect(() => api.setDataToStorages(state)).not.toThrow();
    expect(sessionStorage[options.localStorageKey]).toBe(JSON.stringify(state));
    expect(new URL(location.href).searchParams.get(options.queryKey)).toBe(JSON.stringify(state));
  });

  it('should fall back when reading sessionStorage fails', () => {
    localStorage.setItem(options.localStorageKey, JSON.stringify(state));
    const original = Storage.prototype.getItem;
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(function (this: Storage, key) {
      if (this === sessionStorage) throw new Error('denied');
      return original.call(this, key);
    });
    expect(renderPersist(allStorages).getDefaultData()).toEqual(state);
  });

  it('should use custom serialization only for URL', () => {
    const api = renderPersist(allStorages, {
      serializer: (value: State) => value.search,
      parser: (value: string) => ({ search: value }),
    });
    api.setDataToStorages(state);
    expect(new URL(location.href).searchParams.get(options.queryKey)).toBe('orders');
    expect(localStorage.getItem(options.localStorageKey)).toBe(JSON.stringify(state));
    expect(sessionStorage.getItem(options.localStorageKey)).toBe(JSON.stringify(state));
    expect(api.getDefaultData()).toEqual(state);
  });

  it('should isolate serialization errors', () => {
    const api = renderPersist(allStorages, {
      serializer: () => {
        throw new Error('serialization');
      },
    });
    expect(() => api.setDataToStorages(state)).not.toThrow();
    expect(localStorage.getItem(options.localStorageKey)).toBe(JSON.stringify(state));
    expect(sessionStorage.getItem(options.localStorageKey)).toBe(JSON.stringify(state));
  });
});
