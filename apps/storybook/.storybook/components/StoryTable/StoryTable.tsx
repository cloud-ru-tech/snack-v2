import cn from 'classnames';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

export type StoryTableRow = {
  variantLabel: ReactNode;
  cells: ReactNode[];
};

export type StoryTableProps = {
  sectionTitle?: ReactNode;
  firstColumnHeader?: ReactNode;
  columnHeaders: ReactNode[];
  rows: StoryTableRow[];
  className?: string;
  /** Горизонтальное выравнивание содержимого ячеек. По умолчанию `center`. */
  cellAlign?: 'center' | 'start';
};

/**
 * Таблица для Visual Matrix stories: единые границы, типографика и отступы
 * на design tokens из `@ds/figma-variables`.
 */
export function StoryTable({
  sectionTitle,
  firstColumnHeader,
  columnHeaders,
  rows,
  className,
  cellAlign = 'center',
}: StoryTableProps) {
  return (
    <section className={cn(styles.section, className)} data-test-id='story-table'>
      {sectionTitle ? <h4 className={styles.title}>{sectionTitle}</h4> : null}
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={cn(styles.th, styles.thFirst)}>{firstColumnHeader}</th>
            {columnHeaders.map((header, index) => (
              <th key={index} className={styles.th}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td className={cn(styles.td, styles.tdLabel)}>{row.variantLabel}</td>
              {row.cells.map((cell, cellIndex) => (
                <td key={cellIndex} className={styles.td}>
                  <div className={cn(styles.cellInner, cellAlign === 'start' && styles.cellInnerStart)}>{cell}</div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
