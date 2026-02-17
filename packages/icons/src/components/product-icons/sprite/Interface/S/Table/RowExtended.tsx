// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M9.730 5.210 L 7.480 7.460 8.010 7.990 L 8.540 8.520 10.270 6.790 L 12.000 5.060 13.730 6.790 L 15.461 8.520 15.990 7.990 L 16.520 7.459 14.270 5.210 C 13.032 3.972,12.011 2.960,12.000 2.960 C 11.989 2.960,10.967 3.973,9.730 5.210 M5.000 10.000 L 5.000 10.760 12.000 10.760 L 19.000 10.760 19.000 10.000 L 19.000 9.240 12.000 9.240 L 5.000 9.240 5.000 10.000 M5.000 14.000 L 5.000 14.760 12.000 14.760 L 19.000 14.760 19.000 14.000 L 19.000 13.240 12.000 13.240 L 5.000 13.240 5.000 14.000 M7.980 16.000 L 7.461 16.521 9.730 18.790 L 12.000 21.060 14.270 18.790 L 16.540 16.520 16.010 15.990 L 15.480 15.460 13.740 17.200 L 12.000 18.940 10.270 17.210 C 9.318 16.258,8.530 15.480,8.519 15.480 C 8.508 15.480,8.265 15.714,7.980 16.000 " stroke="none" fill-rule="evenodd"></path>';

const RowExtendedSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-row-extended';
  const symbolId = 'snack-uikit-product-icons-' + 'row-extended';
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
export default RowExtendedSpriteSVG;
