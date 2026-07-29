import { extractSupportProps, withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { Ref } from 'react';

import { APPEARANCE, COLOR, DEFAULT_PLUS_LIMIT, SIZE, VARIANT } from './constants';
import styles from './styles.module.scss';
import { Appearance, Color, Size, Variant } from './types';
import { formatValue } from './utils';

export type CounterProps = WithSupportProps<{
  /** Значение */
  value: number;
  /** Внешний вид */
  appearance?: Appearance;
  /** Вариант форматирования */
  variant?: Variant;
  /** Размер */
  size?: Size;
  /** Порог сокращения значения для варианта `count-plus` */
  plusLimit?: number;
  /** Дополнительный CSS-класс */
  className?: string;
  /** Семантический цвет */
  color?: Color;
  /**
   * Ref на корневой DOM-элемент.
   * Используем явный проп, чтобы не зависеть от `forwardRef` и не тащить type-assertions на экспорт.
   */
  innerRef?: Ref<HTMLDivElement>;
}>;

export function Counter({
  value,
  appearance = APPEARANCE.Primary,
  variant = VARIANT.Count,
  size = SIZE.S,
  plusLimit = DEFAULT_PLUS_LIMIT,
  color = COLOR.Accent,
  className,
  innerRef,
  ...rest
}: CounterProps) {
  const formattedValue = formatValue({ value, variant, plusLimit });

  return (
    <div
      ref={innerRef}
      className={cn(styles.counter, className)}
      {...extractSupportProps(rest)}
      data-size={size}
      data-variant={variant}
      data-appearance={appearance}
      data-color={color}
    >
      <span className={styles.container}>
        <span className={styles.border} aria-hidden />
        {formattedValue}
      </span>
    </div>
  );
}

withInnerRefSupport(Counter);
