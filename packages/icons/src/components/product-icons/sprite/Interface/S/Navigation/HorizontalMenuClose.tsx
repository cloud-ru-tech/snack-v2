// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.440 7.000 L 6.440 7.760 12.000 7.760 L 17.560 7.760 17.560 7.000 L 17.560 6.240 12.000 6.240 L 6.440 6.240 6.440 7.000 M9.230 13.710 L 6.480 16.460 7.010 16.990 L 7.540 17.520 9.770 15.290 L 12.000 13.060 14.240 15.300 L 16.480 17.540 17.010 17.010 L 17.540 16.480 14.780 13.720 C 13.262 12.202,12.011 10.960,12.000 10.960 C 11.989 10.960,10.742 12.198,9.230 13.710 " stroke="none" fill-rule="evenodd"></path>';

const HorizontalMenuCloseSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-horizontal-menu-close';
  const symbolId = 'snack-uikit-product-icons-' + 'horizontal-menu-close';
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
export default HorizontalMenuCloseSpriteSVG;
