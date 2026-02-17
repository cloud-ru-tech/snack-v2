// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.000 4.000 L 8.000 4.760 11.864 4.760 L 15.728 4.760 16.482 5.530 L 17.236 6.300 17.238 10.650 L 17.240 15.000 18.000 15.000 L 18.760 15.000 18.760 10.357 L 18.760 5.714 17.550 4.477 L 16.341 3.240 12.170 3.240 L 8.000 3.240 8.000 4.000 M3.980 4.000 L 3.461 4.520 4.350 5.410 L 5.240 6.301 5.240 12.301 L 5.240 18.300 6.470 19.530 L 7.700 20.760 12.000 20.760 L 16.299 20.760 17.150 19.910 L 18.000 19.061 18.730 19.790 L 19.461 20.520 19.990 19.990 L 20.520 19.459 12.530 11.470 C 8.135 7.075,4.531 3.480,4.519 3.480 C 4.508 3.480,4.265 3.714,3.980 4.000 M16.320 18.620 L 15.701 19.240 12.000 19.240 L 8.299 19.240 7.530 18.470 L 6.760 17.699 6.760 12.760 L 6.760 7.820 11.850 12.910 L 16.939 18.000 16.320 18.620 M11.000 17.000 L 11.000 17.760 12.000 17.760 L 13.000 17.760 13.000 17.000 L 13.000 16.240 12.000 16.240 L 11.000 16.240 11.000 17.000 " stroke="none" fill-rule="evenodd"></path>';

const NoPhoneSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-no-phone';
  const symbolId = 'snack-uikit-product-icons-' + 'no-phone';
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
export default NoPhoneSpriteSVG;
