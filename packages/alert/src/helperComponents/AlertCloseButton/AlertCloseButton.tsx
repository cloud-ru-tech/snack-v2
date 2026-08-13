import { CrossSVG } from '@ds/icons/interface/system';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { MouseEventHandler } from 'react';

import { BUTTON_SIZE, BUTTON_VARIANT } from '../../constants';
import { ButtonSize, ButtonVariant } from '../../types';
import styles from './styles.module.scss';

export type AlertCloseButtonProps = WithSupportProps<{
  /** CSS-класс */
  className?: string;
  /** Размер */
  size?: ButtonSize;
  /** Цветовой режим: `onColor` — обычный алерт, `onAccent` — alertTop на акцентной подложке */
  variant?: ButtonVariant;
  /** Инверсный цвет фокус-рамки (алерт на акцентной подложке) */
  invertFocusOutlineColor?: boolean;
  /** Обработчик закрытия */
  onClick?: MouseEventHandler<HTMLButtonElement>;
}>;

/**
 * Кнопка закрытия алерта. Собственный приватный элемент анатомии
 * (Figma: `buttonClosedAlertOnColorS/M`, `buttonClosedAlertOnAccentColorS/M`), а не
 * инстанс общей кнопки: у неё свой слой состояния (`empty*`-варианты, прозрачные
 * по умолчанию) и свой цвет иконки на акцентной подложке.
 */
export function AlertCloseButton({
  className,
  size = BUTTON_SIZE.M,
  variant = BUTTON_VARIANT.OnColor,
  invertFocusOutlineColor,
  onClick,
  ...rest
}: AlertCloseButtonProps) {
  return (
    <button
      type='button'
      className={cn(styles.root, className)}
      data-size={size}
      data-view={variant}
      data-invert-focus-outline-color={invertFocusOutlineColor || undefined}
      onClick={onClick}
      {...extractSupportProps(rest)}
    >
      <span
        className={styles.stateLayer}
        aria-hidden
        data-state={variant === BUTTON_VARIANT.OnColor ? 'emptyVersionOnColor' : 'emptyInversionOnColor'}
      />
      <span className={styles.icon} aria-hidden>
        <CrossSVG />
      </span>
    </button>
  );
}
