// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.470 4.470 L 5.240 5.700 5.240 12.000 L 5.240 18.300 6.470 19.530 L 7.700 20.760 12.000 20.760 L 16.300 20.760 17.530 19.530 L 18.760 18.300 18.760 12.007 L 18.760 5.714 17.550 4.477 L 16.341 3.240 12.020 3.240 L 7.700 3.240 6.470 4.470 M16.482 5.530 L 17.236 6.300 17.238 12.000 L 17.240 17.699 16.470 18.470 L 15.701 19.240 12.000 19.240 L 8.299 19.240 7.530 18.470 L 6.760 17.699 6.760 12.000 L 6.760 6.301 7.530 5.530 L 8.299 4.760 12.013 4.760 L 15.728 4.760 16.482 5.530 M9.000 7.000 L 9.000 7.760 12.000 7.760 L 15.000 7.760 15.000 7.000 L 15.000 6.240 12.000 6.240 L 9.000 6.240 9.000 7.000 M11.000 17.000 L 11.000 17.760 12.000 17.760 L 13.000 17.760 13.000 17.000 L 13.000 16.240 12.000 16.240 L 11.000 16.240 11.000 17.000 " stroke="none" fill-rule="evenodd"></path>';

const MobilePhoneSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-mobile-phone';
  const symbolId = 'snack-uikit-product-icons-' + 'mobile-phone';
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
export default MobilePhoneSpriteSVG;
