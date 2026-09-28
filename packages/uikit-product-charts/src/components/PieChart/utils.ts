import { PieDataItem } from '../../helperComponents';
import { getSeriesColorByIndex, seriesColorVar } from '../../shared';
import { PieChartDataItem } from './types';

export function truncateLabel(label: string, maxLength: number): string {
  return label.length > maxLength ? `${label.slice(0, maxLength)}...` : label;
}

export function colorizeData(data: PieChartDataItem[]): PieDataItem[] {
  return data.map((item, index) => ({
    ...item,
    color: item.color || seriesColorVar(getSeriesColorByIndex(index)),
  }));
}

export function toPx(value?: number): string | undefined {
  return value ? `${value}px` : undefined;
}
