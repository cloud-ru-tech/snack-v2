import { extractSupportProps, withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { JSXElementConstructor, Ref } from 'react';

import { APPEARANCE, SIZE } from './constants';
import styles from './styles.module.scss';
import { Appearance, Size } from './types';

export type IconPredefinedProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Внешний вид */
  appearance?: Appearance;
  /** Наличие цветной подложки */
  background?: boolean;
  /** JSX иконки */
  icon: JSXElementConstructor<{ size?: number; className?: string }>;
  /** Размер */
  size?: Size;
  /** Форма: круглая или квадратная */
  shape?: 'rounded' | 'squared';
  /**
   * Ref на корневой DOM-элемент.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: Ref<HTMLDivElement>;
}>;

/**
 * Icon Predefined — оборачивает SVG-иконки и применяет предустановленное стилевое оформление.
 * Задаёт цвет через appearance, размер через size и форму контейнера через shape.
 */
export function IconPredefined({
  className,
  background = true,
  size = SIZE.M,
  icon: IconComponent,
  appearance = APPEARANCE.Primary,
  shape = 'rounded',
  innerRef,
  ...rest
}: IconPredefinedProps) {
  return (
    <div
      ref={innerRef}
      className={cn(styles.decor, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-background={background || undefined}
      data-appearance={appearance}
      data-shape={shape}
    >
      <IconComponent data-size={size} data-appearance={appearance} className={styles.icon} />
    </div>
  );
}

withInnerRefSupport(IconPredefined);
