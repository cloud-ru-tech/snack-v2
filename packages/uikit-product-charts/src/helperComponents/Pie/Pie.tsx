import { arc, pie, PieArcDatum } from 'd3-shape';
import { Fragment, MouseEvent, ReactNode, useCallback, useMemo } from 'react';

import { PieChartDataItem } from '../../components/PieChart/types';
import { TEST_IDS } from '../../constants';
import styles from './styles.module.scss';

export type PieDataItem = PieChartDataItem & { color: string };

export type LabelRenderFunction<T> = (props: { dataEntry: T; dataIndex: number }) => ReactNode;

type PieProps = {
  data: PieDataItem[];
  label: LabelRenderFunction<PieDataItem>;
  radius: number;
  innerRadius: number;
  segmentsShift: number;
  hoveredIndex?: number;
  onSegmentHover(index: number | undefined): void;
  onSegmentMouseDown(index: number): void;
};

// d3 считает углы от 12 часов, диаграмма начинается с 3 часов — как в legacy.
const ANGLE_OFFSET = Math.PI / 2;
const HOVER_GROWTH = 1;

function getSegmentIndex(event: MouseEvent<SVGPathElement>): number {
  return Number(event.currentTarget.dataset.index);
}

export function Pie({
  data,
  label,
  radius,
  innerRadius,
  segmentsShift,
  hoveredIndex,
  onSegmentHover,
  onSegmentMouseDown,
}: PieProps) {
  const segments = useMemo(
    () =>
      pie<PieDataItem>()
        .sort(null)
        .value(item => item.value)(data),
    [data],
  );

  const getPath = useMemo(
    () =>
      arc<PieArcDatum<PieDataItem>>()
        .outerRadius(radius)
        .innerRadius(innerRadius)
        .startAngle(d => d.startAngle + ANGLE_OFFSET)
        .endAngle(d => d.endAngle + ANGLE_OFFSET)
        .padAngle(segmentsShift),
    [innerRadius, radius, segmentsShift],
  );

  const getHoveredPath = useMemo(
    () =>
      arc<PieArcDatum<PieDataItem>>()
        .outerRadius(radius + HOVER_GROWTH)
        .innerRadius(innerRadius + HOVER_GROWTH)
        .startAngle(d => d.startAngle + ANGLE_OFFSET)
        .endAngle(d => d.endAngle + ANGLE_OFFSET)
        .padAngle(segmentsShift),
    [innerRadius, radius, segmentsShift],
  );

  const handleMouseOver = useCallback(
    (event: MouseEvent<SVGPathElement>) => onSegmentHover(getSegmentIndex(event)),
    [onSegmentHover],
  );
  const handleMouseOut = useCallback(() => onSegmentHover(undefined), [onSegmentHover]);
  const handleMouseDown = useCallback(
    (event: MouseEvent<SVGPathElement>) => {
      event.preventDefault();
      onSegmentMouseDown(getSegmentIndex(event));
    },
    [onSegmentMouseDown],
  );

  return (
    <svg viewBox='0 0 100 100' width='100%' height='100%' className={styles.svg}>
      <g transform='translate(50,50)'>
        {segments.map((segment, index) => (
          <Fragment key={segment.data.id ?? index}>
            <path
              className={styles.segment}
              data-index={index}
              data-hovered={hoveredIndex === index || undefined}
              data-test-id={TEST_IDS.pieChart.segment}
              fill={segment.data.color}
              d={String(hoveredIndex === index ? getHoveredPath(segment) : getPath(segment))}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
              onMouseDown={handleMouseDown}
            />

            {label({ dataEntry: segment.data, dataIndex: index })}
          </Fragment>
        ))}
      </g>
    </svg>
  );
}
