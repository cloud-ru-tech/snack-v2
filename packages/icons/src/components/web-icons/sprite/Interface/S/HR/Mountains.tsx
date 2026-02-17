// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.760 6.681 L 11.760 10.122 10.957 11.365 C 10.516 12.049,10.160 12.612,10.167 12.618 C 10.302 12.722,11.352 13.373,11.390 13.376 C 11.419 13.378,11.680 13.013,11.971 12.563 C 12.262 12.114,12.518 11.745,12.539 11.743 C 12.567 11.741,16.965 17.696,18.850 20.288 C 18.895 20.350,18.959 20.313,19.490 19.919 C 19.815 19.678,20.079 19.467,20.079 19.450 C 20.078 19.434,18.539 17.324,16.659 14.762 L 13.240 10.104 13.240 9.432 L 13.240 8.760 16.617 8.750 L 19.995 8.740 18.976 7.382 C 18.416 6.635,17.966 6.001,17.977 5.974 C 17.991 5.937,19.708 3.626,19.971 3.290 C 20.002 3.250,19.179 3.240,15.885 3.240 L 11.760 3.240 11.760 6.681 M16.960 4.781 C 16.960 4.793,16.770 5.054,16.539 5.362 C 16.307 5.669,16.108 5.944,16.097 5.973 C 16.086 6.001,16.276 6.288,16.519 6.611 C 16.761 6.934,16.960 7.208,16.960 7.219 C 16.960 7.231,16.123 7.240,15.100 7.240 L 13.240 7.240 13.240 6.000 L 13.240 4.760 15.100 4.760 C 16.123 4.760,16.960 4.770,16.960 4.781 M5.483 15.899 C 4.073 17.889,2.920 19.534,2.920 19.555 C 2.920 19.575,3.132 19.740,3.390 19.923 C 3.649 20.105,3.916 20.296,3.984 20.347 L 4.108 20.440 6.077 17.660 C 7.160 16.131,8.060 14.880,8.076 14.880 C 8.092 14.880,8.985 16.104,10.060 17.600 C 11.135 19.096,12.026 20.320,12.041 20.320 C 12.109 20.320,13.219 19.486,13.209 19.442 C 13.194 19.376,8.108 12.285,8.073 12.282 C 8.059 12.281,6.893 13.908,5.483 15.899 " stroke="none" fill-rule="evenodd"></path>';

const MountainsSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-mountains';
  const symbolId = 'snack-uikit-web-icons-' + 'mountains';
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
export default MountainsSpriteSVG;
