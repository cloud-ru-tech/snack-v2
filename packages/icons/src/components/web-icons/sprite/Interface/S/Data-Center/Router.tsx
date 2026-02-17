// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.280 C 9.269 3.429,7.313 4.328,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.645 3.115,11.340 3.280 M13.232 4.856 C 14.084 5.013,14.851 5.290,15.558 5.694 C 17.540 6.829,18.895 8.824,19.180 11.030 L 19.208 11.240 17.984 11.240 L 16.760 11.240 16.760 10.210 L 16.760 9.180 15.350 10.590 L 13.940 12.000 15.350 13.410 L 16.760 14.820 16.760 13.790 L 16.760 12.760 17.985 12.760 L 19.210 12.760 19.183 12.970 C 18.982 14.513,18.238 15.999,17.098 17.136 C 16.072 18.159,14.824 18.823,13.360 19.125 C 12.956 19.209,12.791 19.220,12.000 19.220 C 11.209 19.220,11.044 19.209,10.640 19.125 C 9.179 18.824,7.920 18.155,6.909 17.144 C 5.981 16.216,5.299 15.049,5.000 13.880 C 4.910 13.527,4.800 12.952,4.800 12.830 C 4.800 12.765,4.885 12.760,6.020 12.760 L 7.240 12.760 7.240 13.790 L 7.240 14.820 8.650 13.410 L 10.060 12.000 8.650 10.590 L 7.240 9.180 7.240 10.210 L 7.240 11.240 6.020 11.240 C 4.885 11.240,4.800 11.235,4.800 11.170 C 4.800 10.883,5.033 9.918,5.218 9.439 C 5.965 7.505,7.504 5.965,9.439 5.218 C 9.961 5.017,10.468 4.898,11.300 4.783 C 11.566 4.746,12.915 4.797,13.232 4.856 M10.580 7.360 L 9.180 8.760 10.210 8.760 L 11.240 8.760 11.240 12.000 L 11.240 15.240 10.210 15.240 L 9.180 15.240 10.590 16.650 L 12.000 18.060 13.410 16.650 L 14.820 15.240 13.790 15.240 L 12.760 15.240 12.760 12.000 L 12.760 8.760 13.790 8.760 L 14.820 8.760 13.420 7.360 C 12.650 6.590,12.011 5.960,12.000 5.960 C 11.989 5.960,11.350 6.590,10.580 7.360 " stroke="none" fill-rule="evenodd"></path>';

const RouterSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-router';
  const symbolId = 'snack-uikit-web-icons-' + 'router';
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
export default RouterSpriteSVG;
