import { AdaptiveProvider, getGlobalAdaptiveStore, LAYOUT_TYPE } from '@ds/adaptive';
import { PortalContextProvider } from '@ds/portal-context';
import { ChildThemeProvider } from '@ds/theme';
import type { ComponentProps, ComponentType, ReactNode } from 'react';

import { CHROME_APPEARANCE, CHROME_PORTAL_ROOT_ID } from '../../lib/docsChrome';

// Провайдер без элемента: оформление только в контексте, классы хрому даёт `<html>` (ThemeHtmlApplier).
const NO_ELEMENT = { current: null };

const chromePortalRoot = {
  get current() {
    return typeof document === 'undefined' ? null : document.getElementById(CHROME_PORTAL_ROOT_ID);
  },
};

/**
 * Обвязка доки не зависит от настроек примеров: фиксированные бренд/плотность/платформа, desktop-раскладка
 * и собственный корень порталов. Переопределение действует на компоненты хрома и их оверлеи.
 */
export function DocsChromeScope({ children }: { children: ReactNode }) {
  return (
    <AdaptiveProvider layoutType={LAYOUT_TYPE.Desktop}>
      <PortalContextProvider root={chromePortalRoot}>
        <ChildThemeProvider value={CHROME_APPEARANCE} rootRef={NO_ELEMENT}>
          {children}
        </ChildThemeProvider>
      </PortalContextProvider>
    </AdaptiveProvider>
  );
}

/** HOC для островов хрома: оборачивает компонент в `DocsChromeScope`. */
export function withDocsChrome<P extends object>(Component: ComponentType<P>): ComponentType<P> {
  function DocsChromeComponent(props: P) {
    return (
      <DocsChromeScope>
        <Component {...props} />
      </DocsChromeScope>
    );
  }
  DocsChromeComponent.displayName = `withDocsChrome(${Component.displayName ?? Component.name})`;
  return DocsChromeComponent;
}

// Тип выводится из value-импорта: type-импорт из @ds/* в Astro-островах ломает загрузку модуля.
type DocsPreviewScopeProps = {
  /** Оформление примера из настроек доки. */
  appearance: ComponentProps<typeof ChildThemeProvider>['value'];
  /** Класс обёртки ChildThemeProvider (обычно `display: contents`). */
  className?: string;
  children: ReactNode;
};

/**
 * Пример внутри острова хрома: возвращает глобальную раскладку `@ds/adaptive`, глобальный корень порталов
 * и полный набор `sn-*` из настроек — обратная сторона `DocsChromeScope`.
 */
export function DocsPreviewScope({ appearance, className, children }: DocsPreviewScopeProps) {
  return (
    <AdaptiveProvider store={getGlobalAdaptiveStore().store}>
      <PortalContextProvider>
        <ChildThemeProvider value={appearance} className={className}>
          {children}
        </ChildThemeProvider>
      </PortalContextProvider>
    </AdaptiveProvider>
  );
}
