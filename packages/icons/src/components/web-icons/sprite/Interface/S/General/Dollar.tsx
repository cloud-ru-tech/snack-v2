// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M11.240 5.995 L 11.240 7.229 10.859 7.257 C 10.138 7.310,9.766 7.463,9.360 7.876 C 9.068 8.171,8.913 8.455,8.817 8.867 C 8.765 9.089,8.756 9.326,8.770 10.140 C 8.785 11.050,8.794 11.163,8.876 11.400 C 9.104 12.055,9.540 12.458,10.254 12.671 C 10.418 12.720,10.792 12.737,12.104 12.756 L 13.747 12.780 13.906 12.891 C 14.203 13.096,14.240 13.217,14.240 13.965 C 14.239 14.617,14.239 14.621,14.121 14.826 C 14.056 14.940,13.943 15.075,13.871 15.126 L 13.740 15.220 11.370 15.231 L 9.000 15.242 9.000 16.001 L 9.000 16.760 10.120 16.760 L 11.240 16.760 11.240 18.000 L 11.240 19.240 8.770 19.240 L 6.299 19.240 5.530 18.470 L 4.760 17.699 4.760 12.000 L 4.760 6.301 5.530 5.530 L 6.299 4.760 8.770 4.760 L 11.240 4.760 11.240 5.995 M18.470 5.530 L 19.240 6.299 19.240 11.999 L 19.240 17.699 18.470 18.470 L 17.701 19.240 15.230 19.240 L 12.760 19.240 12.760 18.005 L 12.760 16.770 13.350 16.750 C 13.976 16.729,14.224 16.671,14.577 16.464 C 14.973 16.231,15.360 15.778,15.570 15.299 C 15.727 14.944,15.771 14.565,15.751 13.762 C 15.737 13.169,15.720 13.020,15.644 12.800 C 15.418 12.142,14.864 11.603,14.160 11.355 C 13.910 11.267,13.838 11.263,12.238 11.242 C 10.727 11.222,10.566 11.213,10.466 11.148 C 10.279 11.025,10.261 10.927,10.261 10.020 C 10.260 9.247,10.267 9.169,10.341 9.040 C 10.508 8.753,10.448 8.760,12.850 8.760 L 15.000 8.760 15.000 8.000 L 15.000 7.240 13.880 7.240 L 12.760 7.240 12.760 6.000 L 12.760 4.760 15.230 4.760 L 17.699 4.760 18.470 5.530 " stroke="none" fill-rule="evenodd"></path>';

const DollarSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-dollar';
  const symbolId = 'snack-uikit-web-icons-' + 'dollar';
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
export default DollarSpriteSVG;
