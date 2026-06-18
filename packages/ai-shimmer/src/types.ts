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
  /** Дополнительный класс корневого контейнера. */
  className?: string;
}>;
