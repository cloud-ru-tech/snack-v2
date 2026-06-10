import cn from 'classnames';
import { CSSProperties, ElementType, useMemo } from 'react';

import { ELEMENT_SIZE } from './constants';
import styles from './styles.module.scss';
import { ElementSize, FlexProps, Wrap } from './types';

const SIZE_KEYWORDS = Object.values(ELEMENT_SIZE) as string[];

/** Keyword-размер (`ElementSize`) маппится через `data-*` + SCSS; всё прочее — инлайн. */
function isElementSize(value: number | string): value is ElementSize {
  return typeof value === 'string' && SIZE_KEYWORDS.includes(value);
}

/**
 * Контейнер для flex-раскладки. Управляет направлением (`direction`),
 * выравниванием (`justify` / `align` / `alignContent`), переносом (`wrap`),
 * переполнением (`overflow`) и отступами между детьми (`gap` / `columnGap` /
 * `rowGap`). Полиморфен через `as`.
 *
 * Оси с закрытым набором значений, токены отступов и keyword-размеры применяются
 * через `data-*` атрибуты (маппинг в SCSS), а не инлайн-стилем. Инлайн-`style`
 * остаётся только для произвольных `width` / `height` / `flex` и пользовательского
 * `style`.
 *
 * @example
 * ```tsx
 * <Flex gap='2m' align='center' justify='space-between'>
 *   <Button label='Отмена' />
 *   <Button label='Сохранить' />
 * </Flex>
 *
 * <Flex direction='column' gap='050m'>
 *   <span>Строка 1</span>
 *   <span>Строка 2</span>
 * </Flex>
 * ```
 */
export function Flex<T extends ElementType = 'div'>({
  children,
  direction,
  justify,
  align,
  alignContent,
  wrap,
  gap,
  columnGap,
  rowGap,
  overflow,
  overflowX,
  overflowY,
  flex,
  width,
  height,
  fullWidth = false,
  className,
  style,
  as,
  innerRef,
  ...rest
}: FlexProps<T>) {
  const Component: ElementType = as ?? 'div';

  let resolvedWrap: Wrap | undefined;
  if (typeof wrap === 'boolean') {
    resolvedWrap = wrap ? 'wrap' : 'nowrap';
  } else {
    resolvedWrap = wrap;
  }

  const dataProps = useMemo(
    () => ({
      'data-direction': direction,
      'data-justify': justify,
      'data-align': align,
      'data-align-content': alignContent,
      'data-wrap': resolvedWrap,
      'data-overflow': overflow,
      'data-overflow-x': overflowX,
      'data-overflow-y': overflowY,
      'data-gap': gap,
      'data-column-gap': columnGap,
      'data-row-gap': rowGap,
      'data-width': width !== undefined && isElementSize(width) ? width : undefined,
      'data-height': height !== undefined && isElementSize(height) ? height : undefined,
      'data-flex': flex !== undefined && isElementSize(flex) ? flex : undefined,
      'data-full-width': fullWidth || undefined,
    }),
    [
      direction,
      justify,
      align,
      alignContent,
      resolvedWrap,
      overflow,
      overflowX,
      overflowY,
      gap,
      columnGap,
      rowGap,
      width,
      height,
      flex,
      fullWidth,
    ],
  );

  // Инлайн-стиль — только произвольные (не keyword) размеры + пользовательский style.
  const mergedStyle = useMemo<CSSProperties>(
    () => ({
      width: width !== undefined && !isElementSize(width) ? width : undefined,
      height: height !== undefined && !isElementSize(height) ? height : undefined,
      flex: flex !== undefined && !isElementSize(flex) ? flex : undefined,
      ...style,
    }),
    [width, height, flex, style],
  );

  const hasInlineStyle = Object.values(mergedStyle).some(value => value !== undefined);

  return (
    <Component
      ref={innerRef}
      className={cn(styles.root, className)}
      style={hasInlineStyle ? mergedStyle : undefined}
      {...dataProps}
      {...rest}
    >
      {children}
    </Component>
  );
}
