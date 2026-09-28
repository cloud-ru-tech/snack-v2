import { TypographySize } from '@ds/typography';

export type TextLike = string | number;

export type PieChartLegendItem = {
  /** Подпись пункта легенды */
  label: TextLike;
  /** Значение справа от подписи */
  value: TextLike;
  /** Идентификатор пункта — возвращается в колбэке клика */
  id?: string;
};

export type PieChartDataItem = {
  /** Подпись сегмента: в легенде и в центре диаграммы при наведении */
  label: TextLike;
  /** Величина сегмента */
  value: number;
  /** Идентификатор сегмента — возвращается в колбэках клика */
  id?: string;
  /** Цвет сегмента (любое CSS-значение). По умолчанию — цвет палитры по индексу */
  color?: string;
};

export type PieChartOptions = {
  /** Заголовок диаграммы */
  title: string;
  /** Ширина в px. По умолчанию — 100% родителя */
  width?: number;
  /** Высота в px. По умолчанию — 100% родителя */
  height?: number;
  /** Заголовок основной легенды */
  legendTitle?: string;
  /** Размер типографики заголовка и легенд
   * @default 'l'
   */
  typographySize?: TypographySize;
};

export type PieChartAggregatedLegend = {
  /** Пункты агрегированной легенды */
  data: PieChartLegendItem[];
  /** Заголовок агрегированной легенды */
  title: string;
  /** Колбэк клика по пункту агрегированной легенды */
  onAggregatedLegendItemClick?(item: PieChartLegendItem): void;
};

export type PieChartProps = {
  /** Сегменты диаграммы */
  data: PieChartDataItem[];
  /** Настройки отображения */
  options: PieChartOptions;
  /** Колбэк клика по сегменту */
  onPieSegmentClick?(item: PieChartDataItem): void;
  /** Колбэк клика по пункту основной легенды */
  onLegendItemClick?(item: PieChartLegendItem): void;
  /** Дополнительная легенда справа от диаграммы — например, сводка по группам */
  aggregatedLegend?: PieChartAggregatedLegend;
  /** CSS-класс корня */
  className?: string;
};
