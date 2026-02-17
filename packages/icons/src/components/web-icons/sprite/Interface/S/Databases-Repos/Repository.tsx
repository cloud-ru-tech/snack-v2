// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.149 3.283 C 8.300 3.412,5.673 4.331,4.332 5.668 C 3.858 6.140,3.538 6.654,3.354 7.242 L 3.260 7.540 3.260 12.000 L 3.260 16.460 3.354 16.758 C 3.787 18.139,5.027 19.202,7.068 19.942 C 7.908 20.247,8.911 20.484,9.920 20.617 C 10.367 20.677,11.485 20.760,11.829 20.760 L 12.000 20.760 12.000 20.006 L 12.000 19.253 11.290 19.226 C 8.813 19.132,6.439 18.339,5.393 17.256 C 5.085 16.937,5.016 16.843,4.889 16.572 C 4.783 16.347,4.780 16.315,4.767 15.526 L 4.754 14.713 4.967 14.873 C 6.059 15.694,7.936 16.355,9.920 16.617 C 10.367 16.677,11.485 16.760,11.829 16.760 L 12.000 16.760 12.000 16.006 L 12.000 15.253 11.290 15.226 C 8.813 15.132,6.439 14.339,5.393 13.256 C 5.085 12.937,5.016 12.843,4.889 12.572 C 4.783 12.347,4.780 12.315,4.767 11.526 L 4.754 10.713 4.967 10.873 C 5.471 11.252,6.229 11.638,7.068 11.942 C 10.028 13.016,13.972 13.016,16.932 11.942 C 17.769 11.638,18.529 11.252,19.030 10.875 L 19.240 10.717 19.240 11.859 L 19.240 13.000 20.002 13.000 L 20.763 13.000 20.750 10.270 C 20.736 7.238,20.748 7.379,20.458 6.764 C 19.655 5.061,17.301 3.821,14.040 3.382 C 13.662 3.331,12.002 3.228,11.860 3.247 C 11.838 3.250,11.518 3.266,11.149 3.283 M13.760 4.857 C 15.979 5.145,17.713 5.821,18.607 6.745 C 18.915 7.062,18.984 7.157,19.111 7.428 C 19.203 7.623,19.220 7.714,19.220 8.000 C 19.220 8.464,19.086 8.749,18.656 9.199 C 17.731 10.168,16.128 10.810,13.800 11.147 C 13.080 11.251,10.920 11.251,10.200 11.147 C 7.664 10.780,5.951 10.032,5.081 8.912 C 5.035 8.853,4.949 8.700,4.889 8.572 C 4.797 8.377,4.780 8.286,4.780 8.000 C 4.780 7.714,4.797 7.623,4.889 7.428 C 5.016 7.157,5.085 7.062,5.393 6.745 C 6.312 5.795,8.257 5.059,10.420 4.843 C 10.662 4.819,10.923 4.792,11.000 4.783 C 11.347 4.744,13.289 4.796,13.760 4.857 M14.240 17.500 L 14.240 20.760 18.000 20.760 L 21.760 20.760 21.760 18.000 L 21.760 15.240 20.029 15.240 L 18.299 15.240 17.800 14.740 L 17.301 14.240 15.771 14.240 L 14.240 14.240 14.240 17.500 M17.200 16.260 L 17.699 16.760 18.969 16.760 L 20.240 16.760 20.240 18.000 L 20.240 19.240 18.000 19.240 L 15.760 19.240 15.760 17.500 L 15.760 15.760 16.231 15.760 L 16.701 15.760 17.200 16.260 " stroke="none" fill-rule="evenodd"></path>';

const RepositorySpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-repository';
  const symbolId = 'snack-uikit-web-icons-' + 'repository';
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
export default RepositorySpriteSVG;
