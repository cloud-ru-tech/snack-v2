import uPlot from 'uplot';

import { SeriesColor } from '../../types';

/**
 * Цвет серий, созданных `useLayer`. Сам цвет — CSS-переменная темы, а canvas нужен готовый цвет,
 * поэтому его подставляет `InteractiveChart` по своей палитре (см. `resolveLayerColors`).
 * Функции stroke/fill не подходят: uPlot вызывает их при сборке легенды, пока график ещё не в DOM.
 */
export const layerColors = new WeakMap<Partial<uPlot.Series>, SeriesColor>();
