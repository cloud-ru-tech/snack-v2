import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons';
import { Sun, SUN_SIZE } from '@ds/loader';
import cn from 'classnames';
import { forwardRef, KeyboardEvent, ReactNode, useCallback, useState } from 'react';

import { BUTTON_SIZE } from './constants';
import styles from './styles.module.scss';
import { ButtonSize, Variant } from './types';

export type FieldElementButtonProps = {
  /** Положение относительно поля */
  variant: Variant;
  /**
   * Размер (совпадает с размером поля)
   * @default 'm'
   */
  size?: ButtonSize;
  /** Состояние загрузки */
  loading?: boolean;
  /** Деактивировано */
  disabled?: boolean;
  /** Содержимое (иконка и т.д.) */
  action: ReactNode;
  /** Показать шеврон раскрытия */
  withDropdownList?: boolean;
  /**
   * Контролируемое состояние раскрытия (используется обёрткой `FieldElementButtonList`).
   * Если задано — шеврон отражает это значение; иначе кнопка управляет шевроном сама.
   */
  open?: boolean;
  /** Обработчик нажатия клавиш (передаётся обёрткой `Droplist` для ArrowDown/ArrowUp) */
  onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
  /** Обработчик клика */
  onClick?(): void;
  /** HTML tabIndex (`-1` — исключить кнопку из tab-order, фокус по Tab уходит в поле) */
  tabIndex?: number;
  /** CSS-класс (передаётся обёрткой `Droplist` / `PopoverPrivate` на триггер) */
  className?: string;
  /** data-test-id кнопки-слота */
  'data-test-id'?: string;
};

const SUN_SIZE_MAP = {
  [BUTTON_SIZE.S]: SUN_SIZE.XS,
  [BUTTON_SIZE.M]: SUN_SIZE.S,
  [BUTTON_SIZE.L]: SUN_SIZE.S,
};

export const FieldElementButton = forwardRef<HTMLButtonElement, FieldElementButtonProps>(function FieldElementButton(
  {
    size = BUTTON_SIZE.M,
    loading = false,
    disabled = false,
    onClick,
    onKeyDown,
    withDropdownList,
    open,
    variant,
    action,
    className,
    tabIndex,
    'data-test-id': dataTestId,
  },
  ref,
) {
  const [isListOpen, setListOpen] = useState(false);
  const [stateLayerPressed, setStateLayerPressed] = useState(false);

  // Если `open` контролируется снаружи (FieldElementButtonList) — шеврон следует за ним,
  // иначе кнопка хранит состояние раскрытия сама.
  const listOpen = open ?? isListOpen;

  const handleListToggleClick = useCallback(() => {
    setListOpen(prevOpen => !prevOpen);
    onClick?.();
  }, [onClick]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>) => {
      if (disabled || loading) {
        return;
      }
      if (event.key === 'Enter' && !event.repeat) {
        setStateLayerPressed(true);
      }
      onKeyDown?.(event);
    },
    [disabled, loading, onKeyDown],
  );

  const handleKeyUp = useCallback((event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') {
      setStateLayerPressed(false);
    }
  }, []);

  const handleBlur = useCallback(() => {
    setStateLayerPressed(false);
  }, []);

  return (
    <button
      ref={ref}
      type='button'
      className={cn(styles.buttonContainer, className)}
      onClick={loading || disabled ? undefined : handleListToggleClick}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
      disabled={disabled || loading || undefined}
      tabIndex={tabIndex}
      data-size={size}
      data-variant={variant}
      data-loading={loading || undefined}
      data-disabled={disabled || undefined}
      data-pressed={stateLayerPressed ? true : undefined}
      data-test-id={dataTestId}
    >
      <div className={styles.backgroundStateLayer} data-state='regularFilled' />
      <div className={styles.focusLayer} aria-hidden />
      <div className={styles.elementWrapper}>
        {loading && !disabled ? <Sun size={SUN_SIZE_MAP[size]} /> : action}
        {withDropdownList && <div className={styles.chevron}>{listOpen ? <ChevronUpSVG /> : <ChevronDownSVG />}</div>}
      </div>
    </button>
  );
});
