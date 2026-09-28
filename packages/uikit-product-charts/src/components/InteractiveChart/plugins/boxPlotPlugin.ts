import uPlot from 'uplot';

import { ColorMap, getSeriesColorByIndex, OTHER_COLORS } from '../../../shared';
import { withAlpha } from '../utils';

type BoxPlotPluginOptions = {
  computedColors: ColorMap;
  gap?: number;
  bodyMaxWidth?: number;
  shadowWidth?: number;
};

const BODY_RADIUS = 8;
const MIN_BODY_HEIGHT = 8;
const MEDIAN_ALPHA = 0.5;

// Контур тела «ящика». Высота отрицательна (верх ящика выше по экрану), отсюда `y - radius`.
function fillRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y - radius);
  ctx.lineTo(x + width, y + height + radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height + radius);
  ctx.lineTo(x, y - radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
  ctx.fill();
}

/**
 * Рисует box plot поверх пустых серий: данные — `[x, min, q1, median, q3, max]`.
 * Стандартные линии и точки серий отключаются.
 */
export function boxPlotPlugin({
  computedColors,
  gap = 5,
  bodyMaxWidth = 60,
  shadowWidth = 3,
}: BoxPlotPluginOptions): uPlot.Plugin {
  const shadowColor = computedColors[OTHER_COLORS.ShadowColor];
  const lineColor = withAlpha(computedColors[OTHER_COLORS.LineColor], MEDIAN_ALPHA);

  function drawBoxes(u: uPlot) {
    const { ctx } = u;
    const [iMin, iMax] = u.series[0].idxs ?? [0, -1];
    const offset = (shadowWidth % 2) / 2;
    const value = (seriesIdx: number, i: number) => Number(u.data[seriesIdx][i]);

    ctx.save();
    ctx.translate(offset, offset);

    for (let i = iMin; i <= iMax; i++) {
      const xVal = u.scales.x.distr === 2 ? i : value(0, i);
      const xPos = u.valToPos(xVal, 'x', true);
      const openY = u.valToPos(value(1, i), 'y', true);
      const lowY = u.valToPos(value(2, i), 'y', true);
      const medianY = u.valToPos(value(3, i), 'y', true);
      const highY = u.valToPos(value(4, i), 'y', true);
      const closeY = u.valToPos(value(5, i), 'y', true);

      // Усы
      const shadowHeight = closeY - openY;
      const shadowX = xPos - shadowWidth / 2;
      const columnWidth = u.bbox.width / (iMax - iMin + 2);
      const bodyWidth = Math.min(bodyMaxWidth, columnWidth - gap);

      ctx.fillStyle = shadowColor;
      ctx.fillRect(Math.round(shadowX), Math.round(openY), Math.round(shadowWidth), Math.round(shadowHeight));
      ctx.fillRect(
        Math.round(xPos - bodyWidth / 4),
        Math.round(openY - shadowWidth / 2),
        Math.round(bodyWidth / 2),
        Math.round(shadowWidth),
      );
      ctx.fillRect(
        Math.round(xPos - bodyWidth / 4),
        Math.round(openY + shadowHeight - shadowWidth / 2),
        Math.round(bodyWidth / 2),
        Math.round(shadowWidth),
      );

      // Тело и медиана
      const bodyHeight = highY - lowY;
      const bodyX = xPos - bodyWidth / 2;

      if (Math.abs(bodyHeight) > MIN_BODY_HEIGHT) {
        ctx.fillStyle = computedColors[getSeriesColorByIndex(i)];
        fillRoundRect(
          ctx,
          Math.round(bodyX),
          Math.round(lowY),
          Math.round(bodyWidth),
          Math.round(bodyHeight),
          BODY_RADIUS,
        );

        ctx.fillStyle = lineColor;
        ctx.fillRect(Math.round(bodyX), medianY - shadowWidth / 2, Math.round(bodyWidth), Math.round(shadowWidth));
      }
    }

    ctx.translate(-offset, -offset);
    ctx.restore();
  }

  return {
    opts: (_, opts) => {
      uPlot.assign(opts, { cursor: { points: { show: false } } });

      opts.series.forEach(series => {
        series.paths = () => null;
        series.points = { show: false };
      });
    },
    hooks: {
      draw: drawBoxes,
    },
  };
}
