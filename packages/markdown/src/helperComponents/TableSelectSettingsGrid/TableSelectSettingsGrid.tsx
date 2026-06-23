import { useState } from 'react';

import { tableCellTestId, TEST_IDS } from '../../constants';
import { markdownLocale } from '../../locale';
import { TableSelectItem } from '../TableSelectItem';
import styles from './styles.module.scss';

export type TableSelectSettingsGridProps = {
  onPick(rows: number, cols: number): void;
};

const MAX = 8;

export function TableSelectSettingsGrid({ onPick }: TableSelectSettingsGridProps) {
  const { t } = markdownLocale.useTranslations();
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  const cells: { r: number; c: number }[] = [];
  for (let r = 1; r <= MAX; r += 1) {
    for (let c = 1; c <= MAX; c += 1) {
      cells.push({ r, c });
    }
  }

  return (
    <div className={styles.root} data-test-id={TEST_IDS.tableGridPicker}>
      <div className={styles.container}>
        <div className={styles.grid} onMouseLeave={() => setHover(null)}>
          {cells.map(({ r, c }) => {
            const checked = hover !== null && r <= hover.r && c <= hover.c;
            return (
              <TableSelectItem
                key={`${r}-${c}`}
                hovered={hover?.r === r && hover?.c === c}
                checked={checked}
                onMouseEnter={() => setHover({ r, c })}
                onClick={() => onPick(r, c)}
                aria-label={t('table.insert', { rows: r, cols: c })}
                data-test-id={tableCellTestId(r, c)}
              />
            );
          })}
        </div>
        <div className={styles.label}>{hover ? `${hover.r} × ${hover.c}` : t('table.pickSize')}</div>
      </div>
    </div>
  );
}
