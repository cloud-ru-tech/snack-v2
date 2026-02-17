// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M12.000 4.000 L 12.000 4.760 14.850 4.760 L 17.699 4.760 18.470 5.530 L 19.240 6.299 19.240 9.270 L 19.240 12.240 15.740 12.240 L 12.240 12.240 12.240 15.740 L 12.240 19.240 9.270 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 14.850 L 4.760 12.000 4.000 12.000 L 3.240 12.000 3.240 15.150 L 3.240 18.300 4.470 19.530 L 5.700 20.760 13.230 20.760 L 20.760 20.760 20.760 13.230 L 20.760 5.700 19.530 4.470 L 18.300 3.240 15.150 3.240 L 12.000 3.240 12.000 4.000 M4.980 5.000 L 4.461 5.520 6.820 7.880 L 9.180 10.240 8.090 10.240 L 7.000 10.240 7.000 11.000 L 7.000 11.760 9.000 11.760 L 11.000 11.760 11.000 11.380 L 11.000 11.000 11.380 11.000 L 11.760 11.000 11.760 9.000 L 11.760 7.000 11.000 7.000 L 10.240 7.000 10.240 8.090 L 10.240 9.180 7.890 6.830 C 6.597 5.537,5.531 4.480,5.519 4.480 C 5.508 4.480,5.265 4.714,4.980 5.000 M19.240 16.500 L 19.240 19.240 16.500 19.240 L 13.760 19.240 13.760 16.500 L 13.760 13.760 16.500 13.760 L 19.240 13.760 19.240 16.500 " stroke="none" fill-rule="evenodd"></path>';

const MinimizeWindowSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-minimize-window';
  const symbolId = 'snack-uikit-web-icons-' + 'minimize-window';
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
export default MinimizeWindowSpriteSVG;
