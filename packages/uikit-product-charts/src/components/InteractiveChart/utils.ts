import { isBrowser } from '@ds/utils';
import Color from 'color';
import uPlot from 'uplot';

import { DRAW_STYLES, LINE_INTERPOLATIONS, PLOT_TYPES } from '../../constants';
import { ColorMap } from '../../shared';
import { DrawStyle, LineInterpolation, PlotType } from '../../types';
import { getBoxPlotOptions, getDefaultPlotOptions } from './configurations';

const LAYER_FILL_ALPHA = 0.1;

export function withAlpha(color: string, alpha: number): string {
  return new Color(color).alpha(alpha).rgb().string();
}

/** Толщина сетки в один физический пиксель. */
export function getHairlineWidth(): number {
  return isBrowser() ? 1 / window.devicePixelRatio : 1;
}

const noPath: uPlot.Series.PathBuilder = () => null;

function createPathBuilders() {
  const { linear, stepped, bars, spline } = uPlot.paths;

  return {
    [LINE_INTERPOLATIONS.Linear]: linear?.() ?? noPath,
    [LINE_INTERPOLATIONS.StepAfter]: stepped?.({ align: 1 }) ?? noPath,
    [LINE_INTERPOLATIONS.StepBefore]: stepped?.({ align: -1 }) ?? noPath,
    [LINE_INTERPOLATIONS.Spline]: spline?.() ?? noPath,
    [DRAW_STYLES.Bars]: bars?.({ size: [0.6, 100] }) ?? noPath,
    [DRAW_STYLES.BarsLeft]: bars?.({ size: [1], align: 1 }) ?? noPath,
    [DRAW_STYLES.BarsRight]: bars?.({ size: [1], align: -1 }) ?? noPath,
  };
}

let pathBuilders: ReturnType<typeof createPathBuilders> | undefined;

/** Отрисовщик серии по способу отрисовки и интерполяции. `points` и линия без интерполяции — только точки. */
export function getPathRenderer(drawStyle: DrawStyle, lineInterpolation?: LineInterpolation): uPlot.Series.PathBuilder {
  return (self, seriesIdx, idx0, idx1) => {
    pathBuilders ??= createPathBuilders();

    if (drawStyle === DRAW_STYLES.Line) {
      return lineInterpolation ? pathBuilders[lineInterpolation](self, seriesIdx, idx0, idx1) : null;
    }

    if (drawStyle === DRAW_STYLES.Points) {
      return null;
    }

    return pathBuilders[drawStyle](self, seriesIdx, idx0, idx1);
  };
}

/** Подставляет цвета палитры в серии, созданные `useLayer`. Остальные серии не трогает. */
export function resolveLayerColors(
  options: Partial<uPlot.Options> | undefined,
  colors: ColorMap,
  layerColors: WeakMap<Partial<uPlot.Series>, keyof ColorMap>,
): Partial<uPlot.Options> | undefined {
  if (!options?.series) {
    return options;
  }

  return {
    ...options,
    series: options.series.map(series => {
      const color = layerColors.get(series);

      return color ? { ...series, stroke: colors[color], fill: withAlpha(colors[color], LAYER_FILL_ALPHA) } : series;
    }),
  };
}

export function getBaseOptions(type: PlotType, computedColors: ColorMap): uPlot.Options {
  return type === PLOT_TYPES.BoxPlot
    ? getBoxPlotOptions({ computedColors })
    : getDefaultPlotOptions({ computedColors });
}
