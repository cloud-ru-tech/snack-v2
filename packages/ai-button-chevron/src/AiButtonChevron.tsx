import { ChevronDownSVG } from '@ds/icons/interface/system';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement } from 'react';

import { TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type AiButtonChevronOwnProps = {
  /** Раскрытое состояние: `true` — шеврон смотрит вверх, `false` — вниз. По умолчанию `false`. */
  open?: boolean;
  /** Интерактивный режим: `true` — рендерится как `button`, `false` — как декоративный `span`. */
  interactive?: boolean;
  /** Disabled-состояние: opacity, нативная блокировка кликов и клавиатуры. */
  disabled?: boolean;
  /** Доп. класс корня. */
  className?: string;
  /** Нативный обработчик клика. Не вызывается для disabled-кнопки. */
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
};

/**
 * Публичный props компонента `AiButtonChevron`.
 *
 * Кнопка-шеврон 16×16 для раскрытия / сворачивания (toggle) в составных
 * AI-компонентах стриминга. Презентационная: видимое состояние задаётся
 * пропом `open`, переключение — на стороне родителя через `onClick`.
 *
 * Доступное имя: по умолчанию `aria-label` = `'Expand'` / `'Collapse'`
 * (зависит от `open`); `aria-expanded` = `open`. Оба переопределяются
 * через одноимённые пропсы.
 */
export type AiButtonChevronProps = WithSupportProps<
  AiButtonChevronOwnProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof AiButtonChevronOwnProps | 'type' | 'children'>
>;

export function AiButtonChevron({
  className,
  open = false,
  interactive = true,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
  'data-test-id': dataTestId,
  ...rest
}: AiButtonChevronProps): ReactElement {
  const resolvedDataTestId = dataTestId ?? (interactive ? TEST_IDS.root : undefined);

  if (!interactive) {
    return (
      <span
        className={cn(styles.root, className)}
        data-open={open || undefined}
        data-disabled={disabled || undefined}
        data-test-id={resolvedDataTestId}
        aria-hidden
      >
        <ChevronDownSVG className={styles.icon} size={16} />
      </span>
    );
  }

  return (
    <button
      {...rest}
      type='button'
      className={cn(styles.root, className)}
      disabled={disabled}
      data-open={open || undefined}
      data-disabled={disabled || undefined}
      data-test-id={resolvedDataTestId}
      aria-label={ariaLabel ?? (open ? 'Collapse' : 'Expand')}
      aria-expanded={ariaExpanded ?? open}
      onClick={onClick}
    >
      <ChevronDownSVG className={styles.icon} size={16} />
    </button>
  );
}
