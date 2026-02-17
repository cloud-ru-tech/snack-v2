// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.040 3.806 C 9.148 4.000,7.278 4.870,5.906 6.196 C 4.775 7.288,4.002 8.559,3.583 10.013 C 2.819 12.661,3.390 15.508,5.120 17.680 C 5.464 18.111,6.291 18.913,6.687 19.200 L 6.992 19.420 6.086 20.330 L 5.181 21.240 7.470 21.240 L 9.760 21.240 9.760 18.980 C 9.760 17.737,9.747 16.720,9.730 16.720 C 9.714 16.720,9.332 17.089,8.880 17.539 L 8.060 18.358 7.620 18.023 C 6.058 16.834,5.068 15.159,4.818 13.286 C 4.670 12.175,4.819 10.862,5.201 9.896 C 5.396 9.404,5.777 8.697,6.071 8.280 C 6.390 7.829,7.132 7.068,7.580 6.734 C 8.896 5.751,10.339 5.275,12.000 5.275 C 13.661 5.275,15.104 5.751,16.420 6.734 C 16.866 7.066,17.609 7.827,17.931 8.280 C 18.239 8.714,18.746 9.708,18.898 10.176 C 19.383 11.669,19.345 13.445,18.799 14.824 C 17.729 17.525,15.339 19.254,12.390 19.460 L 12.000 19.487 12.000 20.224 L 12.000 20.960 12.350 20.959 C 13.405 20.957,14.771 20.612,15.900 20.062 C 17.625 19.223,19.072 17.775,19.900 16.060 C 20.814 14.166,20.997 12.025,20.417 10.013 C 19.443 6.631,16.439 4.153,12.886 3.801 C 12.404 3.753,11.528 3.755,11.040 3.806 M11.250 10.350 L 11.260 13.060 12.000 13.060 L 12.740 13.060 12.750 10.350 L 12.761 7.640 12.000 7.640 L 11.239 7.640 11.250 10.350 M11.249 15.450 L 11.260 16.300 12.000 16.300 L 12.740 16.300 12.751 15.450 L 12.762 14.600 12.000 14.600 L 11.238 14.600 11.249 15.450 " stroke="none" fill-rule="evenodd"></path>';

const AlertBackupSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-alert-backup';
  const symbolId = 'snack-uikit-web-icons-' + 'alert-backup';
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
export default AlertBackupSpriteSVG;
