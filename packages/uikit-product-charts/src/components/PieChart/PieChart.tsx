import { Scroll } from '@ds/scroll';
import { Typography } from '@ds/typography';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useCallback, useMemo, useState } from 'react';

import { TEST_IDS } from '../../constants';
import { LabelRenderFunction, Legend, Pie, PieDataItem } from '../../helperComponents';
import { LABEL_MAX_LENGTH, PIE_INNER_RADIUS, PIE_RADIUS, PIE_SEGMENTS_SHIFT } from './constants';
import styles from './styles.module.scss';
import { PieChartProps } from './types';
import { colorizeData, toPx, truncateLabel } from './utils';

export function PieChart({
  options: { width, height, title, legendTitle, typographySize = 'l' },
  data,
  aggregatedLegend,
  onPieSegmentClick,
  onLegendItemClick,
  className,
  ...rest
}: WithSupportProps<PieChartProps>) {
  const [hoveredIndex, setHoveredIndex] = useState<number>();
  const colorizedData = useMemo(() => colorizeData(data), [data]);

  const handleSegmentMouseDown = useCallback(
    (index: number) => onPieSegmentClick?.(data[index]),
    [data, onPieSegmentClick],
  );

  const renderLabel = useCallback<LabelRenderFunction<PieDataItem>>(
    ({ dataEntry, dataIndex }) => {
      const hovered = hoveredIndex === dataIndex || undefined;

      return (
        <>
          <text className={styles.svgText} x={0} y={-4} data-hovered={hovered}>
            {truncateLabel(String(dataEntry.label), LABEL_MAX_LENGTH)}
          </text>
          <text className={styles.svgText} x={0} y={4} data-hovered={hovered} data-bolder>
            {dataEntry.value}
          </text>
        </>
      );
    },
    [hoveredIndex],
  );

  return (
    <div
      {...extractSupportProps(rest)}
      className={cn(styles.root, className)}
      data-size={typographySize}
      style={{ '--width': toPx(width), '--height': toPx(height) }}
    >
      <Typography variant='title' size={typographySize} className={styles.title} data-test-id={TEST_IDS.pieChart.title}>
        {title}
      </Typography>

      <div className={styles.content}>
        <div className={styles.legendWrapper}>
          <Scroll size='s'>
            <Legend
              data={colorizedData}
              title={legendTitle}
              size={typographySize}
              onItemClick={onLegendItemClick}
              data-test-id={TEST_IDS.pieChart.legend}
              itemTestId={TEST_IDS.pieChart.legendItem}
            />
          </Scroll>
        </div>

        <div className={styles.pieWrapper}>
          <Pie
            data={colorizedData}
            label={renderLabel}
            radius={PIE_RADIUS}
            innerRadius={PIE_INNER_RADIUS}
            segmentsShift={PIE_SEGMENTS_SHIFT}
            hoveredIndex={hoveredIndex}
            onSegmentHover={setHoveredIndex}
            onSegmentMouseDown={handleSegmentMouseDown}
          />
        </div>

        {aggregatedLegend && (
          <div className={styles.legendWrapper}>
            <Scroll size='s'>
              <Legend
                data={aggregatedLegend.data}
                title={aggregatedLegend.title}
                size={typographySize}
                onItemClick={aggregatedLegend.onAggregatedLegendItemClick}
                data-test-id={TEST_IDS.pieChart.aggregatedLegend}
                itemTestId={TEST_IDS.pieChart.aggregatedLegendItem}
              />
            </Scroll>
          </div>
        )}
      </div>
    </div>
  );
}
