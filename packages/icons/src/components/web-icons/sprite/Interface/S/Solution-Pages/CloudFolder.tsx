// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 7.020 L 4.240 9.800 5.000 9.800 L 5.760 9.800 5.760 7.780 L 5.760 5.760 7.270 5.760 L 8.780 5.760 10.280 6.760 L 11.780 7.760 15.010 7.760 L 18.240 7.760 18.240 9.000 L 18.240 10.239 15.370 10.250 L 12.500 10.260 12.500 11.000 L 12.500 11.740 16.774 11.750 C 20.165 11.758,21.045 11.771,21.030 11.810 C 21.021 11.838,20.654 13.296,20.217 15.050 L 19.421 18.240 17.210 18.240 L 15.000 18.240 15.000 19.000 L 15.000 19.760 17.790 19.760 L 20.580 19.760 21.756 15.050 C 22.403 12.459,22.941 10.318,22.951 10.290 C 22.965 10.251,22.631 10.240,21.364 10.240 L 19.760 10.240 19.760 8.240 L 19.760 6.240 15.993 6.240 L 12.227 6.240 10.712 5.240 L 9.198 4.240 6.719 4.240 L 4.240 4.240 4.240 7.020 M7.634 11.083 C 6.322 11.223,5.196 12.249,4.842 13.625 C 4.801 13.783,4.789 13.793,4.530 13.880 C 3.992 14.060,3.612 14.309,3.174 14.770 C 2.823 15.140,2.601 15.508,2.442 15.985 C 1.990 17.341,2.339 18.742,3.367 19.697 C 3.786 20.086,4.328 20.367,4.883 20.481 C 5.235 20.554,5.441 20.559,8.000 20.559 C 11.075 20.559,11.155 20.553,11.770 20.269 C 13.382 19.524,14.132 17.722,13.555 15.980 C 13.399 15.509,13.177 15.140,12.826 14.770 C 12.388 14.309,12.008 14.060,11.470 13.880 C 11.211 13.793,11.199 13.783,11.158 13.625 C 10.985 12.953,10.675 12.420,10.176 11.940 C 9.731 11.511,9.024 11.161,8.480 11.101 C 8.043 11.053,7.935 11.050,7.634 11.083 M8.704 12.719 C 9.227 12.976,9.636 13.549,9.719 14.140 C 9.741 14.294,9.759 14.603,9.759 14.827 L 9.760 15.234 10.351 15.247 C 10.924 15.260,10.950 15.264,11.204 15.389 C 11.988 15.775,12.413 16.760,12.180 17.652 C 12.041 18.186,11.663 18.666,11.206 18.890 L 10.940 19.020 8.000 19.020 L 5.060 19.020 4.794 18.890 C 4.489 18.741,4.137 18.390,3.979 18.077 C 3.771 17.668,3.706 17.139,3.805 16.672 C 3.915 16.153,4.326 15.620,4.796 15.389 C 5.050 15.264,5.076 15.260,5.649 15.247 L 6.240 15.234 6.241 14.827 C 6.242 13.990,6.396 13.505,6.789 13.095 C 7.169 12.699,7.538 12.552,8.091 12.575 C 8.388 12.588,8.483 12.610,8.704 12.719 " stroke="none" fill-rule="evenodd"></path>';

const CloudFolderSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cloud-folder';
  const symbolId = 'snack-uikit-web-icons-' + 'cloud-folder';
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
export default CloudFolderSpriteSVG;
