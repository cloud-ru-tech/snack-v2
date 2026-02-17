// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M2.980 3.000 L 2.461 3.520 4.080 5.142 L 5.700 6.764 5.600 6.846 C 5.545 6.892,4.767 7.543,3.870 8.293 L 2.240 9.658 2.240 12.003 L 2.240 14.347 5.488 17.054 L 8.736 19.760 12.003 19.760 L 15.269 19.760 16.174 18.980 C 16.672 18.551,17.093 18.200,17.110 18.200 C 17.127 18.200,17.887 18.947,18.800 19.860 L 20.459 21.520 20.990 20.990 L 21.521 20.461 12.530 11.470 C 7.586 6.526,3.531 2.480,3.519 2.480 C 3.508 2.480,3.265 2.714,2.980 3.000 M9.000 5.000 L 9.000 5.760 11.870 5.761 L 14.740 5.761 17.489 8.051 L 20.238 10.340 20.239 12.001 L 20.240 13.662 19.641 14.161 C 19.312 14.435,19.042 14.674,19.041 14.692 C 19.040 14.710,19.250 14.974,19.507 15.280 C 19.970 15.831,19.974 15.835,20.062 15.766 C 20.111 15.727,20.513 15.391,20.955 15.019 L 21.760 14.342 21.760 12.001 L 21.760 9.660 18.510 6.950 L 15.260 4.241 12.130 4.241 L 9.000 4.240 9.000 5.000 M7.636 8.696 L 8.492 9.552 8.370 9.750 C 8.002 10.348,7.802 11.040,7.772 11.820 C 7.729 12.946,8.021 13.871,8.680 14.693 C 9.268 15.427,10.069 15.921,11.039 16.149 C 11.466 16.250,12.538 16.249,12.970 16.147 C 13.367 16.054,13.901 15.844,14.211 15.660 L 14.455 15.515 15.252 16.312 L 16.049 17.110 15.395 17.674 L 14.740 18.238 11.998 18.239 L 9.256 18.240 6.508 15.950 L 3.760 13.661 3.760 12.000 L 3.760 10.340 5.250 9.091 C 6.070 8.404,6.749 7.842,6.760 7.841 C 6.772 7.841,7.166 8.225,7.636 8.696 M11.494 12.554 L 13.367 14.427 13.173 14.510 C 12.750 14.691,12.517 14.736,12.000 14.737 C 11.590 14.737,11.446 14.721,11.200 14.645 C 10.713 14.495,10.374 14.295,10.036 13.959 C 9.698 13.623,9.453 13.190,9.335 12.720 C 9.249 12.374,9.248 11.661,9.334 11.328 C 9.406 11.052,9.555 10.680,9.595 10.680 C 9.609 10.680,10.463 11.523,11.494 12.554 " stroke="none" fill-rule="evenodd"></path>';

const EyeClosedSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-eye-closed';
  const symbolId = 'snack-uikit-snack-icons-' + 'eye-closed';
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
export default EyeClosedSpriteSVG;
