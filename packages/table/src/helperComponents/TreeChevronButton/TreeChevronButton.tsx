import { ChevronRightSVG } from '@ds/icons/interface/system';
import { MouseEvent } from 'react';

import styles from './styles.module.scss';

export type TreeChevronButtonProps = {
  /** Раскрыта ли ветка: шеврон повёрнут вниз */
  expanded: boolean;
  onClick(event: MouseEvent<HTMLButtonElement>): void;
  'data-test-id'?: string;
};

/** Шеврон раскрытия ветки дерева в ячейке таблицы — Figma `buttonChevronTable`. */
export function TreeChevronButton({ expanded, onClick, 'data-test-id': dataTestId }: TreeChevronButtonProps) {
  return (
    <button
      type='button'
      className={styles.root}
      onClick={onClick}
      data-expanded={expanded || undefined}
      data-test-id={dataTestId}
    >
      <span className={styles.content}>
        <span className={styles.icon} data-text-opacity>
          <ChevronRightSVG />
        </span>
      </span>
    </button>
  );
}
