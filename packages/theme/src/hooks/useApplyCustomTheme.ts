import { useMemo } from 'react';

import { buildBrandPaletteCss } from '../utils/customTheme';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export type UseApplyCustomThemeProps = {
  /** Бренд-цвет потребителя (hex `#rrggbb`). Из него генерируется бренд-палитра. */
  color: string;
  /** Применять ли кастомную палитру. При `false` `<style>` не инжектится (а ранее добавленный снимается). */
  enabled?: boolean;
  /**
   * CSS-скоуп — селектор корня поддерева (напр. `#app`, `[data-x]`). Без него правило глобальное:
   * переопределяет бренд-классы на всей странице (white-label в корне приложения — покрывает и порталы,
   * и переэмиченные внутренние обёртки). Со скоупом область ограничена его поддеревом.
   */
  scope?: string;
  /** CSP-`nonce` для инжектируемого `<style>`. */
  nonce?: string;
};

/**
 * Применяет кастомный бренд-цвет: генерирует из `color` бренд-палитру и инжектит `<style>`,
 * переопределяющий её на бренд-классах (`.sn-brandA/B/C/D/E`), а не inline на одном элементе — поэтому
 * цвет переживает переэмиты `sn-*` вложенными компонентами и доходит до порталов. Семантический слой
 * каскадит из палитры, красятся обе схемы.
 *
 * Императивная (обычно app-root) альтернатива декларативному пропу `brandColor` у `RootThemeProvider`.
 *
 * ```tsx
 * useApplyCustomTheme({ color: brand.primaryColor, enabled: Boolean(brand), nonce });
 * ```
 */
export function useApplyCustomTheme({ color, enabled = true, scope, nonce }: UseApplyCustomThemeProps): void {
  const css = useMemo(() => buildBrandPaletteCss(color, scope), [color, scope]);

  // Layout-эффект (не `useEffect`): `<style>` добавляем в `head` синхронно до пейнта, иначе первый кадр
  // успевает отрисоваться с дефолтным акцентом и виден проблеск старого цвета при смене бренд-цвета.
  /* eslint-disable @cloud-ru/ssr-safe-react/domApi -- DOM трогаем только в layout-эффекте под guard `typeof document` */
  useIsomorphicLayoutEffect(() => {
    if (!enabled || !css || typeof document === 'undefined') {
      return undefined;
    }

    const styleElement = document.createElement('style');
    if (nonce) {
      styleElement.setAttribute('nonce', nonce);
    }
    styleElement.textContent = css;
    document.head.appendChild(styleElement);

    return () => {
      styleElement.remove();
    };
  }, [css, enabled, nonce]);
  /* eslint-enable @cloud-ru/ssr-safe-react/domApi */
}
