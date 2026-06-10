import { ValueOf } from '@ds/utils';
import { ComponentPropsWithoutRef, ComponentPropsWithRef, CSSProperties, ElementType, ReactNode } from 'react';

import { ELEMENT_SIZE, GAP_SIZE } from './constants';

/** Направление главной оси (`flex-direction`). */
export type Direction = Extract<CSSProperties['flexDirection'], 'column' | 'column-reverse' | 'row' | 'row-reverse'>;
/** Выравнивание по главной оси (`justify-content`). */
export type Justify = Extract<
  CSSProperties['justifyContent'],
  'space-around' | 'space-between' | 'space-evenly' | 'stretch' | 'center' | 'flex-end' | 'flex-start'
>;
/** Выравнивание по поперечной оси (`align-items`). */
export type Align = Extract<
  CSSProperties['alignItems'],
  'center' | 'flex-end' | 'flex-start' | 'self-end' | 'self-start' | 'baseline' | 'stretch'
>;
/** Выравнивание строк многострочного flex (`align-content`). */
export type AlignContent = Extract<
  CSSProperties['alignContent'],
  'space-around' | 'space-between' | 'space-evenly' | 'stretch' | 'center' | 'flex-end' | 'flex-start' | 'baseline'
>;
/** Перенос детей (`flex-wrap`). */
export type Wrap = Extract<CSSProperties['flexWrap'], 'nowrap' | 'wrap' | 'wrap-reverse'>;
/** Поведение переполнения (`overflow` / `overflow-x` / `overflow-y`). */
export type Overflow = Extract<CSSProperties['overflow'], 'visible' | 'hidden' | 'clip' | 'scroll' | 'auto'>;
/** Keyword-значения размеров (`width` / `height`), см. `ELEMENT_SIZE`. */
export type ElementSize = ValueOf<typeof ELEMENT_SIZE>;
/** Размер контейнера: keyword, число (px) или CSS-строка (`'50%'`, `'200px'`). */
export type Size = ElementSize | number | (string & {});

/** Токен модульной шкалы отступов (см. `GAP_SIZE`). Единственно допустимое значение `gap`. */
export type GapToken = ValueOf<typeof GAP_SIZE>;

export type BaseFlexProps = {
  /** Содержимое контейнера. */
  children?: ReactNode;
  /** Направление главной оси (`flex-direction`). По умолчанию `row`. */
  direction?: Direction;
  /** Выравнивание по главной оси (`justify-content`). */
  justify?: Justify;
  /** Выравнивание по поперечной оси (`align-items`). */
  align?: Align;
  /** Выравнивание строк многострочного flex (`align-content`, работает при `wrap`). */
  alignContent?: AlignContent;
  /**
   * Перенос детей (`flex-wrap`). `true` → `wrap`, `false` → `nowrap`,
   * либо явное значение `nowrap` | `wrap` | `wrap-reverse`.
   */
  wrap?: boolean | Wrap;
  /**
   * Отступ между детьми (CSS `gap`). Только токен модульной шкалы (привязан к
   * dimension-токенам DS).
   * <pre>
   * 025m - 2px
   * 050m - 4px
   * 1m - 8px
   * 2m - 16px
   * 3m - 24px
   * 4m - 32px
   * 5m - 40px
   * 6m - 48px
   * 7m - 56px
   * 8m - 64px
   * 9m - 72px
   * 10m - 80px
   * </pre>
   */
  gap?: GapToken;
  /** Отступ между колонками (CSS `column-gap`). Только токен модульной шкалы (см. `gap`). */
  columnGap?: GapToken;
  /** Отступ между строками (CSS `row-gap`). Только токен модульной шкалы (см. `gap`). */
  rowGap?: GapToken;
  /** Переполнение по обеим осям (`overflow`). */
  overflow?: Overflow;
  /** Переполнение по горизонтали (`overflow-x`). */
  overflowX?: Overflow;
  /** Переполнение по вертикали (`overflow-y`). */
  overflowY?: Overflow;
  /**
   * Значение CSS-свойства `flex`. Keyword (`ElementSize` — `auto` / `max-content` / … →
   * через `data-*`), число (`flex-grow`) или shorthand-строка (`'1 1 auto'`).
   */
  flex?: Size;
  /** Ширина контейнера. Keyword (`ElementSize`), число (px) или CSS-строка (`'50%'`). */
  width?: Size;
  /** Высота контейнера. Keyword (`ElementSize`), число (px) или CSS-строка (`'50%'`). */
  height?: Size;
  /** Растянуть контейнер на всю ширину родителя (`width: 100%`). */
  fullWidth?: boolean;
  /** Дополнительный класс. */
  className?: string;
  /** Инлайн-стили, домешиваются последними и перекрывают `width`/`height`/`flex`. */
  style?: CSSProperties;
  /** Стабильный идентификатор для e2e/tests. */
  'data-test-id'?: string;
};

export type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>['ref'];

/**
 * Полиморфный flex-контейнер. По умолчанию рендерится в `div`; через `as`
 * можно отрендерить любой тег или компонент (`as="section"`, `as={Link}`).
 */
export type FlexProps<T extends ElementType = 'div'> = BaseFlexProps & {
  /** Элемент или компонент для рендера. По умолчанию `div`. */
  as?: T;
  /** Ref на реальный DOM-элемент/инстанс, который рендерится через `as`. */
  innerRef?: PolymorphicRef<T>;
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseFlexProps | 'as' | 'ref'>;
