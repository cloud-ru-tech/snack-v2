import { Divider } from '@ds/divider';
import { Link } from '@ds/link';
import { Typography, TypographySize } from '@ds/typography';
import { Fragment, MouseEvent, useCallback } from 'react';

import { PieChartLegendItem } from '../../components/PieChart/types';
import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type LegendItemData = PieChartLegendItem & { color?: string };

type LegendItemProps<T extends LegendItemData> = {
  item: T;
  size: TypographySize;
  itemTestId: string;
  onItemClick?(item: T): void;
};

function LegendItem<T extends LegendItemData>({ item, size, itemTestId, onItemClick }: LegendItemProps<T>) {
  const handleClick = useCallback(
    (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      onItemClick?.(item);
    },
    [item, onItemClick],
  );

  return (
    <div className={styles.item} data-test-id={itemTestId}>
      <span className={styles.itemTitle} data-size={size}>
        {item.color && <span className={styles.dot} style={{ '--color': item.color }} />}
        <Link
          label={String(item.label)}
          truncateVariant='end'
          className={styles.link}
          onClick={onItemClick ? handleClick : undefined}
          data-test-id={TEST_IDS.pieChart.legendLink}
        />
      </span>

      <span className={styles.value} data-size={size}>
        {item.value}
      </span>
    </div>
  );
}

export type LegendProps<T extends LegendItemData> = {
  data: T[];
  size: TypographySize;
  title?: string;
  'data-test-id': string;
  itemTestId: string;
  onItemClick?(item: T): void;
};

export function Legend<T extends LegendItemData>({
  data,
  title,
  size,
  itemTestId,
  onItemClick,
  'data-test-id': testId,
}: LegendProps<T>) {
  return (
    <div className={styles.legend} data-test-id={testId}>
      {title && (
        <>
          <Typography variant='label' size={size}>
            {title}
          </Typography>
          <Divider className={styles.divider} />
        </>
      )}

      {data.map((item, index) => (
        <Fragment key={item.id ?? `${item.label}_${index}`}>
          <LegendItem item={item} size={size} itemTestId={itemTestId} onItemClick={onItemClick} />
          {index !== data.length - 1 && <Divider className={styles.divider} />}
        </Fragment>
      ))}
    </div>
  );
}
