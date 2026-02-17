// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.252 4.432 L 5.764 5.620 5.762 6.626 L 5.760 7.632 4.500 8.640 L 3.240 9.648 3.240 12.000 L 3.240 14.352 4.500 15.360 L 5.760 16.368 5.760 17.361 L 5.760 18.355 7.250 19.556 L 8.740 20.758 12.000 20.758 L 15.260 20.758 16.750 19.556 L 18.240 18.355 18.240 17.361 L 18.240 16.368 19.500 15.360 L 20.760 14.352 20.760 12.000 L 20.760 9.648 19.500 8.640 L 18.240 7.632 18.238 6.626 L 18.236 5.620 16.743 4.430 L 15.250 3.240 11.995 3.242 L 8.740 3.243 7.252 4.432 M11.240 9.790 L 11.240 14.819 10.350 15.710 L 9.461 16.600 9.990 17.130 L 10.519 17.659 10.880 17.300 L 11.240 16.942 11.240 18.091 L 11.240 19.240 10.246 19.240 L 9.252 19.240 8.246 18.431 L 7.240 17.622 7.240 16.945 L 7.240 16.267 8.116 15.099 L 8.992 13.931 7.756 12.696 L 6.520 11.460 5.990 11.990 L 5.461 12.520 6.235 13.295 L 7.010 14.071 6.698 14.485 C 6.527 14.713,6.382 14.907,6.375 14.915 C 6.369 14.923,6.003 14.644,5.564 14.295 L 4.764 13.660 4.764 12.000 L 4.764 10.340 5.465 9.784 L 6.167 9.227 7.314 10.374 L 8.461 11.520 8.990 10.990 L 9.520 10.459 8.380 9.320 L 7.240 8.181 7.240 7.274 L 7.240 6.368 8.245 5.564 L 9.250 4.760 10.245 4.760 L 11.240 4.760 11.240 9.790 M15.755 5.564 L 16.760 6.368 16.760 7.274 L 16.760 8.181 15.620 9.320 L 14.480 10.459 15.010 10.990 L 15.539 11.520 16.686 10.374 L 17.833 9.227 18.535 9.784 L 19.236 10.340 19.236 12.000 L 19.236 13.660 18.436 14.295 C 17.997 14.644,17.631 14.923,17.625 14.915 C 17.618 14.907,17.473 14.713,17.302 14.485 L 16.990 14.071 17.765 13.295 L 18.539 12.520 18.010 11.990 L 17.480 11.460 16.244 12.696 L 15.008 13.931 15.884 15.099 L 16.760 16.267 16.760 16.945 L 16.760 17.622 15.754 18.431 L 14.748 19.240 13.754 19.240 L 12.760 19.240 12.760 14.330 L 12.760 9.421 13.710 8.470 L 14.659 7.520 14.130 6.990 L 13.601 6.461 13.180 6.880 L 12.760 7.299 12.760 6.029 L 12.760 4.760 13.755 4.760 L 14.750 4.760 15.755 5.564 " stroke="none" fill-rule="evenodd"></path>';

const AgentMemorySpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-agent-memory';
  const symbolId = 'snack-uikit-web-icons-' + 'agent-memory';
  const [useFallback, setUseFallback] = useState(false);
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById(symbolId)) {
      setUseFallback(true);
      if (typeof console !== 'undefined' && console.warn) {
        console.warn(`[@design-system/icons] Symbol "#${symbolId}" not found on page. Rendering inline fallback.`);
      }
    }
  }, [symbolId]);

  const isCustomSize = typeof size === 'number';
  if (isCustomSize) {
    if (!props.style) props.style = {};
    props.style.width = size + 'px';
    props.style.height = size + 'px';
  }
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={24}
      height={24}
      fill='currentColor'
      viewBox='0 0 24 24'
      data-test-id={'icon' + testId}
      {...props}
    >
      {useFallback ? <g dangerouslySetInnerHTML={{ __html: FALLBACK_SVG_INNER }} /> : <use href={'#' + symbolId} />}
    </svg>
  );
});
export default AgentMemorySpriteSVG;
