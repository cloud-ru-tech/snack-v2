import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import { Button } from '../Button';
import { SIZE } from '../Button/constants';
import { BaseButtonProps, Size } from '../Button/types';
import styles from './styles.module.scss';

/** Пропсы действия — все пропсы Button, кроме size (задаётся на уровне группы) + нативные button-атрибуты */
type ActionProps = WithSupportProps<Omit<BaseButtonProps, 'size'>> &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseButtonProps>;

export type ButtonGroupProps = WithSupportProps<{
  /** Основное действие (filled) */
  primaryAction?: ActionProps;
  /** Вторичное действие (outline), опционально */
  secondaryAction?: ActionProps;
  /** Третичное действие (simple/text-only), опционально */
  tertiaryAction?: ActionProps;
  /** Размер кнопок */
  size?: Size;
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
}>;

function renderAction(props: ActionProps, size: Size) {
  return <Button {...props} size={size} />;
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
  ...rest
}: ButtonGroupProps) {
  return (
    <div
      className={cn(styles.root, className)}
      data-vertical={vertical || undefined}
      data-centered={centered || undefined}
      data-break={breakProp || undefined}
      data-filled={vertical || filled || undefined}
      {...rest}
    >
      {tertiaryAction && renderAction(tertiaryAction, size)}
      {secondaryAction && renderAction(secondaryAction, size)}
      {primaryAction && renderAction(primaryAction, size)}
    </div>
  );
}
