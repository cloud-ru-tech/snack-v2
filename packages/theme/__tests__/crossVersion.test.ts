import { createSharedStoreContext, providerKey, staticStore } from '@ds/context-kit';
import { createElement as h, Fragment, FunctionComponent } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ChildThemeProvider } from '../src/components/ChildThemeProvider';
import { ThemeAppearanceContextValue, useThemeAppearance } from '../src/context/appearanceContext';

// Контракт-ключ, под которым реальный @ds/theme регистрирует контекст оформления. Две копии пакета
// (v0.0.0 и v0.1.0), пока контракт = 1, дают ОДИН и тот же ключ → один React Context из globalThis.
const KEY_V1 = providerKey('theme-appearance', 1);

function appearanceStore(appearance: ThemeAppearanceContextValue['appearance']) {
  return staticStore<ThemeAppearanceContextValue>({ appearance, setAppearance: undefined });
}

/** Проба: рендерит оси из переданного хука чтения контекста в data-атрибуты. */
function makeProbe(useValue: () => ThemeAppearanceContextValue, id: string): FunctionComponent {
  return function Probe() {
    const { appearance } = useValue();

    return h('span', {
      'data-id': id,
      'data-color': appearance.colorScheme ?? '',
      'data-brand': appearance.brand ?? '',
      'data-role': appearance.brandRole ?? '',
      'data-density': appearance.density ?? '',
    });
  };
}

function readAttr(html: string, id: string, attr: string): string {
  const tag = html.match(new RegExp(`<span [^>]*data-id="${id}"[^>]*>`))?.[0] ?? '';

  return tag.match(new RegExp(`${attr}="([^"]*)"`))?.[1] ?? '';
}

describe('cross-version провайдеры оформления', () => {
  it('две копии с одним контракт-ключом делят контекст (consumer одной видит provider другой)', () => {
    // copyA ≈ @ds/theme@0.0.0, copyB ≈ @ds/theme@0.1.0 — каждая на загрузке вызывает
    // createSharedStoreContext(KEY_V1); второй вызов переиспользует контекст из globalThis-реестра.
    const copyA = createSharedStoreContext(KEY_V1, appearanceStore({}));
    const copyB = createSharedStoreContext(KEY_V1, appearanceStore({}));

    const html = renderToStaticMarkup(
      h(copyA.StoreProvider, {
        store: appearanceStore({ colorScheme: 'light' }),
        children: h(
          Fragment,
          null,
          h(makeProbe(copyA.useStoreValue, 'A-top')),
          h(copyB.StoreProvider, {
            store: appearanceStore({ colorScheme: 'dark' }),
            children: h(
              Fragment,
              null,
              // Consumer из copyA, но вложен под provider copyB:
              h(makeProbe(copyA.useStoreValue, 'A-in-B')),
              h(makeProbe(copyB.useStoreValue, 'B-in-B')),
            ),
          }),
        ),
      }),
    );

    expect(readAttr(html, 'A-top', 'data-color')).toBe('light');
    // Главное: consumer copyA читает значение provider'а copyB → контекст общий между копиями.
    expect(readAttr(html, 'A-in-B', 'data-color')).toBe('dark');
    expect(readAttr(html, 'B-in-B', 'data-color')).toBe('dark');
  });

  it('разные контракт-версии изолированы (fail-safe: дефолт, не краш)', () => {
    const copyV1 = createSharedStoreContext(KEY_V1, appearanceStore({}));
    // Несовместимый мажор формата → другой ключ → отдельный контекст.
    const copyV2 = createSharedStoreContext(
      providerKey('theme-appearance', 2),
      appearanceStore({ density: 'spacious' }),
    );

    const html = renderToStaticMarkup(
      h(copyV1.StoreProvider, {
        store: appearanceStore({ colorScheme: 'light', density: 'compact' }),
        children: h(makeProbe(copyV2.useStoreValue, 'V2-in-V1')),
      }),
    );

    // V2-consumer НЕ видит V1-provider — читает свой дефолт. Безопасно, без падения.
    expect(readAttr(html, 'V2-in-V1', 'data-density')).toBe('spacious');
    expect(readAttr(html, 'V2-in-V1', 'data-color')).toBe('');
  });

  it('реальный ChildThemeProvider каскадно мёржит поверх provider другой версии', () => {
    // "Другая версия" поднимает корневое оформление; наш ChildThemeProvider переопределяет 2 оси.
    const otherVersionRoot = createSharedStoreContext(KEY_V1, appearanceStore({}));

    const html = renderToStaticMarkup(
      h(otherVersionRoot.StoreProvider, {
        store: appearanceStore({ colorScheme: 'dark', brand: 'brandA', brandRole: 'main', density: 'compact' }),
        children: h(ChildThemeProvider, {
          value: { density: 'comfort', brand: 'brandC' },
          // useThemeAppearance — из реального @ds/theme; читает слитое значение.
          children: h(makeProbe(useThemeAppearance, 'merged')),
        }),
      }),
    );

    expect(readAttr(html, 'merged', 'data-color')).toBe('dark'); // унаследовано от чужого root
    expect(readAttr(html, 'merged', 'data-role')).toBe('main'); // унаследовано
    expect(readAttr(html, 'merged', 'data-density')).toBe('comfort'); // override нашего Child
    expect(readAttr(html, 'merged', 'data-brand')).toBe('brandC'); // override нашего Child
  });
});
