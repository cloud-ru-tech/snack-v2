// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.040 3.806 C 10.174 3.894,9.065 4.202,8.270 4.573 C 6.477 5.411,4.968 6.882,4.124 8.614 C 2.773 11.384,3.000 14.587,4.727 17.150 C 5.156 17.786,5.880 18.556,6.580 19.120 C 6.778 19.280,6.946 19.427,6.954 19.447 C 6.962 19.467,6.566 19.878,6.074 20.360 L 5.180 21.236 7.470 21.238 L 9.760 21.240 9.760 18.996 L 9.760 16.752 8.911 17.571 L 8.063 18.391 7.577 17.996 C 6.118 16.811,5.250 15.449,4.904 13.800 C 4.638 12.533,4.752 11.030,5.201 9.896 C 5.396 9.404,5.777 8.697,6.071 8.280 C 6.390 7.829,7.132 7.068,7.580 6.734 C 8.896 5.751,10.339 5.275,12.000 5.275 C 14.040 5.275,15.767 5.993,17.200 7.436 C 18.296 8.540,18.980 9.921,19.182 11.434 C 19.330 12.545,19.181 13.858,18.799 14.824 C 18.604 15.315,18.224 16.022,17.929 16.440 C 17.612 16.890,16.826 17.693,16.389 18.014 C 15.175 18.905,13.967 19.334,12.310 19.463 L 12.000 19.487 12.000 20.223 L 12.000 20.960 12.318 20.960 C 13.637 20.960,15.393 20.432,16.634 19.662 C 17.401 19.187,18.208 18.486,18.780 17.800 C 20.171 16.131,20.896 13.890,20.729 11.770 C 20.557 9.594,19.671 7.719,18.094 6.196 C 16.248 4.413,13.662 3.536,11.040 3.806 M8.000 10.500 L 8.000 11.240 12.000 11.240 L 16.000 11.240 16.000 10.500 L 16.000 9.760 12.000 9.760 L 8.000 9.760 8.000 10.500 M8.000 14.500 L 8.000 15.240 11.960 15.240 L 15.920 15.240 15.920 14.500 L 15.920 13.760 11.960 13.760 L 8.000 13.760 8.000 14.500 " stroke="none" fill-rule="evenodd"></path>';

const HistorySpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-history';
  const symbolId = 'snack-uikit-web-icons-' + 'history';
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
export default HistorySpriteSVG;
