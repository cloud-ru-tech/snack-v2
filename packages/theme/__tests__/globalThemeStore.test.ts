import { describe, expect, it } from 'vitest';

import { getGlobalThemeStore } from '../src/store/globalStore';

describe('getGlobalThemeStore', () => {
  it('синглтон по globalThis (Symbol.for)', () => {
    expect(getGlobalThemeStore()).toBe(getGlobalThemeStore());
  });

  it('setAppearance мёржит патч, getAppearance отражает', () => {
    const store = getGlobalThemeStore();

    store.setAppearance({ colorScheme: 'light', brand: 'brandA', density: 'compact' });
    store.setAppearance({ density: 'comfort' });

    expect(store.getAppearance()).toMatchObject({ colorScheme: 'light', brand: 'brandA', density: 'comfort' });
  });

  it('снапшот стабилен по ссылке без изменений и меняется при смене оси', () => {
    const store = getGlobalThemeStore();
    store.setAppearance({ colorScheme: 'light' });

    const before = store.store.getSnapshot();
    let notified = 0;
    const unsubscribe = store.store.subscribe(() => {
      notified += 1;
    });

    store.setAppearance({ colorScheme: 'light' }); // no-op
    expect(notified).toBe(0);
    expect(store.store.getSnapshot()).toBe(before);

    store.setAppearance({ colorScheme: 'dark' }); // изменение
    expect(notified).toBe(1);
    expect(store.store.getSnapshot()).not.toBe(before);
    expect(store.store.getSnapshot().appearance.colorScheme).toBe('dark');

    unsubscribe();
  });

  it('getServerSnapshot — пустое оформление без сеттера (SSR-safe)', () => {
    expect(getGlobalThemeStore().store.getServerSnapshot?.()).toEqual({ appearance: {}, setAppearance: undefined });
  });
});
