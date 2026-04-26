import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { JSXElementConstructor } from 'react';

import { APPEARANCE, SIZE } from './constants';
import styles from './styles.module.scss';
import { Appearance, Size } from './types';

export type IconPredefinedProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** Наличие цветной подложки */
  decor?: boolean;
  /** JSX иконки */
  icon: JSXElementConstructor<{ size?: number; className?: string }>;
  /** Размер */
  size?: Size;
  /** Форма: круглая или квадратная */
  shape?: 'round' | 'square';
}>;

/**
 * Icon Predefined — оборачивает SVG-иконки и применяет предустановленное стилевое оформление.
 * Задаёт цвет через appearance, размер через size и форму контейнера через shape.
 */
export function IconPredefined({
  className,
  decor = true,
  size = SIZE.M,
  icon: IconComponent,
  appearance = APPEARANCE.Primary,
  shape = 'round',
  ...rest
}: IconPredefinedProps) {
  return (
    <div
      className={cn(styles.decor, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-decor={decor || undefined}
      data-appearance={appearance}
      data-shape={shape}
    >
      <IconComponent data-size={size} data-appearance={appearance} className={styles.icon} />
    </div>
  );
}
