import { WithSupportProps } from '@ds/utils';

export type AiShimmerVariant = 'display' | 'headline' | 'title' | 'label' | 'body';

export type AiShimmerSize = 's' | 'm' | 'l';

export type AiShimmerWeight = 'regular' | 'thin' | 'mono';

export type AiShimmerFontMetrics = {
  fontSize: number;
  lineHeight: number;
  fontWeight: string;
};

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
   * Силуэт ведущей иконки как CSS `mask-image` (обычно `url("data:image/svg+xml,…")`).
   * Если задан — перед текстом рисуется иконка, залитая тем же бегущим градиентом,
   * что и текст: блеск проходит сплошной полосой «иконка → конец строки», как будто
   * иконка — часть текста. Иконка не несёт собственного цвета, она наследует
   * shimmer-покрытие (приглушённая база + блик).
   */
  iconMask?: string;
  /** Размер ведущей иконки в px (квадрат). Действует только с `iconMask`. По умолчанию `16`. */
  iconSize?: number;
  /** Дополнительный класс корневого контейнера. */
  className?: string;
}>;
