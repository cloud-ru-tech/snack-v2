import { forwardRef, ReactNode, Ref } from 'react';

import { ISvgIconProps } from '../types';

type StandaloneIconConfig = {
  /** Суффикс data-test-id (итоговый атрибут — `icon${testId}`). */
  testId: string;
  /** Собственная ширина исходного SVG (у wordmark-логотипов не равна высоте). */
  nativeWidth: number;
  /** Собственная высота исходного SVG. */
  nativeHeight: number;
  /**
   * Сохранять исходные цвета SVG (flags/logos/брендовые иконки). По умолчанию иконка
   * монохромная и наследует цвет через `fill='currentColor'`.
   */
  preserveColor?: boolean;
  /**
   * `fill` корневого `<svg>` исходника — важен при `preserveColor`: пути без собственного
   * `fill` (например, stroke-контуры) наследуют его; без проброса они получили бы
   * SVG-дефолт `fill=black`.
   */
  rootFill?: string;
  /** Содержимое иконки — дети корневого `<svg>` исходника. */
  children: ReactNode;
  /** Дефолт пропа `size`. */
  defaultSize?: number;
};

/**
 * Фабрика standalone-иконки (инлайн-SVG без спрайта). Вся логика рендера живёт здесь,
 * в одном экземпляре на пакет; сгенерированные файлы иконок передают только данные.
 *
 * Не-квадратные иконки (wordmark-логотипы) масштабируются по высоте: ширина следует
 * нативному соотношению сторон.
 */
export function createStandaloneIcon({
  testId,
  nativeWidth,
  nativeHeight,
  preserveColor,
  rootFill,
  children,
  defaultSize = 24,
}: StandaloneIconConfig) {
  return forwardRef(({ size = defaultSize, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
    const isCustomSize = typeof size === 'number';
    const sizePx = isCustomSize ? size : nativeHeight;
    const widthPx = isCustomSize ? Math.round((size * nativeWidth) / nativeHeight) : nativeWidth;

    const style = isCustomSize ? { ...props.style, width: widthPx, height: sizePx } : props.style;

    return (
      <svg
        ref={ref}
        xmlns='http://www.w3.org/2000/svg'
        width={widthPx}
        height={sizePx}
        fill={preserveColor ? rootFill : 'currentColor'}
        viewBox={`0 0 ${nativeWidth} ${nativeHeight}`}
        data-test-id={'icon' + testId}
        style={style}
        {...props}
      >
        {children}
      </svg>
    );
  });
}
