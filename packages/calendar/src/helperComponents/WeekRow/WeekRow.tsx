import { useMemo } from 'react';

import { VIEW_MODE } from '../../constants';
import { useCalendarContext } from '../../hooks';
import { Item } from '../Item';
import styles from './styles.module.scss';
import { getWeekLabels } from './utils';

export function WeekRow() {
  const { viewMode, locale, size } = useCalendarContext();

  const labels = useMemo(() => getWeekLabels(locale), [locale]);

  if (viewMode === VIEW_MODE.Month) {
    return (
      <>
        {labels.map((label, index) => (
          <Item
            key={`${index}-${label}`}
            another
            className={styles.cell}
            label={label}
            rangePosition='out'
            size={size}
            tabIndex={-1}
            testIdSegment='header-item'
          />
        ))}
      </>
    );
  }

  return null;
}
