// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.980 6.000 L 5.461 6.520 8.200 9.260 L 10.940 12.000 8.210 14.730 L 5.480 17.460 6.010 17.990 L 6.540 18.520 9.270 15.790 L 12.000 13.060 14.730 15.790 L 17.460 18.520 17.990 17.990 L 18.520 17.460 15.790 14.730 L 13.060 12.000 15.800 9.260 L 18.540 6.520 18.010 5.990 L 17.480 5.460 14.740 8.200 L 12.000 10.940 9.270 8.210 C 7.768 6.708,6.531 5.480,6.519 5.480 C 6.508 5.480,6.265 5.714,5.980 6.000 " stroke="none" fill-rule="evenodd"></path>';

const CloseSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-close';
  const symbolId = 'snack-uikit-product-icons-' + 'close';
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
export default CloseSpriteSVG;
