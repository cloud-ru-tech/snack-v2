import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type TextAreaActionsFooterProps = {
  /** Контент слева (например, счётчик символов) */
  left?: ReactNode;
  /** Контент справа (кнопки действий) */
  right?: ReactNode;
};

export function TextAreaActionsFooter({ left, right }: TextAreaActionsFooterProps) {
  return (
    <div className={styles.actionsFooter}>
      <div className={styles.actionsLeft}>{left}</div>
      <div className={styles.actionsRight}>{right}</div>
    </div>
  );
}
