// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M9.439 4.050 L 6.897 4.891 5.330 7.076 L 3.763 9.260 3.763 12.000 L 3.763 14.740 5.330 16.924 L 6.897 19.109 9.448 19.949 L 12.000 20.790 14.552 19.949 L 17.104 19.108 18.672 16.918 L 20.240 14.727 20.238 11.993 L 20.237 9.260 18.670 7.076 L 17.103 4.891 14.589 4.063 C 13.207 3.608,12.054 3.230,12.028 3.222 C 12.002 3.215,10.836 3.587,9.439 4.050 M14.120 5.492 L 16.180 6.180 17.469 7.980 L 18.758 9.780 18.758 12.000 L 18.758 14.220 17.469 16.020 L 16.180 17.820 14.089 18.516 L 11.998 19.212 9.909 18.516 L 7.820 17.820 6.531 16.020 L 5.242 14.220 5.242 12.000 L 5.242 9.780 6.531 7.980 L 7.820 6.180 9.880 5.492 C 11.013 5.113,11.967 4.804,12.000 4.804 C 12.033 4.804,12.987 5.113,14.120 5.492 M8.912 6.750 C 8.199 7.753,7.666 9.002,7.413 10.260 C 7.322 10.716,7.310 12.125,7.394 12.500 C 7.659 13.674,8.201 14.614,9.128 15.504 C 10.326 16.654,11.713 17.073,13.211 16.739 C 13.570 16.659,13.925 16.523,14.351 16.302 C 15.472 15.720,16.168 14.820,16.582 13.420 C 16.726 12.932,16.764 12.082,16.663 11.626 C 16.434 10.599,15.782 9.810,14.757 9.323 C 14.305 9.107,14.019 9.040,13.558 9.040 C 12.420 9.040,11.458 9.695,11.054 10.746 C 10.915 11.109,10.879 11.735,10.976 12.120 C 11.086 12.561,11.298 12.938,11.630 13.286 C 11.795 13.459,11.943 13.600,11.958 13.600 C 11.993 13.600,12.880 12.492,12.880 12.448 C 12.880 12.430,12.824 12.362,12.756 12.297 C 12.350 11.911,12.304 11.415,12.633 10.979 C 12.856 10.684,13.162 10.539,13.557 10.542 C 13.820 10.544,13.896 10.562,14.135 10.682 C 15.266 11.250,15.531 12.381,14.852 13.749 C 14.565 14.328,14.176 14.715,13.580 15.012 C 12.318 15.642,11.087 15.392,10.035 14.291 C 9.158 13.372,8.819 12.560,8.827 11.400 C 8.832 10.755,8.904 10.323,9.122 9.639 C 9.281 9.142,9.714 8.250,10.014 7.804 C 10.138 7.619,10.240 7.464,10.240 7.459 C 10.240 7.443,9.087 6.560,9.067 6.560 C 9.056 6.560,8.987 6.645,8.912 6.750 " stroke="none" fill-rule="evenodd"></path>';

const ComitetSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-comitet';
  const symbolId = 'snack-uikit-web-icons-' + 'comitet';
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
export default ComitetSpriteSVG;
