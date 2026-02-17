// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.400 3.281 C 8.743 3.461,6.257 4.921,4.729 7.200 C 4.416 7.667,3.968 8.567,3.772 9.120 C 3.018 11.250,3.085 13.550,3.962 15.630 C 4.133 16.035,4.569 16.856,4.635 16.897 C 4.650 16.906,4.913 16.752,5.221 16.555 C 5.528 16.358,5.806 16.181,5.839 16.162 C 5.887 16.133,5.847 16.028,5.613 15.573 C 5.265 14.896,5.150 14.607,5.000 14.033 C 4.647 12.687,4.691 11.117,5.119 9.833 C 5.786 7.835,7.190 6.262,9.072 5.404 C 11.407 4.340,14.204 4.607,16.228 6.087 L 16.436 6.239 16.878 5.659 C 17.121 5.340,17.320 5.065,17.320 5.047 C 17.320 5.011,16.793 4.649,16.413 4.424 C 14.990 3.582,13.151 3.163,11.400 3.281 M16.720 8.360 L 16.720 9.240 15.840 9.240 L 14.960 9.240 14.960 10.000 L 14.960 10.760 15.840 10.760 L 16.720 10.760 16.720 11.680 L 16.720 12.600 17.480 12.600 L 18.240 12.600 18.240 11.680 L 18.240 10.760 19.120 10.760 L 20.000 10.760 20.000 10.000 L 20.000 9.240 19.120 9.240 L 18.240 9.240 18.240 8.360 L 18.240 7.480 17.480 7.480 L 16.720 7.480 16.720 8.360 M8.000 9.270 C 8.000 9.286,7.838 10.547,7.640 12.071 C 7.442 13.595,7.280 14.866,7.280 14.895 C 7.280 14.937,7.450 14.913,8.010 14.792 C 10.180 14.326,11.553 14.718,11.817 15.878 C 11.895 16.221,11.900 16.923,11.826 17.164 C 11.599 17.903,11.066 18.371,10.320 18.485 C 9.668 18.584,8.415 18.452,7.667 18.206 L 7.445 18.132 7.178 18.776 C 7.031 19.130,6.902 19.442,6.891 19.469 C 6.865 19.536,6.995 19.583,7.706 19.761 C 8.480 19.955,8.859 20.000,9.700 19.998 C 10.986 19.996,11.666 19.766,12.353 19.103 C 13.169 18.317,13.501 17.302,13.363 16.020 C 13.234 14.824,12.681 14.013,11.655 13.516 C 11.075 13.234,10.123 13.055,9.370 13.086 C 9.097 13.098,9.040 13.090,9.040 13.040 C 9.040 13.007,9.103 12.495,9.180 11.901 C 9.257 11.308,9.320 10.809,9.320 10.792 C 9.320 10.775,10.225 10.756,11.330 10.750 L 13.340 10.740 13.340 10.000 L 13.340 9.260 10.670 9.250 C 9.201 9.244,8.000 9.253,8.000 9.270 M19.101 14.050 C 19.092 14.078,19.020 14.298,18.940 14.540 C 18.241 16.671,16.471 18.430,14.319 19.135 C 14.101 19.206,13.913 19.273,13.902 19.284 C 13.883 19.304,14.226 20.680,14.259 20.713 C 14.281 20.734,15.102 20.465,15.420 20.332 C 17.569 19.436,19.375 17.592,20.211 15.440 C 20.397 14.963,20.584 14.369,20.556 14.345 C 20.534 14.327,19.212 14.000,19.160 14.000 C 19.136 14.000,19.110 14.023,19.101 14.050 " stroke="none" fill-rule="evenodd"></path>';

const FivePlusSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-five-plus';
  const symbolId = 'snack-uikit-web-icons-' + 'five-plus';
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
export default FivePlusSpriteSVG;
