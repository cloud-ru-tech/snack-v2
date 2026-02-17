// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.280 C 9.649 3.401,7.949 4.055,6.622 5.095 L 6.384 5.282 6.172 5.072 L 5.960 4.863 6.129 4.691 L 6.298 4.519 5.769 3.989 L 5.240 3.460 4.350 4.350 L 3.460 5.240 3.989 5.769 L 4.519 6.298 4.691 6.129 C 4.786 6.036,4.881 5.960,4.903 5.960 C 4.925 5.960,5.027 6.045,5.130 6.150 L 5.317 6.340 5.112 6.600 C 4.198 7.765,3.567 9.242,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.677 15.474,4.818 17.465,6.548 18.844 C 7.443 19.558,8.552 20.125,9.660 20.434 C 12.260 21.160,15.028 20.631,17.240 18.986 C 17.727 18.623,18.583 17.768,18.946 17.280 C 21.304 14.112,21.306 9.872,18.949 6.727 L 18.669 6.353 18.863 6.157 C 18.970 6.049,19.075 5.960,19.097 5.960 C 19.119 5.960,19.214 6.036,19.309 6.129 L 19.481 6.298 20.011 5.769 L 20.540 5.240 19.650 4.350 L 18.760 3.460 18.231 3.989 L 17.702 4.519 17.872 4.692 L 18.043 4.866 17.820 5.076 L 17.598 5.286 17.409 5.141 C 16.732 4.620,15.815 4.101,15.062 3.812 C 13.978 3.397,12.555 3.194,11.340 3.280 M13.180 4.856 C 16.143 5.375,18.438 7.598,19.070 10.558 C 19.169 11.021,19.177 11.132,19.177 12.000 C 19.177 12.868,19.169 12.979,19.070 13.442 C 18.766 14.867,18.096 16.107,17.081 17.121 C 15.911 18.292,14.498 18.982,12.822 19.203 C 12.291 19.272,11.167 19.231,10.622 19.122 C 8.336 18.663,6.450 17.191,5.444 15.080 C 4.405 12.898,4.552 10.268,5.830 8.200 C 6.984 6.332,8.953 5.067,11.120 4.802 C 11.520 4.752,12.780 4.785,13.180 4.856 M11.249 6.750 L 11.260 7.500 12.000 7.500 L 12.740 7.500 12.751 6.750 L 12.762 6.000 12.000 6.000 L 11.238 6.000 11.249 6.750 M11.691 10.402 C 11.284 10.482,10.910 10.734,10.664 11.092 C 10.288 11.639,10.301 12.414,10.695 12.949 C 11.201 13.635,12.038 13.828,12.808 13.436 C 13.045 13.315,13.359 12.971,13.496 12.682 C 13.610 12.441,13.620 12.387,13.620 12.000 C 13.620 11.611,13.611 11.560,13.492 11.310 C 13.163 10.615,12.445 10.253,11.691 10.402 M5.800 12.000 L 5.800 12.762 6.470 12.751 L 7.140 12.740 7.140 12.000 L 7.140 11.260 6.470 11.249 L 5.800 11.238 5.800 12.000 M16.898 11.291 C 16.887 11.320,16.883 11.657,16.889 12.041 L 16.900 12.740 17.570 12.751 L 18.240 12.762 18.240 12.001 L 18.240 11.240 17.579 11.240 C 17.077 11.240,16.913 11.252,16.898 11.291 M11.240 17.260 L 11.240 18.000 12.000 18.000 L 12.760 18.000 12.760 17.260 L 12.760 16.520 12.000 16.520 L 11.240 16.520 11.240 17.260 " stroke="none" fill-rule="evenodd"></path>';

const StopwatchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-stopwatch';
  const symbolId = 'snack-uikit-web-icons-' + 'stopwatch';
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
export default StopwatchSpriteSVG;
