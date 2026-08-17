import { extractSupportProps, withInnerRefSupport, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { Ref } from 'react';

import { APPEARANCE, DEFAULT_PLUS_LIMIT, ROLE_APPEARANCE, SIZE, VARIANT } from './constants';
import styles from './styles.module.scss';
import { Appearance, RoleAppearance, Size, Variant } from './types';
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
  /** Роль, в которой применяется `appearance`: акцентная заливка или декоративная */
  roleAppearance?: RoleAppearance;
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
  roleAppearance = ROLE_APPEARANCE.Accent,
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
      data-role-appearance={roleAppearance}
    >
      <span className={styles.container}>
        <span className={styles.border} aria-hidden />
        {formattedValue}
      </span>
    </div>
  );
}

withInnerRefSupport(Counter);
