import cn from 'classnames';
import { ReactNode, RefObject, useEffect, useMemo } from 'react';

import { useThemeAppearance } from '../../context/appearanceContext';
import { getThemeClassnameList } from '../../utils/getThemeClassnames';

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
export function ThemeScope({ rootRef, className, children }: ThemeScopeProps) {
  const { appearance } = useThemeAppearance();
  // Список токенов — источник истины: `classList.add(...)` принимает их напрямую (без `split`),
  // а wrapper-режим джойнит через `cn`. Мемо по `appearance` держит ссылку стабильной между
  // рендерами, поэтому эффект переустанавливает классы только при реальной смене темы.
  const themeClasses = useMemo(() => getThemeClassnameList(appearance), [appearance]);

  useEffect(() => {
    const element = rootRef?.current;
    if (!element) {
      return undefined;
    }

    element.classList.add(...themeClasses);

    return () => {
      element.classList.remove(...themeClasses);
    };
  }, [rootRef, themeClasses]);

  if (rootRef) {
    return <>{children}</>;
  }

  return <div className={cn(themeClasses, className)}>{children}</div>;
}
