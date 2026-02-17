// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.564 9.416 C 5.477 12.416,2.955 14.887,2.958 14.906 C 2.962 14.925,4.080 16.024,5.444 17.350 L 7.922 19.760 13.681 19.760 L 19.440 19.760 19.440 19.000 L 19.440 18.240 16.369 18.230 L 13.298 18.220 17.187 14.440 L 21.076 10.660 20.788 10.375 C 20.539 10.129,14.931 4.686,14.379 4.154 L 14.177 3.960 8.564 9.416 M4.603 5.107 C 4.374 5.631,4.167 6.081,4.143 6.106 C 4.120 6.131,3.677 6.327,3.160 6.541 C 2.643 6.755,2.186 6.947,2.144 6.969 C 2.083 7.002,2.257 7.087,3.094 7.436 C 3.658 7.671,4.134 7.880,4.153 7.901 C 4.171 7.923,4.373 8.367,4.602 8.889 C 4.830 9.412,5.029 9.826,5.043 9.809 C 5.058 9.793,5.255 9.357,5.480 8.840 C 5.706 8.323,5.911 7.887,5.935 7.872 C 5.959 7.856,6.425 7.659,6.969 7.433 C 7.514 7.207,7.960 7.013,7.960 7.001 C 7.959 6.989,7.497 6.788,6.932 6.554 L 5.904 6.127 5.495 5.194 C 5.269 4.680,5.071 4.236,5.053 4.207 C 5.031 4.172,4.877 4.482,4.603 5.107 M17.052 8.838 L 18.923 10.656 18.592 10.982 C 18.225 11.343,13.878 15.559,13.613 15.812 L 13.447 15.970 11.093 13.681 C 9.799 12.421,8.740 11.379,8.740 11.365 C 8.740 11.351,9.964 10.149,11.460 8.694 L 14.179 6.047 14.680 6.534 C 14.956 6.801,16.023 7.838,17.052 8.838 M10.017 14.726 L 12.367 17.012 11.754 17.626 L 11.141 18.240 9.825 18.240 L 8.510 18.240 7.345 17.105 C 6.704 16.481,5.931 15.730,5.626 15.435 L 5.071 14.900 6.338 13.670 C 7.035 12.993,7.619 12.440,7.636 12.440 C 7.652 12.440,8.724 13.469,10.017 14.726 " stroke="none" fill-rule="evenodd"></path>';

const CleanSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-clean';
  const symbolId = 'snack-uikit-product-icons-' + 'clean';
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
export default CleanSpriteSVG;
