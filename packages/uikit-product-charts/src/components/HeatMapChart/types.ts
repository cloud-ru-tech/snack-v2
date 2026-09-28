import { ReactNode } from 'react';

import { XAxisPosition } from '../../types';

export type HeatMapChartAxisOptions = {
  /** Подпись оси */
  label?: string;
  /** Подписи делений (по одной на столбец/строку) */
  ticks?: string[];
};

export type HeatMapChartXAxisOptions = HeatMapChartAxisOptions & {
  /** Положение подписей оси X
   * @default 'bottom'
   */
  position?: XAxisPosition;
};

export type HeatMapChartAxesOptions = {
  /** Горизонтальная ось */
  xAxis?: HeatMapChartXAxisOptions;
  /** Вертикальная ось */
  yAxis?: HeatMapChartAxisOptions;
};

export type HeatMapChartLegendOptions = {
  /** Показывать градиентную легенду
   * @default true
   */
  show?: boolean;
};

type InlineStyle = Record<string, string | number | undefined>;

export type HeatMapChartStyles = {
  xLabelsStyle(index: number): InlineStyle;
  yLabelsStyle(index: number): InlineStyle;
  cellStyle(x: number, y: number, ratio: number): InlineStyle;
};

export type HeatMapChartOptions = {
  /** Заголовок */
  title?: string;
  /** Полная высота карточки в px
   * @default 700
   */
  height?: number;
  /** Форматирование значения в ячейке */
  formatter?(value: number): string;
  /** Настройки осей */
  axes?: HeatMapChartAxesOptions;
  /** Диапазон значений `[min, max]` для цветовой шкалы и легенды */
  domain: [number, number];
  /** Кастомный рендер содержимого ячейки */
  cellRender?(x: number, y: number, value: number): ReactNode;
  /** Настройки легенды */
  legend?: HeatMapChartLegendOptions;
  /** Переопределение inline-стилей подписей и ячеек сетки */
  styles?: Partial<HeatMapChartStyles>;
};

export type HeatMapChartProps = {
  /** Матрица значений: строки × столбцы */
  data: number[][];
  /** Настройки отображения */
  options: HeatMapChartOptions;
  /** CSS-класс корня */
  className?: string;
};
