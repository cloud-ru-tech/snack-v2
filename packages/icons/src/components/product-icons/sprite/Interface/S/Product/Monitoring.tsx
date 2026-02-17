// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 8.850 20.760 L 12.000 20.760 12.000 20.000 L 12.000 19.240 9.150 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 12.000 L 4.760 6.299 5.530 5.530 L 6.301 4.760 12.000 4.760 L 17.699 4.760 18.470 5.530 L 19.240 6.299 19.240 9.150 L 19.240 12.000 20.000 12.000 L 20.760 12.000 20.760 8.850 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M7.240 12.000 L 7.240 17.000 8.000 17.000 L 8.760 17.000 8.760 12.000 L 8.760 7.000 8.000 7.000 L 7.240 7.000 7.240 12.000 M11.249 8.250 L 11.260 9.500 12.000 9.500 L 12.740 9.500 12.751 8.250 L 12.761 7.000 12.000 7.000 L 11.239 7.000 11.249 8.250 M15.249 8.250 L 15.260 9.500 16.000 9.500 L 16.740 9.500 16.751 8.250 L 16.761 7.000 16.000 7.000 L 15.239 7.000 15.249 8.250 M14.060 10.284 C 12.654 10.410,11.329 11.330,10.697 12.620 C 10.345 13.339,10.190 14.177,10.273 14.907 C 10.507 16.966,12.026 18.485,14.094 18.725 C 14.948 18.824,15.963 18.590,16.735 18.114 L 16.933 17.993 18.196 19.256 L 19.460 20.520 19.990 19.990 L 20.520 19.460 19.256 18.196 L 17.993 16.933 18.114 16.735 C 18.591 15.960,18.827 14.932,18.724 14.078 C 18.541 12.569,17.679 11.337,16.340 10.669 C 15.718 10.359,14.854 10.213,14.060 10.284 M15.100 11.820 C 15.446 11.892,15.950 12.138,16.234 12.374 C 17.220 13.189,17.522 14.570,16.963 15.700 C 16.696 16.240,16.213 16.731,15.707 16.978 C 15.000 17.322,14.000 17.323,13.294 16.978 C 12.989 16.830,12.604 16.517,12.369 16.228 C 11.252 14.851,11.725 12.781,13.331 12.018 C 13.855 11.769,14.508 11.696,15.100 11.820 " stroke="none" fill-rule="evenodd"></path>';

const MonitoringSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-monitoring';
  const symbolId = 'snack-uikit-product-icons-' + 'monitoring';
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
export default MonitoringSpriteSVG;
