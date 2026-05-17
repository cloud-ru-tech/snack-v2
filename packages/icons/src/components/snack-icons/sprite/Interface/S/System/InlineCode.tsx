// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M13.260 4.850 C 13.185 5.064,9.285 18.778,9.295 18.789 C 9.337 18.830,10.701 19.194,10.722 19.170 C 10.756 19.130,14.722 5.229,14.705 5.211 C 14.692 5.199,13.318 4.800,13.289 4.800 C 13.283 4.800,13.270 4.822,13.260 4.850 M4.700 10.240 L 2.940 12.000 4.710 13.770 L 6.480 15.540 7.010 15.010 L 7.540 14.480 6.300 13.240 L 5.060 12.000 6.300 10.760 L 7.539 9.520 7.020 9.000 C 6.735 8.714,6.492 8.480,6.480 8.480 C 6.469 8.480,5.668 9.272,4.700 10.240 M17.010 9.010 L 16.480 9.540 17.710 10.770 L 18.940 12.000 17.710 13.230 L 16.480 14.461 17.010 14.990 L 17.541 15.520 19.300 13.760 L 21.060 12.000 19.300 10.240 L 17.540 8.480 17.010 9.010 " stroke="none" fill-rule="evenodd"></path>';

const InlineCodeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-inline-code';
  const symbolId = 'snack-uikit-snack-icons-' + 'inline-code';
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
export default InlineCodeSpriteSVG;
