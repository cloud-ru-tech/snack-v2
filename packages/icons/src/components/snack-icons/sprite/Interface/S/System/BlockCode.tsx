// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M14.000 4.000 L 14.000 4.760 15.850 4.760 L 17.701 4.760 18.470 5.530 L 19.240 6.301 19.240 12.001 L 19.240 17.701 18.470 18.470 L 17.699 19.240 12.000 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 14.850 L 4.760 12.000 4.000 12.000 L 3.240 12.000 3.240 15.150 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 16.150 3.240 L 14.000 3.240 14.000 4.000 M4.200 5.740 L 2.940 7.000 4.210 8.270 L 5.480 9.540 6.010 9.010 L 6.539 8.480 5.800 7.740 L 5.061 7.000 5.800 6.260 L 6.539 5.520 6.020 5.000 C 5.735 4.714,5.492 4.480,5.480 4.480 C 5.469 4.480,4.893 5.047,4.200 5.740 M9.010 5.010 L 8.480 5.539 9.210 6.270 L 9.939 7.000 9.210 7.730 L 8.480 8.461 9.010 8.990 L 9.541 9.520 10.800 8.260 L 12.060 7.000 10.800 5.740 L 9.540 4.480 9.010 5.010 " stroke="none" fill-rule="evenodd"></path>';

const BlockCodeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-block-code';
  const symbolId = 'snack-uikit-snack-icons-' + 'block-code';
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
export default BlockCodeSpriteSVG;
