import { IconPredefinedProps } from '@ds/icon-predefined';
import { PromoTagProps } from '@ds/promo-tag';
import { ToggleGroupProps as ToggleGroupPropsDs } from '@ds/toggles';
import { ValueOf, WithSupportProps } from '@ds/utils';
import { ReactNode } from 'react';

import { GAP, ORIENTATION, SIZE } from './constants';

export type Size = ValueOf<typeof SIZE>;
export type Orientation = ValueOf<typeof ORIENTATION>;
export type Gap = ValueOf<typeof GAP>;

export type EmblemPicture = {
  /** URL картинки-эмблемы */
  src: string;
  /** Альтернативный текст картинки */
  alt: string;
};

export type EmblemIcon = Pick<IconPredefinedProps, 'icon' | 'appearance' | 'background' | 'shape'>;

/** Эмблема карточки: параметры встроенного `IconPredefined` либо картинка (`src` / `alt`). */
export type Emblem = EmblemPicture | EmblemIcon;

export type ToggleCardProps = WithSupportProps<{
  /** Заголовок карточки */
  title: string;
  /** Значение карточки в контексте `ToggleGroup` */
  value: string;
  /** Основной текст под заголовком */
  description?: string;
  /**
   * Ведущая эмблема. Передаются только параметры — сам `IconPredefined`
   * встроен в компонент; `size` эмблемы выводится из `size` карточки.
   */
  emblem?: Emblem;
  /** Промо-бейдж в правом верхнем углу карточки */
  promoBadge?: Pick<PromoTagProps, 'label' | 'appearance'> | string;
  /** Размер карточки — масштабирует padding, gap, типографику и `radius` контейнера `@ds/card` */
  size?: Size;
  /**
   * Максимальное число строк до обрезки.
   * @default '{ title: 1; description: 2; }'
   */
  truncate?: {
    /** Максимум строк заголовка */
    title?: number;
    /** Максимум строк содержимого */
    description?: number;
  };
  /** Заблокированное состояние: интерактив отключён */
  disabled?: boolean;
  /** CSS-класс корневого элемента */
  className?: string;
}>;

export type ToggleGroupProps = ToggleGroupPropsDs &
  WithSupportProps<{
    /** Дочерние карточки `ToggleCard` */
    children?: ReactNode;
    /** Направление раскладки */
    orientation?: Orientation;
    /** Расстояние между карточками */
    gap?: Gap;
    /** Минимальная ширина карточки для горизонтальной раскладки (px) */
    breakpoint?: number;
    /** CSS-класс корневого элемента */
    className?: string;
  }>;
