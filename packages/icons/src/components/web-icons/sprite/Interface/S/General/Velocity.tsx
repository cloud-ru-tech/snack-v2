// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.360 3.279 C 8.813 3.464,6.532 4.672,4.984 6.654 C 4.045 7.857,3.428 9.424,3.281 10.980 C 3.257 11.243,3.240 12.802,3.240 14.860 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 14.860 C 20.760 11.327,20.745 10.904,20.596 10.126 C 20.368 8.941,19.762 7.609,19.016 6.654 C 17.597 4.836,15.515 3.644,13.240 3.345 C 12.647 3.267,11.891 3.241,11.360 3.279 M11.240 5.900 L 11.240 7.000 12.000 7.000 L 12.760 7.000 12.760 5.900 C 12.760 5.047,12.771 4.800,12.810 4.800 C 12.915 4.801,13.394 4.885,13.740 4.963 C 14.867 5.217,16.090 5.851,16.939 6.620 L 17.139 6.801 16.307 7.633 L 15.475 8.465 15.995 9.003 L 16.514 9.540 17.310 8.748 L 18.106 7.955 18.248 8.188 C 18.574 8.719,18.857 9.372,19.007 9.940 C 19.177 10.588,19.203 10.838,19.227 12.050 L 19.249 13.240 16.535 13.240 L 13.821 13.240 14.930 12.130 L 16.040 11.019 15.510 10.490 L 14.979 9.960 13.340 11.600 L 11.700 13.240 8.226 13.240 L 4.751 13.240 4.773 12.050 C 4.797 10.838,4.823 10.588,4.993 9.940 C 5.143 9.372,5.426 8.719,5.752 8.188 L 5.894 7.955 6.677 8.735 L 7.460 9.515 8.000 8.999 L 8.540 8.484 7.700 7.641 L 6.860 6.797 7.060 6.618 C 7.531 6.197,8.259 5.719,8.840 5.451 C 9.509 5.142,10.591 4.839,11.150 4.805 L 11.240 4.800 11.240 5.900 M19.240 16.230 L 19.240 17.701 18.470 18.470 L 17.699 19.240 12.000 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 16.230 L 4.760 14.760 12.000 14.760 L 19.240 14.760 19.240 16.230 " stroke="none" fill-rule="evenodd"></path>';

const VelocitySpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-velocity';
  const symbolId = 'snack-uikit-web-icons-' + 'velocity';
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
export default VelocitySpriteSVG;
