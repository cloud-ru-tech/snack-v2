// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.240 11.460 L 6.240 17.000 7.000 17.000 L 7.760 17.000 7.760 11.460 L 7.760 5.920 7.000 5.920 L 6.240 5.920 6.240 11.460 M13.700 8.680 L 10.940 11.440 13.700 14.200 L 16.459 16.960 16.990 16.430 L 17.520 15.901 15.290 13.670 L 13.060 11.440 15.300 9.200 L 17.539 6.960 17.020 6.440 C 16.735 6.154,16.492 5.920,16.480 5.920 C 16.469 5.920,15.218 7.162,13.700 8.680 " stroke="none" fill-rule="evenodd"></path>';

const VerticalMenuCloseSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-vertical-menu-close';
  const symbolId = 'snack-uikit-product-icons-' + 'vertical-menu-close';
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
export default VerticalMenuCloseSpriteSVG;
