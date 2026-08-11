// @vitest-environment jsdom
import { act, createElement as h, ReactNode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { afterEach, describe, expect, it } from 'vitest';

import { RootThemeProvider } from '../src/components/RootThemeProvider';
import { useApplyCustomTheme } from '../src/hooks/useApplyCustomTheme';

(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;

const BRAND_VAR = '--sn-brand-color-primary-55';
const BRAND_SELECTOR = ':is(.sn-brandA,.sn-brandB,.sn-brandC,.sn-brandD)';

/** Разворачивает nullable без non-null assertion (`!` запрещён линтером). */
function nn<T>(value: T | null | undefined): T {
  if (value == null) {
    throw new Error('unexpected nullish value');
  }

  return value;
}

const roots: Root[] = [];

function mount(node: ReactNode): HTMLElement {
  const container = document.createElement('div');
  document.body.appendChild(container);
  const root = createRoot(container);
  roots.push(root);
  act(() => root.render(node));

  return container;
}

function injectedStyle(): HTMLStyleElement | undefined {
  return [...document.head.querySelectorAll('style')].find(style => style.textContent?.includes(BRAND_VAR));
}

afterEach(() => {
  while (roots.length) {
    const root = roots.pop();
    act(() => root?.unmount());
  }
  document.head.querySelectorAll('style').forEach(style => {
    if (style.textContent?.includes(BRAND_VAR)) {
      style.remove();
    }
  });
});

describe('RootThemeProvider brandColor — scoped <style> на бренд-классах', () => {
  it('wrapper-режим: рендерит scoped-правило на бренд-классы + scope-атрибут (не inline)', () => {
    const container = mount(
      h(
        RootThemeProvider,
        { value: { colorScheme: 'light', brand: 'brandA' }, brandColor: '#ff7a00' },
        h('span', null, 'x'),
      ),
    );
    const wrapper = nn(container.querySelector('div'));
    const scopeId = wrapper.getAttribute('data-ds-brand-scope');

    expect(scopeId).toBeTruthy();
    expect(wrapper.className).toContain('sn-brandA');

    const css = nn(container.querySelector('style')).textContent ?? '';
    expect(css).toContain(BRAND_SELECTOR);
    expect(css).toContain(`[data-ds-brand-scope="${scopeId}"]`);
    expect(css).toContain(`${BRAND_VAR}:#ff7a00`);
    expect(css).toContain('--sn-brand-color-primary-transparent:#ff7a0024');
    expect(css).toContain('--sn-brand-color-activated-default-background:#ff7a0026');
    // Вариант A ушёл от inline-переменных.
    expect(wrapper.style.getPropertyValue(BRAND_VAR)).toBe('');
  });

  it('невалидный brandColor → без <style> и без scope-атрибута', () => {
    const container = mount(
      h(RootThemeProvider, { value: { colorScheme: 'light' }, brandColor: 'nope' }, h('span', null, 'x')),
    );
    const wrapper = nn(container.querySelector('div'));

    expect(wrapper.getAttribute('data-ds-brand-scope')).toBeNull();
    expect(container.querySelector('style')).toBeNull();
  });

  it('rootRef-режим: scope-атрибут на внешнем элементе + <style>, снимается при размонтировании', () => {
    const external = document.createElement('div');
    document.body.appendChild(external);
    const rootRef = { current: external };

    const container = document.createElement('div');
    const root = createRoot(container);
    act(() =>
      root.render(
        h(RootThemeProvider, { value: { colorScheme: 'light' }, rootRef, brandColor: '#8a2be2' }, h('span', null, 'x')),
      ),
    );

    const scopeId = external.getAttribute('data-ds-brand-scope');
    expect(scopeId).toBeTruthy();
    expect(external.classList.contains('sn-light')).toBe(true);

    const css = nn(container.querySelector('style')).textContent ?? '';
    expect(css).toContain(`[data-ds-brand-scope="${scopeId}"]`);
    expect(css).toContain(`${BRAND_VAR}:#8a2be2`);

    act(() => root.unmount());
    expect(external.getAttribute('data-ds-brand-scope')).toBeNull();
  });
});

function HookProbe({ color, enabled, scope }: { color: string; enabled?: boolean; scope?: string }): null {
  useApplyCustomTheme({ color, enabled, scope });

  return null;
}

describe('useApplyCustomTheme', () => {
  it('глобально (без scope): инжектит правило на бренд-классы и снимает при размонтировании', () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => root.render(h(HookProbe, { color: '#ff7a00' })));

    const css = nn(injectedStyle()).textContent ?? '';
    expect(css.startsWith(`${BRAND_SELECTOR}{`)).toBe(true);
    expect(css).toContain(`${BRAND_VAR}:#ff7a00`);
    expect(css).not.toContain('data-ds-brand-scope');

    act(() => root.unmount());
    expect(injectedStyle()).toBeUndefined();
  });

  it('со scope: правило ограничено селектором скоупа (потомки + сам корень)', () => {
    const container = document.createElement('div');
    const root = createRoot(container);
    act(() => root.render(h(HookProbe, { color: '#ff7a00', scope: '#app' })));

    const css = nn(injectedStyle()).textContent ?? '';
    expect(css).toContain(`#app ${BRAND_SELECTOR}`);
    expect(css).toContain(`#app${BRAND_SELECTOR}`);

    act(() => root.unmount());
  });

  it('enabled=false и невалидный цвет ничего не инжектят', () => {
    mount(h(HookProbe, { color: '#ff7a00', enabled: false }));
    expect(injectedStyle()).toBeUndefined();

    mount(h(HookProbe, { color: 'bad-color' }));
    expect(injectedStyle()).toBeUndefined();
  });
});
