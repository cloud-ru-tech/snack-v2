/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- Tests run in jsdom. */
import { act, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { usePersistState } from '../src/components/Toolbar/hooks/usePersistState/usePersistState';
import { PersistedFilterState, ToolbarPersistConfig } from '../src/components/Toolbar/types';

type Filters = { status?: string };
type State = PersistedFilterState<Filters>;
const saved: State = {
  filter: { status: 'active' },
  search: 'orders',
  pagination: { limit: 20, offset: 40 },
  ordering: [{ field: 'name', direction: '+' }],
};
let root: Root;
let setState: (state: State) => void;
let current: State;
const onLoad = vi.fn();

function Probe({ config }: { config: ToolbarPersistConfig<Filters> }) {
  const [state, update] = useState<State>({ filter: {}, search: '' });
  current = state;
  setState = update;
  usePersistState({
    persist: {
      ...config,
      state,
      onLoad: value => {
        onLoad(value);
        update(value);
      },
    },
    filter: state.filter,
    search: state.search,
  });
  return null;
}
const config: ToolbarPersistConfig<Filters> = {
  id: 'orders',
  filterQueryKey: 'filters',
  storages: ['sessionStorage'],
};
beforeEach(() => {
  vi.stubGlobal('IS_REACT_ACT_ENVIRONMENT', true);
  localStorage.clear();
  sessionStorage.clear();
  history.replaceState({}, '', '/');
  onLoad.mockClear();
  root = createRoot(document.createElement('div'));
});
afterEach(() => {
  act(() => root.unmount());
  vi.unstubAllGlobals();
});

describe('usePersistState', () => {
  it('should hydrate all state before persisting and hydrate again after remount', () => {
    sessionStorage.setItem('orders_filter', JSON.stringify(saved));
    act(() => root.render(<Probe config={config} />));
    expect(current).toEqual(saved);
    expect(onLoad).toHaveBeenCalledTimes(1);
    expect(sessionStorage.getItem('orders_filter')).toBe(JSON.stringify(saved));
    act(() => root.render(null));
    act(() => root.render(<Probe config={config} />));
    expect(current).toEqual(saved);
    expect(onLoad).toHaveBeenCalledTimes(2);
  });

  it('should persist reset state without deleting other state or disabled storage', () => {
    sessionStorage.setItem('orders_filter', JSON.stringify(saved));
    localStorage.setItem('orders_filter', 'untouched');
    act(() => root.render(<Probe config={config} />));
    const reset = { ...saved, filter: {}, search: '' };
    act(() => setState(reset));
    expect(sessionStorage.getItem('orders_filter')).toBe(JSON.stringify(reset));
    expect(localStorage.getItem('orders_filter')).toBe('untouched');
  });

  it.each([
    { ...config, id: undefined },
    { ...config, filterQueryKey: undefined },
    { ...config, storages: [] },
  ])('should disable hydration and writes with configuration %j', disabled => {
    sessionStorage.setItem('orders_filter', JSON.stringify(saved));
    act(() => root.render(<Probe config={disabled} />));
    act(() => setState({ search: 'changed' }));
    expect(onLoad).not.toHaveBeenCalled();
    expect(sessionStorage.getItem('orders_filter')).toBe(JSON.stringify(saved));
  });
});
