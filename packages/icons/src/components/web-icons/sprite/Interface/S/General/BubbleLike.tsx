// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.280 C 9.269 3.429,7.313 4.328,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.506 20.129,9.915 20.597,11.240 20.718 C 11.529 20.744,13.386 20.760,16.230 20.760 L 20.760 20.760 20.760 16.230 C 20.760 13.386,20.744 11.529,20.718 11.240 C 20.508 8.941,19.382 6.770,17.654 5.329 C 15.859 3.834,13.645 3.115,11.340 3.280 M13.232 4.856 C 14.742 5.135,16.048 5.818,17.115 6.885 C 18.258 8.027,18.973 9.473,19.179 11.052 C 19.230 11.448,19.240 12.147,19.240 15.383 L 19.240 19.243 15.130 19.230 L 11.020 19.217 10.554 19.111 C 9.097 18.781,7.900 18.135,6.909 17.144 C 5.787 16.022,5.119 14.726,4.834 13.120 C 4.763 12.720,4.763 11.280,4.834 10.880 C 4.921 10.392,5.077 9.804,5.218 9.439 C 5.965 7.504,7.504 5.965,9.439 5.218 C 9.961 5.017,10.468 4.898,11.300 4.783 C 11.566 4.746,12.915 4.797,13.232 4.856 M11.534 6.801 C 11.118 6.885,10.693 7.207,10.487 7.594 C 10.289 7.964,10.241 8.247,10.241 9.045 L 10.240 9.750 9.610 9.770 C 9.114 9.785,8.932 9.807,8.756 9.871 C 8.307 10.033,8.068 10.244,7.887 10.638 C 7.713 11.016,7.723 11.376,7.956 13.240 C 8.068 14.131,8.180 14.977,8.205 15.120 C 8.275 15.517,8.445 15.816,8.796 16.160 C 9.128 16.486,9.420 16.656,9.759 16.720 C 9.890 16.745,11.260 16.760,13.365 16.760 L 16.760 16.760 16.760 13.501 L 16.760 10.241 15.591 10.231 L 14.423 10.220 13.440 8.500 L 12.457 6.780 12.079 6.774 C 11.870 6.770,11.625 6.782,11.534 6.801 M12.716 10.270 L 13.566 11.760 14.403 11.760 L 15.240 11.760 15.240 13.500 L 15.240 15.240 12.618 15.240 L 9.997 15.240 9.843 15.090 L 9.688 14.940 9.461 13.126 C 9.337 12.128,9.246 11.300,9.260 11.286 C 9.275 11.272,9.843 11.254,10.523 11.247 L 11.760 11.235 11.760 9.928 C 11.760 8.829,11.768 8.635,11.813 8.701 C 11.842 8.744,12.249 9.450,12.716 10.270 " stroke="none" fill-rule="evenodd"></path>';

const BubbleLikeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bubble-like';
  const symbolId = 'snack-uikit-web-icons-' + 'bubble-like';
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
export default BubbleLikeSpriteSVG;
