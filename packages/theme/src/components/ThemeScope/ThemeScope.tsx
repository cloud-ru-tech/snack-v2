import cn from 'classnames';
import { ReactNode, RefObject, useId, useMemo } from 'react';

import { useThemeAppearance } from '../../context/appearanceContext';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { buildBrandPaletteCss } from '../../utils/customTheme';
import { getThemeClassnameList } from '../../utils/getThemeClassnames';

// Атрибут-маркер поддерева для scope кастомной палитры. Правило нацеливается на бренд-классы внутри
// этого маркера (см. `buildBrandPaletteCss`), поэтому переживает переэмиты `sn-*` вложенными обёртками.
const BRAND_SCOPE_ATTR = 'data-ds-brand-scope';

export type ThemeScopeProps = {
  /**
   * Внешний элемент, на который ставится полный набор `sn-*` (обычно `<html>`/`<body>` для корня).
   * Если не задан — `ThemeScope` рендерит собственный wrapper `<div>` с этим набором.
   */
  rootRef?: RefObject<HTMLElement | null>;
  /**
   * Дополнительный класс на wrapper-`<div>` (паддинги/фон вокруг темы). Действует только в wrapper-режиме;
   * при `rootRef` игнорируется (внешним элементом владеет потребитель).
   */
  className?: string;
  /**
   * Кастомный бренд-цвет (hex). Инжектит scoped `<style>`, переопределяющий бренд-палитру на бренд-классах
   * поддерева. В отличие от inline-переменных, правило на бренд-классе переживает переэмиты `sn-*` внутри
   * (Table/Stepper и т.п.), поэтому кастомный цвет доходит до вложенных компонентов.
   */
  brandColor?: string;
  /** CSP-`nonce` для инжектируемого `<style>`. */
  nonce?: string;
  children: ReactNode;
};

/**
 * Внутренний помощник Root/Child-провайдеров: читает ближайшее оформление (= собственный стор
 * провайдера, под которым отрендерен) и эмитит полный набор `sn-*`. Реактивен — при смене темы
 * пересобирает и переустанавливает классы.
 *
 * - `rootRef` задан → классы добавляются на внешний элемент через эффект (без лишнего DOM-узла);
 *   при смене набора старые классы снимаются, новые ставятся.
 * - `rootRef` не задан → классы навешиваются на wrapper `<div>` (+ `className` потребителя).
 */
export function ThemeScope({ rootRef, className, brandColor, nonce, children }: ThemeScopeProps) {
  const { appearance } = useThemeAppearance();
  // Список токенов — источник истины: `classList.add(...)` принимает их напрямую (без `split`),
  // а wrapper-режим джойнит через `cn`. Мемо по `appearance` держит ссылку стабильной между
  // рендерами, поэтому эффект переустанавливает классы только при реальной смене темы.
  const themeClasses = useMemo(() => getThemeClassnameList(appearance), [appearance]);

  const scopeId = useId();
  const brandCss = useMemo(
    () => (brandColor ? buildBrandPaletteCss(brandColor, `[${BRAND_SCOPE_ATTR}="${scopeId}"]`) : null),
    [brandColor, scopeId],
  );

  // Layout-эффект (не `useEffect`): классы/scope-маркер ставим на внешний элемент синхронно до пейнта,
  // иначе первый кадр рендерится без набора `sn-*` (и без scoped бренд-правила) — видно моргание темы.
  useIsomorphicLayoutEffect(() => {
    const element = rootRef?.current;
    if (!element) {
      return undefined;
    }

    element.classList.add(...themeClasses);

    return () => {
      element.classList.remove(...themeClasses);
    };
  }, [rootRef, themeClasses]);

  // В rootRef-режиме scope-маркер ставим на внешний элемент, чтобы scoped-правило достало его поддерево
  // (в wrapper-режиме маркер — атрибут `div`а ниже).
  useIsomorphicLayoutEffect(() => {
    const element = rootRef?.current;
    if (!element || !brandCss) {
      return undefined;
    }

    element.setAttribute(BRAND_SCOPE_ATTR, scopeId);

    return () => {
      element.removeAttribute(BRAND_SCOPE_ATTR);
    };
  }, [rootRef, brandCss, scopeId]);

  // `<style>` рендерится в дерево (React управляет монтированием/размонтированием, без ручной инъекции).
  // В body он не имеет визуального бокса — только применяет правило по scoped-селектору.
  const styleTag = brandCss ? <style nonce={nonce}>{brandCss}</style> : null;

  if (rootRef) {
    return (
      <>
        {styleTag}
        {children}
      </>
    );
  }

  return (
    <div className={cn(themeClasses, className)} data-ds-brand-scope={brandCss ? scopeId : undefined}>
      {styleTag}
      {children}
    </div>
  );
}
