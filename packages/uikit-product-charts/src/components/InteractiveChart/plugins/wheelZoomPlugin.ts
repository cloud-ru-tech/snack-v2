/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- хуки плагина uPlot вызываются только в браузере, после создания графика */
import uPlot from 'uplot';

const MIDDLE_MOUSE_BUTTON = 1;

type Range = [min: number, max: number];

// Удерживает окно [nMin, nMax] внутри исходного диапазона [fMin, fMax].
function clamp(nRange: number, nMin: number, nMax: number, fRange: number, fMin: number, fMax: number): Range {
  if (nRange > fRange) {
    return [fMin, fMax];
  }

  if (nMin < fMin) {
    return [fMin, fMin + nRange];
  }

  if (nMax > fMax) {
    return [fMax - nRange, fMax];
  }

  return [nMin, nMax];
}

/** Zoom колесом мыши по обеим осям и pan средней кнопкой по оси X. */
export function wheelZoomPlugin({ factor = 0.75 }: { factor?: number }): uPlot.Plugin {
  function ready(u: uPlot) {
    const xMin = u.scales.x.min ?? 0;
    const xMax = u.scales.x.max ?? 0;
    const yMin = u.scales.y.min ?? 0;
    const yMax = u.scales.y.max ?? 0;
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const plot = u.over;
    const rect = plot.getBoundingClientRect();

    plot.addEventListener('mousedown', event => {
      if (event.button !== MIDDLE_MOUSE_BUTTON) {
        return;
      }

      event.preventDefault();

      const left0 = event.clientX;
      const scXMin0 = u.scales.x.min ?? 0;
      const scXMax0 = u.scales.x.max ?? 0;
      const xUnitsPerPx = u.posToVal(1, 'x') - u.posToVal(0, 'x');

      function handleMove(moveEvent: MouseEvent) {
        moveEvent.preventDefault();

        const dx = xUnitsPerPx * (moveEvent.clientX - left0);
        u.setScale('x', { min: scXMin0 - dx, max: scXMax0 - dx });
      }

      function handleUp() {
        document.removeEventListener('mousemove', handleMove);
        document.removeEventListener('mouseup', handleUp);
      }

      document.addEventListener('mousemove', handleMove);
      document.addEventListener('mouseup', handleUp);
    });

    plot.addEventListener('wheel', event => {
      event.preventDefault();

      const left = u.cursor.left ?? 0;
      const top = u.cursor.top ?? 0;
      const leftPct = left / rect.width;
      const btmPct = 1 - top / rect.height;
      const xVal = u.posToVal(left, 'x');
      const yVal = u.posToVal(top, 'y');
      const oxRange = (u.scales.x.max ?? 0) - (u.scales.x.min ?? 0);
      const oyRange = (u.scales.y.max ?? 0) - (u.scales.y.min ?? 0);
      const zoomIn = event.deltaY < 0;

      const nxRange = zoomIn ? oxRange * factor : oxRange / factor;
      const nxMin = xVal - leftPct * nxRange;
      const [xNextMin, xNextMax] = clamp(nxRange, nxMin, nxMin + nxRange, xRange, xMin, xMax);

      const nyRange = zoomIn ? oyRange * factor : oyRange / factor;
      const nyMin = yVal - btmPct * nyRange;
      const [yNextMin, yNextMax] = clamp(nyRange, nyMin, nyMin + nyRange, yRange, yMin, yMax);

      u.batch(() => {
        u.setScale('x', { min: xNextMin, max: xNextMax });
        u.setScale('y', { min: yNextMin, max: yNextMax });
      });
    });
  }

  return {
    hooks: {
      ready,
    },
  };
}
