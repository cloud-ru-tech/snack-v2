// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M13.260 4.850 C 13.185 5.064,9.285 18.778,9.295 18.789 C 9.337 18.830,10.701 19.194,10.722 19.170 C 10.756 19.130,14.722 5.229,14.705 5.211 C 14.692 5.199,13.318 4.800,13.289 4.800 C 13.283 4.800,13.270 4.822,13.260 4.850 M5.200 9.740 L 2.940 12.000 5.200 14.260 L 7.459 16.520 7.990 15.990 L 8.520 15.461 6.790 13.730 L 5.060 12.000 6.800 10.260 L 8.539 8.520 8.020 8.000 C 7.735 7.714,7.492 7.480,7.480 7.480 C 7.469 7.480,6.443 8.497,5.200 9.740 M15.980 8.000 L 15.461 8.520 17.200 10.260 L 18.940 12.000 17.210 13.730 L 15.480 15.461 16.010 15.990 L 16.541 16.520 18.800 14.260 L 21.060 12.000 18.800 9.740 C 17.557 8.497,16.531 7.480,16.520 7.480 C 16.508 7.480,16.265 7.714,15.980 8.000 " stroke="none" fill-rule="evenodd"></path>';

const CodeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-code';
  const symbolId = 'snack-uikit-product-icons-' + 'code';
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
export default CodeSpriteSVG;
