// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.980 8.000 L 7.461 8.520 9.200 10.260 L 10.940 12.000 9.210 13.730 L 7.480 15.460 8.010 15.990 L 8.540 16.520 10.270 14.790 L 12.000 13.060 13.730 14.790 L 15.460 16.520 15.990 15.990 L 16.520 15.460 14.790 13.730 L 13.060 12.000 14.790 10.270 L 16.520 8.540 15.990 8.010 L 15.460 7.480 13.730 9.210 L 12.000 10.940 10.270 9.210 C 9.318 8.258,8.530 7.480,8.519 7.480 C 8.508 7.480,8.265 7.714,7.980 8.000 " stroke="none" fill-rule="evenodd"></path>';

const CrossSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cross';
  const symbolId = 'snack-uikit-snack-icons-' + 'cross';
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
export default CrossSpriteSVG;
