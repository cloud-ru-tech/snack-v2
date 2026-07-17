import { ReactNode } from 'react';

import { createPairedThemedIcon } from './createPairedThemedIcon';
import { createStandaloneIcon } from './createStandaloneIcon';

export type ThemedIconVariant = {
  /** Собственная ширина исходного SVG (у wordmark-логотипов не равна высоте). */
  nativeWidth: number;
  /** Собственная высота исходного SVG. */
  nativeHeight: number;
  /** Содержимое иконки — дети корневого `<svg>` исходника (без обёртки `<svg>`). */
  children: ReactNode;
  /**
   * `fill` корневого `<svg>` исходника: пути без собственного `fill` наследуют его.
   * По умолчанию `'none'`.
   */
  rootFill?: string;
};

export type ThemedIconConfig = {
  /** Суффикс data-test-id (итоговые атрибуты — `icon${testId}-light` / `icon${testId}-dark`). */
  testId: string;
  /** Вариант для светлой темы. */
  light: ThemedIconVariant;
  /** Вариант для тёмной темы. */
  dark: ThemedIconVariant;
  /** Дефолт пропа `size`. */
  defaultSize?: number;
};

/**
 * Публичная фабрика цветной иконки, переключающей арт по DS-теме (например, логотип компании
 * в светлом и тёмном исполнении). Потребитель отдаёт два готовых SVG (Light и Dark), получает
 * компонент, который ведёт себя как штатная иконка пакета — проп `size`, сохранение
 * соотношения сторон, `data-test-id`. Внутри собирает две standalone-части (с сохранением
 * исходных цветов) и оборачивает их в тематический свитч.
 *
 * ```tsx
 * const AcmeLogo = createThemedIcon({
 *   testId: 'acme-logo',
 *   light: { nativeWidth: 100, nativeHeight: 24, children: <path … /> },
 *   dark: { nativeWidth: 100, nativeHeight: 24, children: <path … /> },
 * });
 * // <AcmeLogo size={32} />
 * ```
 */
export function createThemedIcon({ testId, light, dark, defaultSize }: ThemedIconConfig) {
  const Light = createStandaloneIcon({
    testId: `${testId}-light`,
    nativeWidth: light.nativeWidth,
    nativeHeight: light.nativeHeight,
    rootFill: light.rootFill ?? 'none',
    preserveColor: true,
    children: light.children,
    defaultSize,
  });

  const Dark = createStandaloneIcon({
    testId: `${testId}-dark`,
    nativeWidth: dark.nativeWidth,
    nativeHeight: dark.nativeHeight,
    rootFill: dark.rootFill ?? 'none',
    preserveColor: true,
    children: dark.children,
    defaultSize,
  });

  return createPairedThemedIcon({ light: Light, dark: Dark });
}
