import { WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

export type AiShimmerVariant = 'display' | 'headline' | 'title' | 'label' | 'body';

export type AiShimmerSize = 's' | 'm' | 'l';

export type AiShimmerWeight = 'regular' | 'thin' | 'mono';

export type AiShimmerProps = WithSupportProps<{
  /** Текст, по которому рендерится shimmer. Поддерживает переносы строк через `\n`. */
  text: string;
  /** Вариант типографики, как в `@ds/typography`. Задаёт `data-variant` и шкалу шрифта. */
  variant?: AiShimmerVariant;
  /**
   * Размер типографики (`s`, `m`, `l`), как в `@ds/typography`.
   * Задаёт `data-size` и шкалу шрифта для текста shimmer.
   */
  size?: AiShimmerSize;
  /** Начертание шрифта, как в `@ds/typography`. Задаёт `data-weight`. */
  weight?: AiShimmerWeight;
  /**
   * Ведущая иконка узлом — любой компонент, рендерящий `<svg>`: иконка из `@ds/icons`,
   * `AiIconGiga`, `Sun` из `@ds/loader`. Узел становится маской и заливается той же волной,
   * что текст; его собственные цвета не важны, анимация внутри иконки сохраняется. Размер
   * узла должен совпадать с `iconSize`. Имеет приоритет над `iconMask`.
   */
  icon?: ReactNode;
  /**
   * Силуэт ведущей иконки как CSS `mask-image` (обычно `url("data:image/svg+xml,…")`).
   * Заливается той же волной, что текст. Используется, когда `icon` не передан.
   */
  iconMask?: string;
  /** Размер ведущей иконки в px (квадрат). Действует с `icon` или `iconMask`. По умолчанию `16`. */
  iconSize?: number;
  /**
   * Хвостовой слот справа от текста — например счётчик или длительность. Волна идёт
   * по нему той же полосой; база слота на тон светлее текста. Свой цвет слоту не задавать.
   */
  slotAfter?: ReactNode;
  /** Дополнительный класс корневого контейнера. */
  className?: string;
}>;
