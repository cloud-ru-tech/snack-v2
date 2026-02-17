// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.281 C 9.259 3.432,7.316 4.326,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.640 3.114,11.340 3.281 M10.295 5.010 C 10.278 5.038,10.208 5.150,10.138 5.260 C 9.938 5.575,9.463 6.503,9.287 6.920 C 8.775 8.136,8.431 9.478,8.312 10.723 L 8.263 11.240 6.531 11.240 C 4.909 11.240,4.800 11.236,4.800 11.170 C 4.800 11.048,4.910 10.473,5.000 10.120 C 5.599 7.774,7.613 5.710,9.955 5.041 C 10.277 4.949,10.334 4.944,10.295 5.010 M14.291 5.123 C 16.871 5.975,18.833 8.345,19.180 11.030 L 19.208 11.240 17.470 11.240 L 15.732 11.240 15.705 10.890 C 15.564 9.051,14.824 6.789,13.861 5.260 C 13.792 5.150,13.721 5.036,13.703 5.006 C 13.660 4.935,13.815 4.966,14.291 5.123 M12.144 5.372 C 12.568 5.951,13.157 7.058,13.477 7.880 C 13.840 8.811,14.126 10.013,14.185 10.857 L 14.212 11.240 12.000 11.240 L 9.788 11.240 9.815 10.857 C 9.902 9.620,10.361 8.068,11.020 6.780 C 11.374 6.087,11.924 5.203,12.000 5.203 C 12.011 5.203,12.076 5.279,12.144 5.372 M8.315 13.204 C 8.446 14.411,8.757 15.619,9.245 16.810 C 9.458 17.332,9.977 18.357,10.217 18.733 C 10.436 19.075,10.436 19.080,10.233 19.034 C 9.710 18.917,8.820 18.546,8.267 18.214 C 6.701 17.273,5.439 15.599,5.000 13.880 C 4.910 13.527,4.800 12.952,4.800 12.830 C 4.800 12.764,4.909 12.760,6.533 12.760 L 8.267 12.760 8.315 13.204 M14.187 13.050 C 14.079 14.319,13.598 15.888,12.923 17.180 C 12.643 17.716,12.223 18.424,12.081 18.600 L 12.000 18.700 11.919 18.600 C 11.777 18.424,11.357 17.716,11.077 17.180 C 10.397 15.880,9.922 14.327,9.813 13.050 L 9.788 12.760 12.000 12.760 L 14.212 12.760 14.187 13.050 M19.183 12.970 C 18.907 15.091,17.590 17.092,15.733 18.213 C 15.186 18.544,14.291 18.917,13.767 19.034 C 13.564 19.080,13.564 19.075,13.783 18.733 C 14.023 18.357,14.542 17.332,14.755 16.810 C 15.125 15.906,15.430 14.860,15.575 13.999 C 15.637 13.627,15.719 12.968,15.720 12.830 C 15.720 12.764,15.830 12.760,17.465 12.760 L 19.210 12.760 19.183 12.970 " stroke="none" fill-rule="evenodd"></path>';

const InternetSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-internet';
  const symbolId = 'snack-uikit-product-icons-' + 'internet';
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
export default InternetSpriteSVG;
