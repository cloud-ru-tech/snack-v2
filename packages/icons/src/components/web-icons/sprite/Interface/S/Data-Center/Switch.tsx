// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M18.470 5.530 L 19.240 6.299 19.240 9.979 L 19.240 13.659 18.789 13.209 L 18.339 12.760 12.000 12.760 L 5.661 12.760 5.211 13.209 L 4.760 13.659 4.760 9.980 L 4.760 6.301 5.530 5.530 L 6.299 4.760 11.999 4.760 L 17.699 4.760 18.470 5.530 M18.450 15.030 L 19.240 15.819 19.240 16.760 L 19.240 17.701 18.470 18.470 L 17.699 19.240 12.000 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 16.761 L 4.760 15.821 5.550 15.030 L 6.339 14.240 11.999 14.240 L 17.659 14.240 18.450 15.030 M6.498 16.291 C 6.487 16.320,6.483 16.657,6.489 17.041 L 6.500 17.740 7.250 17.751 L 8.000 17.762 8.000 17.001 L 8.000 16.240 7.259 16.240 C 6.692 16.240,6.513 16.252,6.498 16.291 M9.498 16.291 C 9.487 16.320,9.483 16.657,9.489 17.041 L 9.500 17.740 10.250 17.751 L 11.000 17.762 11.000 17.001 L 11.000 16.240 10.259 16.240 C 9.692 16.240,9.513 16.252,9.498 16.291 M13.000 17.000 L 13.000 17.762 13.750 17.751 L 14.500 17.740 14.500 17.000 L 14.500 16.260 13.750 16.249 L 13.000 16.238 13.000 17.000 M16.000 17.000 L 16.000 17.762 16.750 17.751 L 17.500 17.740 17.500 17.000 L 17.500 16.260 16.750 16.249 L 16.000 16.238 16.000 17.000 " stroke="none" fill-rule="evenodd"></path>';

const SwitchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-switch';
  const symbolId = 'snack-uikit-web-icons-' + 'switch';
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
export default SwitchSpriteSVG;
