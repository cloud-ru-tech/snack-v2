import { getThemeClassnameList, useThemeAppearance } from '@ds/theme';
import { useEffect, useMemo } from 'react';

import { ensureThemeStore } from '../../lib/themeStore';

ensureThemeStore();

const PREVIEW_SELECTOR = '[data-docs-preview]';

const appliedClasses = new WeakMap<Element, string[]>();

function applyToPreviews(classes: string[]): void {
  document.querySelectorAll(PREVIEW_SELECTOR).forEach(element => {
    const previous = appliedClasses.get(element);
    if (previous) element.classList.remove(...previous);
    element.classList.add(...classes);
    appliedClasses.set(element, classes);
  });
}

/**
 * Невидимый остров: ставит на SSR-превью примеров и корень их порталов (`data-docs-preview`) полный набор
 * `sn-*` из настроек доки. Обвязка доки держит фиксированное оформление, поэтому примеры получают его здесь.
 */
export function PreviewThemeApplier() {
  const { appearance } = useThemeAppearance();
  const classes = useMemo(() => getThemeClassnameList(appearance), [appearance]);

  useEffect(() => {
    const apply = () => applyToPreviews(classes);
    apply();
    document.addEventListener('astro:page-load', apply);
    return () => document.removeEventListener('astro:page-load', apply);
  }, [classes]);

  return null;
}
