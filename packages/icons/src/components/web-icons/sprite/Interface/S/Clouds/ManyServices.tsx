// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.520 3.282 C 9.582 3.436,7.832 4.594,6.922 6.325 C 6.617 6.905,6.476 7.335,6.297 8.230 C 6.285 8.288,6.249 8.320,6.198 8.320 C 5.836 8.320,4.940 8.605,4.368 8.901 C 2.797 9.716,1.728 11.142,1.357 12.920 C 1.287 13.254,1.269 13.475,1.269 14.000 C 1.269 14.525,1.287 14.746,1.357 15.080 C 1.602 16.256,2.127 17.240,2.944 18.056 C 3.750 18.863,4.707 19.377,5.900 19.645 C 6.299 19.735,6.313 19.735,10.650 19.750 L 15.000 19.764 15.000 19.002 L 15.000 18.240 13.880 18.240 L 12.760 18.240 12.760 11.540 C 12.760 4.926,12.761 4.840,12.838 4.840 C 12.881 4.840,13.065 4.887,13.248 4.945 C 14.379 5.302,15.280 6.074,15.810 7.140 C 16.118 7.761,16.240 8.341,16.240 9.190 L 16.240 9.760 16.790 9.760 C 17.093 9.760,17.506 9.787,17.709 9.820 C 18.671 9.976,19.616 10.519,20.273 11.293 L 20.403 11.446 21.003 10.998 C 21.531 10.602,21.596 10.542,21.550 10.485 C 20.919 9.716,20.354 9.258,19.523 8.841 C 19.099 8.628,18.466 8.420,18.043 8.353 C 17.769 8.310,17.714 8.289,17.701 8.221 C 17.536 7.375,17.381 6.901,17.078 6.325 C 16.804 5.804,16.483 5.370,16.055 4.944 C 14.844 3.736,13.236 3.146,11.520 3.282 M11.240 11.540 L 11.240 18.240 9.500 18.240 L 7.760 18.240 7.760 13.430 C 7.760 9.247,7.768 8.573,7.823 8.262 C 8.090 6.736,9.219 5.433,10.680 4.968 C 10.823 4.922,10.967 4.876,11.000 4.865 C 11.033 4.855,11.101 4.845,11.150 4.843 L 11.240 4.840 11.240 11.540 M6.240 14.000 C 6.240 18.056,6.238 18.160,6.164 18.160 C 6.123 18.160,5.965 18.122,5.814 18.076 C 4.241 17.595,3.100 16.322,2.823 14.738 C 2.496 12.870,3.427 11.043,5.140 10.190 C 5.294 10.113,5.537 10.013,5.680 9.968 C 5.823 9.922,5.967 9.876,6.000 9.865 C 6.033 9.855,6.100 9.845,6.150 9.843 L 6.240 9.840 6.240 14.000 M18.240 14.120 L 18.240 15.240 17.120 15.240 L 16.000 15.240 16.000 16.000 L 16.000 16.760 17.120 16.760 L 18.240 16.760 18.240 17.880 L 18.240 19.000 19.000 19.000 L 19.760 19.000 19.760 17.880 L 19.760 16.760 20.880 16.760 L 22.000 16.760 22.000 16.000 L 22.000 15.240 20.880 15.240 L 19.760 15.240 19.760 14.120 L 19.760 13.000 19.000 13.000 L 18.240 13.000 18.240 14.120 " stroke="none" fill-rule="evenodd"></path>';

const ManyServicesSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-many-services';
  const symbolId = 'snack-uikit-web-icons-' + 'many-services';
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
export default ManyServicesSpriteSVG;
