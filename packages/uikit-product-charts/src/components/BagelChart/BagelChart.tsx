import { useLang } from '@ds/locale';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { ReactNode, useCallback, useMemo } from 'react';
import { PieChart } from 'react-minimal-pie-chart';

import { TEST_IDS } from '../../constants';
import { MAX_TOTAL, MAX_VALUE } from './constants';
import styles from './styles.module.scss';
import { devWarning, getBagelLevel } from './utils';

export type BagelChartProps = WithSupportProps<{
  /** Занятое значение. Определяет длину сегмента и его цвет: до 50% — зелёный, до 75% — жёлтый, выше — красный */
  value: number;
  /** Общий объём, от которого считается заполненность */
  total: number;
  /** Заголовок над кольцом */
  title?: ReactNode;
  /** CSS-класс корня */
  className?: string;
}>;

// Сегмент и трек рисует SVG react-minimal-pie-chart: цвет передаётся CSS-переменной,
// сами значения живут в styles.module.scss и зависят от `data-level`.
const SEGMENT_COLOR = 'var(--bagel-segment)';
const TRACK_COLOR = 'var(--bagel-track)';

export function BagelChart({ value, total, title, className, ...rest }: BagelChartProps) {
  devWarning('BagelChart: value is too long', value > MAX_VALUE);
  devWarning('BagelChart: total is too long', total > MAX_TOTAL);

  const lang = useLang();
  const numberFormat = useMemo(() => new Intl.NumberFormat(lang), [lang]);
  const data = useMemo(() => [{ value, color: SEGMENT_COLOR }], [value]);

  const renderLabel = useCallback(
    () => (
      <>
        <text className={styles.value} x={50} y={45} data-test-id={TEST_IDS.bagelChart.value}>
          {numberFormat.format(value)}
        </text>
        <text className={styles.total} x={50} y={65} data-test-id={TEST_IDS.bagelChart.total}>
          {numberFormat.format(total)}
        </text>
      </>
    ),
    [numberFormat, total, value],
  );

  return (
    <div
      className={cn(styles.root, className)}
      data-level={getBagelLevel({ value, total })}
      {...extractSupportProps(rest)}
    >
      {title && (
        <div className={styles.title} data-test-id={TEST_IDS.bagelChart.title}>
          {title}
        </div>
      )}

      <PieChart
        data={data}
        totalValue={total}
        background={TRACK_COLOR}
        startAngle={270}
        lineWidth={15}
        label={renderLabel}
        labelPosition={0}
      />
    </div>
  );
}
