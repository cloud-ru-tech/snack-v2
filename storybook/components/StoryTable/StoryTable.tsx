import React from 'react';

import styles from './styles.module.scss';

export type StoryTableRow = {
  variantLabel: string;
  cells: React.ReactNode[];
};

export type StoryTableProps = {
  sectionTitle?: string;
  firstColumnHeader: string;
  columnHeaders: string[];
  rows: StoryTableRow[];
  /** Wrap each cell content in a flex column (e.g. for multiple items per cell) */
  cellContentAsColumn?: boolean;
};

/**
 * Shared table layout for Visual Matrix and similar stories.
 * Uses design tokens for consistent borders, typography and spacing.
 */
export function StoryTable({
  sectionTitle,
  firstColumnHeader,
  columnHeaders,
  rows,
  cellContentAsColumn = false,
}: StoryTableProps) {
  const cellClassName = cellContentAsColumn ? `${styles.tableCell} ${styles.cellContentColumn}` : styles.tableCell;

  return (
    <div className={styles.container}>
      {sectionTitle != null && (
        <div className={styles.sectionHeader} style={{ textTransform: 'capitalize', fontWeight: 600 }}>
          {sectionTitle}
        </div>
      )}
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th className={`${styles.tableHeaderCell} ${styles.tableHeaderCellFirst}`}>{firstColumnHeader}</th>
            {columnHeaders.map(header => (
              <th key={header} className={styles.tableHeaderCell}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.variantLabel}>
              <td className={`${styles.tableCell} ${styles.tableCellVariant}`}>{row.variantLabel}</td>
              {row.cells.map((cell, index) => (
                <td key={`${row.variantLabel}-${index}`} className={cellClassName}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
