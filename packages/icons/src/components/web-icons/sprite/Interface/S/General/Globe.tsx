// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.281 C 9.259 3.432,7.316 4.326,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.640 3.114,11.340 3.281 M11.240 6.250 L 11.240 7.700 9.970 8.970 L 8.700 10.240 6.833 10.240 L 4.965 10.240 5.042 9.962 C 5.686 7.637,7.768 5.603,10.120 4.999 C 10.510 4.899,10.969 4.811,11.130 4.804 L 11.240 4.800 11.240 6.250 M13.474 4.905 C 14.840 5.185,16.131 5.890,17.141 6.909 C 18.458 8.236,19.240 10.090,19.240 11.882 L 19.240 12.240 16.970 12.240 L 14.700 12.240 12.970 13.970 L 11.240 15.700 11.240 17.450 L 11.240 19.200 11.130 19.200 C 11.070 19.200,10.810 19.156,10.554 19.102 C 9.153 18.811,7.906 18.141,6.909 17.144 C 5.575 15.810,4.852 14.182,4.772 12.330 L 4.748 11.760 7.024 11.760 L 9.300 11.760 11.030 10.030 L 12.760 8.300 12.760 6.545 L 12.760 4.790 12.970 4.817 C 13.085 4.832,13.312 4.872,13.474 4.905 M18.955 14.050 C 18.668 15.089,17.964 16.264,17.120 17.112 C 16.097 18.139,14.865 18.807,13.446 19.102 C 13.190 19.156,12.931 19.200,12.870 19.200 L 12.760 19.200 12.760 17.750 L 12.760 16.300 14.030 15.030 L 15.300 13.760 17.167 13.760 L 19.035 13.760 18.955 14.050 " stroke="none" fill-rule="evenodd"></path>';

const GlobeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-globe';
  const symbolId = 'snack-uikit-web-icons-' + 'globe';
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
export default GlobeSpriteSVG;
