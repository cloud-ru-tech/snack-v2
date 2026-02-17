// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.281 C 9.259 3.432,7.316 4.326,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.640 3.114,11.340 3.281 M13.232 4.856 C 14.742 5.135,16.048 5.818,17.115 6.885 C 18.203 7.973,18.891 9.313,19.167 10.880 C 19.199 11.063,19.219 11.500,19.219 12.000 C 19.219 12.500,19.199 12.937,19.167 13.120 C 18.892 14.684,18.207 16.020,17.120 17.112 C 16.083 18.154,14.839 18.820,13.360 19.125 C 12.956 19.209,12.791 19.220,12.000 19.220 C 11.209 19.220,11.044 19.209,10.640 19.125 C 9.179 18.824,7.920 18.155,6.909 17.144 C 5.787 16.022,5.119 14.726,4.834 13.120 C 4.763 12.720,4.763 11.280,4.834 10.880 C 4.921 10.392,5.077 9.804,5.218 9.439 C 5.965 7.504,7.504 5.965,9.439 5.218 C 9.961 5.017,10.468 4.898,11.300 4.783 C 11.566 4.746,12.915 4.797,13.232 4.856 M11.756 6.801 C 11.402 6.860,11.069 7.112,10.887 7.457 C 10.795 7.633,10.781 7.707,10.781 8.020 C 10.781 8.333,10.795 8.407,10.887 8.583 C 11.210 9.197,11.961 9.442,12.572 9.132 C 12.765 9.035,13.002 8.794,13.113 8.583 C 13.205 8.407,13.219 8.333,13.219 8.020 C 13.219 7.707,13.205 7.633,13.113 7.457 C 12.852 6.963,12.321 6.705,11.756 6.801 M7.498 10.291 C 7.487 10.320,7.483 10.657,7.489 11.041 L 7.500 11.740 9.370 11.750 L 11.240 11.761 11.240 12.470 L 11.240 13.180 9.600 14.820 L 7.960 16.461 8.500 17.000 L 9.040 17.539 10.520 16.060 L 12.000 14.580 13.480 16.060 L 14.960 17.539 15.500 17.000 L 16.040 16.461 14.400 14.820 L 12.760 13.180 12.760 12.470 L 12.760 11.761 14.630 11.750 L 16.500 11.740 16.500 11.000 L 16.500 10.260 12.009 10.250 C 8.372 10.242,7.514 10.249,7.498 10.291 " stroke="none" fill-rule="evenodd"></path>';

const AccessibilitySpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-accessibility';
  const symbolId = 'snack-uikit-web-icons-' + 'accessibility';
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
export default AccessibilitySpriteSVG;
