/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- хуки плагина uPlot вызываются только в браузере, после создания графика */
import uPlot from 'uplot';

import { TEST_IDS } from '../../../constants';
import { ColorMap, OTHER_COLORS } from '../../../shared';

const TOOLTIP_CURSOR_OFFSET = 15;
const TOOLTIP_RADIUS = '4px';

/** Превращает легенду uPlot в тултип, следующий за курсором. */
export function legendAsTooltipPlugin({ computedColors }: { computedColors: ColorMap }): uPlot.Plugin {
  let legendEl: HTMLElement | null = null;

  function init(u: uPlot) {
    legendEl = u.root.querySelector<HTMLElement>('.u-legend');

    if (!legendEl) {
      return;
    }

    const tooltip = legendEl;

    tooltip.classList.remove('u-inline');
    tooltip.dataset.testId = TEST_IDS.interactiveChart.tooltip;
    Object.assign(tooltip.style, {
      borderRadius: TOOLTIP_RADIUS,
      textAlign: 'left',
      pointerEvents: 'none',
      display: 'none',
      position: 'absolute',
      left: '0',
      top: '0',
      zIndex: '100',
      backgroundColor: computedColors[OTHER_COLORS.TooltipBackgroundColor],
      color: computedColors[OTHER_COLORS.TooltipColor],
    });

    tooltip.querySelectorAll<HTMLElement>('.u-marker').forEach(marker => {
      marker.style.display = 'none';
    });

    u.over.style.overflow = 'visible';
    u.over.appendChild(tooltip);
    u.over.addEventListener('mouseenter', () => {
      tooltip.style.display = '';
    });
    u.over.addEventListener('mouseleave', () => {
      tooltip.style.display = 'none';
    });
  }

  function update(u: uPlot) {
    if (legendEl) {
      legendEl.style.transform = `translate(${(u.cursor.left ?? 0) + TOOLTIP_CURSOR_OFFSET}px, ${u.cursor.top ?? 0}px)`;
    }
  }

  return {
    hooks: {
      init,
      setCursor: update,
    },
  };
}
