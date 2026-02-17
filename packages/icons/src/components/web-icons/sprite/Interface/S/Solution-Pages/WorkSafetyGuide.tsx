// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 9.630 C 3.240 15.537,3.240 15.521,3.453 16.140 C 3.572 16.489,3.762 16.868,3.973 17.180 C 4.190 17.499,4.678 17.982,5.000 18.193 C 5.143 18.288,6.776 19.124,8.630 20.052 L 12.000 21.740 15.370 20.052 C 17.223 19.124,18.857 18.288,19.000 18.193 C 19.882 17.613,20.535 16.572,20.702 15.480 C 20.750 15.162,20.760 14.208,20.760 9.650 L 20.760 4.200 20.000 4.200 L 19.240 4.200 19.240 9.711 C 19.240 15.124,19.239 15.227,19.159 15.514 C 19.003 16.076,18.697 16.540,18.271 16.861 C 18.111 16.981,16.927 17.596,15.011 18.554 L 12.001 20.060 10.160 19.140 C 8.090 18.106,8.231 18.213,8.417 17.813 C 8.593 17.435,8.363 17.463,11.458 17.439 C 14.095 17.418,14.190 17.414,14.490 17.330 C 15.215 17.127,15.610 16.908,16.070 16.455 C 16.331 16.198,16.430 16.067,16.537 15.835 C 16.715 15.448,16.777 15.116,16.748 14.707 C 16.682 13.764,16.154 12.989,15.300 12.580 C 14.671 12.278,14.629 12.273,12.740 12.240 C 11.019 12.210,10.878 12.196,10.617 12.037 C 10.455 11.939,10.400 11.807,10.400 11.524 C 10.400 11.081,10.536 10.856,10.918 10.668 L 11.178 10.540 13.339 10.520 L 15.500 10.500 15.510 8.630 L 15.521 6.760 16.600 6.760 L 17.680 6.760 17.680 5.480 L 17.680 4.200 15.840 4.200 L 14.000 4.200 14.000 6.600 L 14.000 9.000 12.810 9.000 C 11.134 9.001,10.754 9.056,10.103 9.393 C 9.734 9.585,9.332 9.983,9.167 10.321 C 8.698 11.280,8.826 12.380,9.482 13.036 C 9.756 13.310,9.992 13.442,10.461 13.584 C 10.819 13.692,10.825 13.693,12.500 13.721 C 14.249 13.751,14.321 13.758,14.680 13.941 C 14.906 14.056,15.052 14.209,15.157 14.440 C 15.254 14.654,15.267 15.032,15.183 15.195 C 15.098 15.359,14.818 15.596,14.585 15.703 C 14.072 15.937,14.133 15.932,11.138 15.957 L 8.376 15.980 8.072 16.130 C 7.905 16.213,7.677 16.362,7.566 16.462 C 7.327 16.677,7.066 17.062,6.977 17.330 L 6.914 17.520 6.436 17.276 C 6.173 17.142,5.850 16.952,5.719 16.853 C 5.303 16.540,4.995 16.071,4.841 15.514 C 4.762 15.228,4.760 15.121,4.760 10.431 L 4.760 5.640 8.600 5.640 L 12.440 5.640 12.440 4.900 L 12.440 4.160 7.840 4.160 L 3.240 4.160 3.240 9.630 " stroke="none" fill-rule="evenodd"></path>';

const WorkSafetyGuideSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-work-safety-guide';
  const symbolId = 'snack-uikit-web-icons-' + 'work-safety-guide';
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
export default WorkSafetyGuideSpriteSVG;
