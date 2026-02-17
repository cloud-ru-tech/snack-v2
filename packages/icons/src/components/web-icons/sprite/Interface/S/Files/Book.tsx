// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.250 10.870 C 3.261 18.177,3.264 18.511,3.336 18.760 C 3.377 18.903,3.462 19.136,3.526 19.277 C 3.879 20.062,4.661 20.595,5.644 20.718 C 5.866 20.746,8.455 20.760,13.369 20.760 L 20.760 20.760 20.760 13.965 L 20.760 7.170 18.630 5.305 L 16.500 3.440 16.252 3.710 L 16.003 3.980 16.002 3.610 L 16.000 3.240 9.619 3.240 L 3.238 3.240 3.250 10.870 M6.240 7.480 C 6.240 8.976,6.249 10.200,6.260 10.200 C 6.271 10.200,6.892 9.894,7.640 9.520 L 9.000 8.840 10.360 9.520 C 11.108 9.894,11.729 10.200,11.740 10.200 C 11.751 10.200,11.760 8.976,11.760 7.480 L 11.760 4.760 13.500 4.760 L 15.240 4.760 15.240 12.001 L 15.240 19.241 10.430 19.231 L 5.620 19.220 5.420 19.128 C 5.159 19.008,4.987 18.837,4.873 18.585 L 4.780 18.380 4.770 11.570 L 4.759 4.760 5.500 4.760 L 6.240 4.760 6.240 7.480 M10.240 6.260 C 10.240 7.085,10.231 7.760,10.220 7.760 C 10.208 7.760,9.929 7.625,9.600 7.460 L 9.000 7.159 8.400 7.460 C 8.071 7.625,7.792 7.760,7.780 7.760 C 7.769 7.760,7.760 7.085,7.760 6.260 L 7.760 4.760 9.000 4.760 L 10.240 4.760 10.240 6.260 M18.115 6.840 L 19.237 7.820 19.238 13.530 L 19.240 19.240 18.000 19.240 L 16.760 19.240 16.760 12.457 L 16.760 5.674 16.876 5.767 C 16.940 5.818,17.497 6.301,18.115 6.840 M6.498 12.291 C 6.487 12.320,6.483 12.657,6.489 13.041 L 6.500 13.740 10.000 13.740 L 13.500 13.740 13.500 13.000 L 13.500 12.260 10.009 12.250 C 7.187 12.242,6.514 12.249,6.498 12.291 M6.498 15.291 C 6.487 15.320,6.483 15.657,6.489 16.041 L 6.500 16.740 10.000 16.740 L 13.500 16.740 13.500 16.000 L 13.500 15.260 10.009 15.250 C 7.187 15.242,6.514 15.249,6.498 15.291 " stroke="none" fill-rule="evenodd"></path>';

const BookSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-book';
  const symbolId = 'snack-uikit-web-icons-' + 'book';
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
export default BookSpriteSVG;
