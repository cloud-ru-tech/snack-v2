import { ButtonHTMLAttributes, ReactNode } from 'react';

import styles from './styles.module.scss';

export type ToastSystemEventCloseAllProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

/**
 * Full-width label-кнопка в нижней панели стека тостов (Figma 7902:280472 —
 * `toastSystemEventCloseAll`). Используется для actions `Cancel all` и
 * `Expand/Collapse stack`. Hover/pressed состояния реализованы через
 * state-layer overlay (Material).
 */
export function ToastSystemEventCloseAll({ children, type = 'button', ...rest }: ToastSystemEventCloseAllProps) {
  return (
    <button {...rest} type={type} className={styles.button}>
      <span className={styles.stateLayer} aria-hidden data-state='emptyNeutralOnBackground' />
      {children}
    </button>
  );
}
