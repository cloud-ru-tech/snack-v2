// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.980 7.000 L 11.461 7.520 13.700 9.760 L 15.940 12.000 13.710 14.230 L 11.480 16.461 12.010 16.990 L 12.541 17.520 15.300 14.760 L 18.060 12.000 15.300 9.240 C 13.782 7.722,12.531 6.480,12.520 6.480 C 12.508 6.480,12.265 6.714,11.980 7.000 M6.250 12.010 L 6.260 17.500 7.000 17.500 L 7.740 17.500 7.750 12.010 L 7.760 6.520 7.000 6.520 L 6.240 6.520 6.250 12.010 " stroke="none" fill-rule="evenodd"></path>';

const VerticalMenuOpenSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-vertical-menu-open';
  const symbolId = 'snack-uikit-product-icons-' + 'vertical-menu-open';
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
export default VerticalMenuOpenSpriteSVG;
