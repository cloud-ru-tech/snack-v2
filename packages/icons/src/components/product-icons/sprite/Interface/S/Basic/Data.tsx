// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.328 6.299 C 4.791 8.045,2.712 9.483,2.708 9.496 C 2.703 9.508,3.501 10.069,4.480 10.742 C 5.459 11.415,6.265 11.979,6.271 11.995 C 6.277 12.012,5.481 12.609,4.503 13.323 C 3.524 14.036,2.727 14.633,2.732 14.650 C 2.743 14.690,11.951 20.880,12.000 20.880 C 12.050 20.880,21.257 14.689,21.267 14.650 C 21.271 14.633,20.475 14.035,19.498 13.320 C 18.522 12.605,17.726 12.008,17.731 11.992 C 17.736 11.977,18.534 11.419,19.505 10.752 C 20.475 10.086,21.268 9.522,21.266 9.500 C 21.261 9.448,12.056 3.119,11.990 3.123 C 11.963 3.124,9.864 4.554,7.328 6.299 M15.317 7.191 C 17.130 8.439,18.615 9.478,18.616 9.500 C 18.619 9.549,12.034 14.083,11.983 14.067 C 11.877 14.034,5.366 9.534,5.375 9.500 C 5.386 9.463,11.956 4.923,12.000 4.923 C 12.011 4.923,13.504 5.944,15.317 7.191 M9.800 14.400 C 10.984 15.214,11.974 15.880,12.000 15.880 C 12.026 15.880,13.018 15.212,14.205 14.396 C 15.392 13.580,16.387 12.922,16.416 12.933 C 16.488 12.961,18.658 14.561,18.668 14.594 C 18.680 14.633,12.070 19.057,12.000 19.057 C 11.942 19.057,5.325 14.640,5.323 14.600 C 5.322 14.573,7.571 12.926,7.614 12.923 C 7.632 12.921,8.616 13.586,9.800 14.400 " stroke="none" fill-rule="evenodd"></path>';

const DataSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-data';
  const symbolId = 'snack-uikit-product-icons-' + 'data';
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
export default DataSpriteSVG;
