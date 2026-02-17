// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.980 4.000 L 7.461 4.521 9.730 6.790 L 12.000 9.060 14.270 6.790 L 16.540 4.520 16.010 3.990 L 15.480 3.460 13.740 5.200 L 12.000 6.940 10.270 5.210 C 9.318 4.258,8.530 3.480,8.519 3.480 C 8.508 3.480,8.265 3.714,7.980 4.000 M5.701 10.285 C 5.367 10.333,5.062 10.498,4.769 10.787 C 4.359 11.192,4.184 11.720,4.278 12.270 C 4.347 12.671,4.482 12.930,4.776 13.224 C 5.070 13.518,5.329 13.653,5.730 13.722 C 6.056 13.778,6.429 13.726,6.753 13.579 C 7.032 13.452,7.452 13.032,7.579 12.753 C 7.874 12.102,7.768 11.365,7.304 10.851 C 6.887 10.391,6.329 10.193,5.701 10.285 M11.701 10.285 C 11.367 10.333,11.062 10.498,10.769 10.787 C 10.359 11.192,10.184 11.720,10.278 12.270 C 10.347 12.671,10.482 12.930,10.776 13.224 C 11.070 13.518,11.329 13.653,11.730 13.722 C 12.056 13.778,12.429 13.726,12.753 13.579 C 13.032 13.452,13.452 13.032,13.579 12.753 C 13.874 12.102,13.768 11.365,13.304 10.851 C 12.887 10.391,12.329 10.193,11.701 10.285 M17.701 10.285 C 17.367 10.333,17.062 10.498,16.769 10.787 C 16.359 11.192,16.184 11.720,16.278 12.270 C 16.347 12.671,16.482 12.930,16.776 13.224 C 17.070 13.518,17.329 13.653,17.730 13.722 C 18.056 13.778,18.429 13.726,18.753 13.579 C 19.032 13.452,19.452 13.032,19.579 12.753 C 19.874 12.102,19.768 11.365,19.304 10.851 C 18.887 10.391,18.329 10.193,17.701 10.285 M6.167 11.826 C 6.319 11.964,6.212 12.240,6.007 12.240 C 5.793 12.240,5.683 11.992,5.826 11.833 C 5.909 11.742,6.070 11.739,6.167 11.826 M12.167 11.826 C 12.319 11.964,12.212 12.240,12.007 12.240 C 11.793 12.240,11.683 11.992,11.826 11.833 C 11.909 11.742,12.070 11.739,12.167 11.826 M18.167 11.826 C 18.258 11.909,18.261 12.070,18.174 12.167 C 18.036 12.319,17.760 12.212,17.760 12.007 C 17.760 11.793,18.008 11.683,18.167 11.826 M9.730 17.210 L 7.480 19.460 8.010 19.990 L 8.540 20.520 10.270 18.790 L 12.000 17.060 13.730 18.790 L 15.461 20.520 15.990 19.990 L 16.520 19.459 14.270 17.210 C 13.032 15.972,12.011 14.960,12.000 14.960 C 11.989 14.960,10.967 15.973,9.730 17.210 " stroke="none" fill-rule="evenodd"></path>';

const RowExpandedSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-row-expanded';
  const symbolId = 'snack-uikit-product-icons-' + 'row-expanded';
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
export default RowExpandedSpriteSVG;
