import { getGlobalThemeStore, RootThemeProvider } from '@ds/theme';
import { useMemo } from 'react';

import { ensureThemeStore } from '../../lib/themeStore';

// Инициализация на уровне модуля — стор заполнен из localStorage ДО первого рендера островов.
ensureThemeStore();

/**
 * Невидимый остров: подписывает <html> на глобальный стор оформления и реэмитит на него полный
 * набор sn-* при смене темы (как RootThemeProvider rootRef={html} в next-хосте). Классы на <html>
 * до гидрации уже стоят (DocsLayout frontmatter + inline-bootstrap), здесь — живое переключение.
 */
export function ThemeHtmlApplier() {
  const htmlRef = useMemo<{ current: HTMLElement | null }>(
    () => ({ current: typeof document === 'undefined' ? null : document.documentElement }),
    [],
  );
  return (
    <RootThemeProvider store={getGlobalThemeStore().store} rootRef={htmlRef}>
      {null}
    </RootThemeProvider>
  );
}
