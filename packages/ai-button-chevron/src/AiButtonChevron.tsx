import { ChevronDownSVG } from '@ds/icons';
import { WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ComponentPropsWithoutRef, MouseEvent, ReactElement } from 'react';

import { TEST_IDS } from './constants';
import styles from './styles.module.scss';

export type AiButtonChevronOwnProps = {
  /** Раскрытое состояние: `true` — шеврон смотрит вверх, `false` — вниз. По умолчанию `false`. */
  opened?: boolean;
  /** Disabled-состояние: opacity, нативная блокировка кликов и клавиатуры. */
  disabled?: boolean;
  /** Доп. класс корня. */
  className?: string;
  /** Нативный обработчик клика. Не вызывается для disabled-кнопки. */
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

/**
 * Публичный props компонента `AiButtonChevron`.
 *
 * Кнопка-шеврон 16×16 для раскрытия / сворачивания (toggle) в составных
 * AI-компонентах стриминга. Презентационная: видимое состояние задаётся
 * пропом `opened`, переключение — на стороне родителя через `onClick`.
 *
 * Доступное имя: по умолчанию `aria-label` = `'Expand'` / `'Collapse'`
 * (зависит от `opened`); `aria-expanded` = `opened`. Оба переопределяются
 * через одноимённые пропсы.
 */
export type AiButtonChevronProps = WithSupportProps<
  AiButtonChevronOwnProps &
    Omit<ComponentPropsWithoutRef<'button'>, keyof AiButtonChevronOwnProps | 'type' | 'children'>
>;

export function AiButtonChevron({
  className,
  opened = false,
  disabled = false,
  onClick,
  'aria-label': ariaLabel,
  'aria-expanded': ariaExpanded,
  'data-test-id': dataTestId = TEST_IDS.root,
  ...rest
}: AiButtonChevronProps): ReactElement {
  return (
    <button
      {...rest}
      type='button'
      className={cn(styles.root, className)}
      disabled={disabled}
      data-opened={opened || undefined}
      data-disabled={disabled || undefined}
      data-test-id={dataTestId}
      aria-label={ariaLabel ?? (opened ? 'Collapse' : 'Expand')}
      aria-expanded={ariaExpanded ?? opened}
      onClick={onClick}
    >
      <ChevronDownSVG className={styles.icon} size={16} />
    </button>
  );
}
