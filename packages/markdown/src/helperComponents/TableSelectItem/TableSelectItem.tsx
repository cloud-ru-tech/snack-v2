import styles from './styles.module.scss';

// Одна ячейка из grid-picker'а.
export type TableSelectItemProps = {
  /** Hover-состояние (управляется родителем по mouseEnter). */
  hovered?: boolean;
  /** Будет ли ячейка попадать в выбранный диапазон. */
  checked?: boolean;
  onMouseEnter?(): void;
  onClick?(): void;
  'aria-label'?: string;
  'data-test-id'?: string;
};

export function TableSelectItem({
  hovered = false,
  checked = false,
  onMouseEnter,
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
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      aria-label={ariaLabel}
      data-test-id={dataTestId}
    >
      <span className={styles.stateLayer} data-state={checked ? 'activatedFilled' : 'regularFilled'} aria-hidden />
    </button>
  );
}
