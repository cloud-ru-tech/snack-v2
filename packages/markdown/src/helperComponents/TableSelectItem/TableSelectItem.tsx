import { PointerEvent } from 'react';

import styles from './styles.module.scss';

// Одна ячейка из grid-picker'а.
export type TableSelectItemProps = {
  /** Hover-состояние (управляется родителем по pointerEnter). */
  hovered?: boolean;
  /** Будет ли ячейка попадать в выбранный диапазон. */
  checked?: boolean;
  onPointerEnter?(event: PointerEvent<HTMLButtonElement>): void;
  onClick?(): void;
  'aria-label'?: string;
  'data-test-id'?: string;
};

export function TableSelectItem({
  hovered = false,
  checked = false,
  onPointerEnter,
  onClick,
  'aria-label': ariaLabel,
  'data-test-id': dataTestId,
}: TableSelectItemProps) {
  const state = hovered ? 'hovered' : 'default';

  return (
    <button
      type='button'
      className={styles.root}
      data-state={state}
      data-checked={checked || undefined}
      onPointerEnter={onPointerEnter}
      onClick={onClick}
      aria-label={ariaLabel}
      data-test-id={dataTestId}
    >
      <span
        className={styles.stateLayer}
        data-state={checked ? 'activatedOnBackground' : 'emptyNeutralOnBackground'}
        aria-hidden
      />
    </button>
  );
}
