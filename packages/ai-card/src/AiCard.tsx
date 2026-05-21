import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement, ReactNode } from 'react';

import { TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type AiCardOwnProps = {
  /** Заголовок карточки. Semibold, single-line с ellipsis. Не рендерится, если не задан. */
  title?: string;
  /** Контент карточки. Не рендерится, если не задан. */
  children?: ReactNode;
  /** Selected-состояние карточки. Controlled — источник истины в родителе. По умолчанию `false`. */
  checked?: boolean;
  /** Срабатывает при toggle (клик / Enter / Space). Получает новое значение `checked`. */
  onChange?: (checked: boolean) => void;
  /** Disabled-состояние: opacity 0.4, нативная блокировка кликов и клавиатуры. */
  disabled?: boolean;
  /** Доп. класс корня. */
  className?: string;
  /**
   * Нативный обработчик клика. Срабатывает после `onChange` (toggle первичен).
   * Не вызывается для disabled-карточки — браузер сам не дёргает onClick на disabled button.
   */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Публичный props компонента `AiCard`.
 *
 * Компонент рендерится как `<button>` — полиморфизм через `as` не поддерживается.
 * Для ссылочной карточки используйте `@ds/card` либо оборачивайте `AiCard` снаружи в
 * собственную навигацию через `onChange`.
 *
 * Карточка полностью controlled: state хранится в родителе, компонент сам ничего
 * не запоминает. Передайте `checked` + `onChange`, чтобы переключение работало.
 */
export type AiCardProps = WithSupportProps<
  AiCardOwnProps & Omit<ComponentPropsWithoutRef<'button'>, keyof AiCardOwnProps | 'type'>
>;

export function AiCard({
  className,
  title,
  children,
  checked = false,
  onChange,
  disabled = false,
  onClick,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiCardProps): ReactElement {
  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onChange?.(!checked);
    onClick?.(event);
  };

  return (
    <button
      {...rest}
      type='button'
      className={cn(styles.root, className)}
      disabled={disabled}
      data-checked={checked || undefined}
      data-disabled={disabled || undefined}
      data-test-id={dataTestId}
      aria-pressed={checked}
      onClick={handleClick}
    >
      {title && (
        <span className={styles.title} data-test-id={TEST_IDS.title}>
          {title}
        </span>
      )}
      {children && (
        <div className={styles.content} data-test-id={TEST_IDS.content}>
          {children}
        </div>
      )}
    </button>
  );
}
