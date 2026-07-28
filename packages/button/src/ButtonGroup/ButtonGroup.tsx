import { ValueOf, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode } from 'react';

import { Button } from '../Button';
import { SIZE } from '../Button/constants';
import { ButtonProps, Size } from '../Button/types';
import styles from './styles.module.scss';

/** Идентификаторы слотов действий — передаются в `renderAction`, чтобы обернуть конкретную кнопку. */
export const BUTTON_GROUP_ACTION_SLOT = {
  Primary: 'primary',
  Secondary: 'secondary',
  Tertiary: 'tertiary',
} as const;

export type ButtonGroupActionSlot = ValueOf<typeof BUTTON_GROUP_ACTION_SLOT>;

/**
 * Пропсы действия — все пропсы Button, кроме size (задаётся на уровне группы) + нативные атрибуты.
 * Union `button | anchor`: `Button` полиморфен, при `as='a'` рендерит `<a href>` (CTA-ссылка в группе).
 */
type ButtonActionProps = WithSupportProps<Omit<ButtonProps<'button'>, 'size'>>;
type AnchorActionProps = WithSupportProps<Omit<ButtonProps<'a'>, 'size'>>;
type ActionProps = ButtonActionProps | AnchorActionProps;

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
  /**
   * Обёртка каждой кнопки. Получает готовый `<Button>` и слот действия (`primary`/`secondary`/`tertiary`)
   * и возвращает узел, который встанет на место кнопки. Позволяет обернуть кнопку в `Tooltip` на стороне
   * потребителя (сам `@ds/button` не зависит от `@ds/tooltip`). Чтобы не ломать раскладку `filled`, обёртка
   * не должна добавлять лишний DOM-узел между группой и кнопкой (`Tooltip` — с `disableSpanWrapper`).
   */
  renderAction?(button: ReactNode, slot: ButtonGroupActionSlot): ReactNode;
  /** Дополнительный класс */
  className?: string;
}>;

export function ButtonGroup({
  primaryAction,
  secondaryAction,
  tertiaryAction,
  size = SIZE.M,
  vertical = false,
  centered = false,
  break: breakProp = false,
  filled = false,
  renderAction,
  className,
  ...rest
}: ButtonGroupProps) {
  function buildAction(props: ActionProps, slot: ButtonGroupActionSlot) {
    // Из спреда union-пропсов дженерик `T` у `Button` не выводится — сужаем тип к button-варианту
    // (валидное narrowing-приведение). Рантайм `Button` сам разбирает `as='a'` / `'button'`.
    const button = <Button {...(props as ButtonActionProps)} size={size} />;

    return renderAction ? renderAction(button, slot) : button;
  }

  return (
    <div
      className={cn(styles.root, className)}
      data-vertical={vertical || undefined}
      data-centered={centered || undefined}
      data-break={breakProp || undefined}
      data-filled={vertical || filled || undefined}
      {...rest}
    >
      {tertiaryAction && buildAction(tertiaryAction, BUTTON_GROUP_ACTION_SLOT.Tertiary)}
      {secondaryAction && buildAction(secondaryAction, BUTTON_GROUP_ACTION_SLOT.Secondary)}
      {primaryAction && buildAction(primaryAction, BUTTON_GROUP_ACTION_SLOT.Primary)}
    </div>
  );
}
