import { Tooltip } from '@design-system/tooltip';
import { WithSupportProps } from '@design-system/utils';
import cn from 'classnames';
import type { ReactNode } from 'react';

import { Button } from '../Button';
import { SIZE } from '../Button/constants';
import type { ButtonProps } from '../Button/types';
import styles from './styles.module.scss';

/** Пропсы действия — как у `Button` с `as` по умолчанию (нативная кнопка), без `size` (задаётся группой) */
type ActionProps = Omit<ButtonProps<'button'>, 'size'> &
  WithSupportProps<{
    tooltip?: { tip: ReactNode };
  }>;

export type ButtonGroupProps = {
  /** Основное действие (filled) */
  primaryAction?: ActionProps;
  /** Вторичное действие (outline), опционально */
  secondaryAction?: ActionProps;
  /** Третичное действие (simple/text-only), опционально */
  tertiaryAction?: ActionProps;
  /** Размер кнопок */
  size?: 's' | 'm' | 'l';
  /** Вертикальное расположение */
  vertical?: boolean;
  /** Центрирование по горизонтали */
  centered?: boolean;
  /** Перенос на новую строку при нехватке места */
  break?: boolean;
  /** Заливка контейнера */
  filled?: boolean;
  /** Дополнительный класс */
  className?: string;
};

function renderAction(props: ActionProps, size: 's' | 'm' | 'l') {
  const { tooltip, ...buttonProps } = props;
  const button = <Button {...buttonProps} size={size} />;
  if (tooltip) {
    return <Tooltip tip={tooltip.tip}>{button}</Tooltip>;
  }
  return button;
}

export function ButtonGroup({
  primaryAction,
  secondaryAction,
  tertiaryAction,
  size = SIZE.M,
  vertical = false,
  centered = false,
  break: breakProp = false,
  filled = false,
  className,
}: ButtonGroupProps) {
  return (
    <div
      className={cn(styles.root, className)}
      data-vertical={vertical || undefined}
      data-centered={centered || undefined}
      data-break={breakProp || undefined}
      data-filled={vertical || filled || undefined}
    >
      {tertiaryAction && renderAction(tertiaryAction, size)}
      {secondaryAction && renderAction(secondaryAction, size)}
      {primaryAction && renderAction(primaryAction, size)}
    </div>
  );
}
