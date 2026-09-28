import { Divider } from '@ds/divider';
import { extractSupportProps, WithSupportProps } from '@ds/utils';
import cn from 'classnames';
import { scaleLinear } from 'd3-scale';
import { ReactNode, useCallback, useMemo, useRef } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';

import { TEST_IDS, X_AXIS_POSITION } from '../../constants';
import { useCssVars } from '../../shared';
import { DEFAULT_CHART_HEIGHT } from './constants';
import styles from './styles.module.scss';
import { HeatMapChartProps } from './types';
import { getContrastColor, getStyles, getTickValues, readHeatMapColors } from './utils';

const TICKS_HEIGHT = 'var(--heat-map-ticks-height) + var(--heat-map-ticks-offset)';

export function HeatMapChart({ data, options, className, ...rest }: WithSupportProps<HeatMapChartProps>) {
  const {
    title,
    height = DEFAULT_CHART_HEIGHT,
    axes = {},
    formatter,
    legend,
    domain,
    cellRender,
    styles: stylesProp,
  } = options;
  const { xAxis, yAxis } = axes;
  const xAxisPosition = xAxis?.position || X_AXIS_POSITION.Bottom;
  const isLegendEnabled = legend?.show ?? true;
  const rootRef = useRef<HTMLDivElement>(null);
  const colors = useCssVars(rootRef, readHeatMapColors);

  const colorScale = useMemo(
    () => (colors ? scaleLinear<string>().range([colors.rangeStart, colors.rangeEnd]).domain(domain) : undefined),
    [colors, domain],
  );
  const commonStyles = useMemo(() => getStyles(colorScale, data), [colorScale, data]);
  const legendTicks = useMemo(() => getTickValues(domain), [domain]);

  // Сетка растягивается на свободную высоту карточки (container-type: size), строки делят её поровну.
  const cellHeight = xAxis?.ticks?.length
    ? `calc((100cqh - (${TICKS_HEIGHT})) / ${data.length})`
    : `calc(100cqh / ${data.length})`;

  const formatValue = useCallback((value: number) => (formatter ? formatter(value) : value), [formatter]);

  const renderCell = useCallback(
    (x: number, y: number, value: number) => {
      const content: ReactNode = cellRender ? (
        cellRender(x, y, value)
      ) : (
        <h5
          className={styles.cellValue}
          title={String(value)}
          style={{
            '--color':
              colors && colorScale
                ? getContrastColor({ lightColor: colors.lightText, darkColor: colors.darkText, rgb: colorScale(value) })
                : undefined,
          }}
        >
          {formatValue(value)}
        </h5>
      );

      return (
        <span className={styles.cell} data-test-id={TEST_IDS.heatMapChart.cell}>
          {content}
        </span>
      );
    },
    [cellRender, colorScale, colors, formatValue],
  );

  const xAxisLabel = xAxis?.label && <div className={styles.xAxisLabel}>{xAxis.label}</div>;

  return (
    <div
      ref={rootRef}
      className={cn(styles.root, className)}
      data-x-axis-position={xAxisPosition}
      style={{ '--height': `${height}px` }}
      {...extractSupportProps(rest)}
    >
      {title && (
        <h3 className={styles.title} data-test-id={TEST_IDS.heatMapChart.title}>
          {title}
        </h3>
      )}

      {xAxisPosition === X_AXIS_POSITION.Top && xAxisLabel}

      <div className={styles.gridWrapper} data-grid={Boolean(yAxis?.label) || undefined}>
        {yAxis?.label && (
          <div className={styles.yAxisLabel} data-x-axis-position={xAxisPosition}>
            {yAxis.label}
          </div>
        )}

        <HeatMapGrid
          data={data}
          xLabels={xAxis?.ticks}
          yLabels={yAxis?.ticks}
          xLabelsPos={xAxisPosition}
          yLabelsPos='left'
          cellRender={renderCell}
          xLabelsStyle={stylesProp?.xLabelsStyle || commonStyles.xLabelsStyle}
          yLabelsStyle={stylesProp?.yLabelsStyle || commonStyles.yLabelsStyle}
          cellStyle={stylesProp?.cellStyle || commonStyles.cellStyle}
          cellHeight={cellHeight}
        />
      </div>

      {xAxisPosition === X_AXIS_POSITION.Bottom && xAxisLabel}

      {isLegendEnabled && colors && (
        <div className={styles.legend} data-test-id={TEST_IDS.heatMapChart.legend}>
          <Divider />
          <div
            className={styles.gradient}
            style={{ '--gradient': `linear-gradient(90deg, ${colors.rangeStart} 0%, ${colors.rangeEnd} 100%)` }}
          />
          <div className={styles.ticks}>
            {legendTicks.map(tick => (
              <span className={styles.tick} key={tick} data-test-id={TEST_IDS.heatMapChart.tick}>
                {tick}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

HeatMapChart.xAxisPositions = X_AXIS_POSITION;
