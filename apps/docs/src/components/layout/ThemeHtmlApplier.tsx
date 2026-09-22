import { RootThemeProvider, useThemeAppearance } from '@ds/theme';
import { useMemo } from 'react';

import { CHROME_APPEARANCE } from '../../lib/docsChrome';
import { ensureThemeStore } from '../../lib/themeStore';

// Инициализация на уровне модуля — стор заполнен из localStorage ДО первого рендера островов.
ensureThemeStore();

/**
 * Невидимый остров: подписывает <html> на глобальный стор оформления и реэмитит на него полный
 * набор sn-* при смене темы (как RootThemeProvider rootRef={html} в next-хосте). Классы на <html>
 * до гидрации уже стоят (DocsLayout frontmatter + inline-bootstrap), здесь — живое переключение.
 * С настроек на `<html>` попадает только цветовая схема: бренд, плотность и платформа обвязки фиксированы
 * (CHROME_APPEARANCE), а выбранные значения применяются к примерам (PreviewThemeApplier).
 */
export function ThemeHtmlApplier() {
  const htmlRef = useMemo<{ current: HTMLElement | null }>(
    () => ({ current: typeof document === 'undefined' ? null : document.documentElement }),
    [],
  );
  // Контекст по умолчанию — глобальный стор оформления, поэтому чтение реактивно к смене темы.
  const { appearance } = useThemeAppearance();

  return (
    <RootThemeProvider value={{ colorScheme: appearance.colorScheme, ...CHROME_APPEARANCE }} rootRef={htmlRef}>
      {null}
    </RootThemeProvider>
  );
}
