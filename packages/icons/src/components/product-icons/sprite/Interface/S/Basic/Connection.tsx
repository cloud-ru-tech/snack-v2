// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M19.600 3.177 L 18.900 3.874 18.547 3.659 C 17.555 3.054,16.261 2.840,15.083 3.083 C 14.488 3.207,13.742 3.550,13.221 3.941 C 13.066 4.057,12.234 4.860,11.370 5.726 L 9.800 7.300 13.180 10.680 L 16.560 14.060 18.160 12.460 C 19.155 11.466,19.846 10.741,19.987 10.547 C 21.106 8.994,21.178 6.907,20.170 5.245 L 19.991 4.950 20.695 4.245 L 21.400 3.539 20.870 3.010 C 20.578 2.718,20.330 2.480,20.319 2.480 C 20.309 2.480,19.985 2.794,19.600 3.177 M16.940 4.572 C 17.870 4.836,18.682 5.517,19.079 6.364 C 19.284 6.803,19.364 7.196,19.364 7.760 C 19.364 8.519,19.188 9.094,18.782 9.656 C 18.685 9.790,18.146 10.359,17.583 10.920 L 16.560 11.940 14.240 9.620 L 11.920 7.300 12.970 6.248 C 13.604 5.613,14.126 5.125,14.287 5.017 C 14.593 4.812,15.018 4.627,15.327 4.564 C 15.444 4.540,15.576 4.512,15.620 4.502 C 15.779 4.466,16.745 4.517,16.940 4.572 M9.580 10.280 L 8.781 11.080 8.060 10.360 C 7.664 9.964,7.321 9.640,7.298 9.640 C 7.223 9.640,4.022 12.891,3.812 13.180 C 2.604 14.840,2.542 16.998,3.653 18.756 L 3.816 19.014 3.071 19.741 L 2.327 20.468 2.863 21.003 L 3.400 21.539 4.130 20.810 C 4.532 20.408,4.873 20.080,4.887 20.080 C 4.901 20.080,5.009 20.144,5.127 20.222 C 6.359 21.040,8.038 21.223,9.497 20.696 C 9.899 20.552,10.370 20.297,10.739 20.025 C 10.925 19.888,11.735 19.117,12.671 18.185 L 14.282 16.582 13.561 15.861 C 13.164 15.464,12.840 15.128,12.840 15.114 C 12.840 15.100,13.186 14.745,13.610 14.325 L 14.380 13.563 13.852 13.034 L 13.324 12.505 12.537 13.277 L 11.751 14.050 10.793 13.095 L 9.835 12.140 10.654 11.336 L 11.474 10.532 10.946 10.006 C 10.656 9.717,10.410 9.480,10.399 9.480 C 10.388 9.480,10.020 9.840,9.580 10.280 M9.751 14.171 L 12.163 16.583 11.091 17.644 C 10.485 18.246,9.893 18.794,9.728 18.910 C 9.387 19.148,8.966 19.333,8.553 19.425 C 8.118 19.523,7.349 19.512,6.940 19.404 C 5.344 18.980,4.279 17.527,4.373 15.900 C 4.414 15.197,4.647 14.547,5.042 14.038 C 5.249 13.771,7.242 11.760,7.299 11.760 C 7.322 11.760,8.425 12.845,9.751 14.171 " stroke="none" fill-rule="evenodd"></path>';

const ConnectionSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-connection';
  const symbolId = 'snack-uikit-product-icons-' + 'connection';
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
export default ConnectionSpriteSVG;
