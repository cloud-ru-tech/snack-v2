import { useMemo } from 'react';
import uPlot from 'uplot';

import { DRAW_STYLES } from '../../constants';
import { layerColors } from './layerColors';
import { UseLayerProps } from './types';
import { getPathRenderer } from './utils';

const LAYER_LINE_WIDTH = 2;

/** Серия uPlot в цветах палитры: линия цвета `color`, заливка — он же с прозрачностью. */
export function useLayer({ label, color, drawStyle, lineInterpolation }: UseLayerProps): Partial<uPlot.Series> {
  return useMemo(() => {
    const layer: Partial<uPlot.Series> = {
      label,
      width: LAYER_LINE_WIDTH,
      paths: getPathRenderer(drawStyle, lineInterpolation),
      // Без линии точки — единственное изображение серии, их показываем при любой плотности данных.
      ...(drawStyle === DRAW_STYLES.Points && { points: { show: true } }),
    };

    layerColors.set(layer, color);

    return layer;
  }, [color, drawStyle, label, lineInterpolation]);
}
