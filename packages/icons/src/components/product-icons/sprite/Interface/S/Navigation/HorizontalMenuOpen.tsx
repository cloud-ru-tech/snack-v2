// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.498 6.291 C 6.487 6.320,6.483 6.657,6.489 7.041 L 6.500 7.740 12.000 7.740 L 17.500 7.740 17.500 7.000 L 17.500 6.260 12.009 6.250 C 7.558 6.242,6.514 6.249,6.498 6.291 M7.010 12.010 L 6.480 12.541 9.240 15.300 L 12.000 18.060 14.770 15.290 L 17.540 12.520 17.010 11.990 L 16.480 11.460 14.240 13.700 L 12.000 15.940 9.770 13.710 L 7.539 11.480 7.010 12.010 " stroke="none" fill-rule="evenodd"></path>';

const HorizontalMenuOpenSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-horizontal-menu-open';
  const symbolId = 'snack-uikit-product-icons-' + 'horizontal-menu-open';
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
export default HorizontalMenuOpenSpriteSVG;
