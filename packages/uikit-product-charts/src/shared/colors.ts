import { useThemeAppearance } from '@ds/theme';
import { useLayoutEffect, ValueOf } from '@ds/utils';
import { RefObject, useState } from 'react';

import { SERIES_COLORS } from '../constants';
import { SeriesColor } from '../types';

export const OTHER_COLORS = {
  ShadowColor: 'shadowColor',
  LineColor: 'lineColor',
  TooltipBackgroundColor: 'tooltipBackgroundColor',
  TooltipColor: 'tooltipColor',
  ColumnHighlightColor: 'columnHighlightColor',
  AxisColor: 'axisColor',
  LabelColor: 'labelColor',
} as const;

export type OtherColor = ValueOf<typeof OTHER_COLORS>;
export type ColorMap = Record<SeriesColor | OtherColor, string>;

const SERIES_COLOR_LIST = Object.values(SERIES_COLORS);
const COLOR_NAMES = [...SERIES_COLOR_LIST, ...Object.values(OTHER_COLORS)];

/** Цвет серии как CSS-значение — для SVG и inline-стилей (резолвится браузером). */
export function seriesColorVar(color: SeriesColor): string {
  return `var(--chart-${color})`;
}

/** Цвет серии по индексу: палитра циклически повторяется. */
export function getSeriesColorByIndex(index: number): SeriesColor {
  return SERIES_COLOR_LIST[index % SERIES_COLOR_LIST.length];
}

/** Читает палитру графика с элемента (или любого его потомка — custom properties наследуются). */
export function readColors(element: Element): ColorMap {
  const styles = getComputedStyle(element);

  return COLOR_NAMES.reduce((colors, name) => {
    colors[name] = styles.getPropertyValue(`--chart-${name}`).trim();
    return colors;
  }, {} as ColorMap);
}

function isSameRecord(a: Record<string, string> | undefined, b: Record<string, string>): boolean {
  return a !== undefined && Object.keys(b).every(key => a[key] === b[key]);
}

/**
 * Реактивно читает набор custom properties с элемента. Перечитывает при смене оформления темы:
 * сразу (до пейнта) и ещё раз в следующем кадре — классы темы ставит layout-эффект провайдера-родителя,
 * который выполняется уже после эффектов потомков.
 */
export function useCssVars<T extends Record<string, string>>(
  ref: RefObject<Element | null>,
  read: (element: Element) => T,
): T | undefined {
  const { appearance } = useThemeAppearance();
  const [values, setValues] = useState<T>();

  useLayoutEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const update = () => {
      const next = read(element);
      setValues(prev => (isSameRecord(prev, next) ? prev : next));
    };

    update();
    const frame = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frame);
  }, [appearance, read, ref]);

  return values;
}
