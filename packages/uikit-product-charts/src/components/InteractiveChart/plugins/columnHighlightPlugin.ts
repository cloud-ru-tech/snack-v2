/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- хуки плагина uPlot вызываются только в браузере, после создания графика */
import uPlot from 'uplot';

import { ColorMap, OTHER_COLORS } from '../../../shared';
import { withAlpha } from '../utils';

const HIGHLIGHT_ALPHA = 0.5;

/** Подсвечивает столбец под курсором вместо перекрестия. */
export function columnHighlightPlugin({ computedColors }: { computedColors: ColorMap }): uPlot.Plugin {
  const backgroundColor = withAlpha(computedColors[OTHER_COLORS.ColumnHighlightColor], HIGHLIGHT_ALPHA);
  let highlightEl: HTMLDivElement | undefined;
  let currentIdx: number | null | undefined;

  function init(u: uPlot) {
    const element = document.createElement('div');

    Object.assign(element.style, {
      pointerEvents: 'none',
      display: 'none',
      position: 'absolute',
      left: '0',
      top: '0',
      height: '100%',
      backgroundColor,
    });

    u.under.appendChild(element);
    u.over.addEventListener('mouseenter', () => {
      element.style.display = '';
    });
    u.over.addEventListener('mouseleave', () => {
      element.style.display = 'none';
    });

    highlightEl = element;
  }

  function update(u: uPlot) {
    if (!highlightEl || currentIdx === u.cursor.idx) {
      return;
    }

    currentIdx = u.cursor.idx;

    const xMin = u.scales.x.min ?? 0;
    const xMax = u.scales.x.max ?? 0;
    const width = u.bbox.width / (xMax - xMin) / devicePixelRatio;
    const left = u.valToPos(currentIdx ?? 0, 'x') - width / 2;

    highlightEl.style.transform = `translateX(${Math.round(left)}px)`;
    highlightEl.style.width = `${Math.round(width)}px`;
  }

  return {
    opts: (_, opts) => {
      uPlot.assign(opts, { cursor: { x: false, y: false } });
    },
    hooks: {
      init,
      setCursor: update,
    },
  };
}
