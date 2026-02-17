// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.470 4.470 L 6.240 5.700 6.240 9.231 L 6.240 12.761 4.380 15.240 C 3.357 16.604,2.520 17.728,2.520 17.740 C 2.520 17.751,6.786 17.760,12.000 17.760 C 17.214 17.760,21.480 17.751,21.480 17.740 C 21.480 17.728,20.643 16.604,19.620 15.240 L 17.760 12.761 17.760 9.230 L 17.760 5.700 16.530 4.470 L 15.300 3.240 12.000 3.240 L 8.700 3.240 7.470 4.470 M15.470 5.530 L 16.240 6.299 16.240 9.770 L 16.240 13.241 17.358 14.730 L 18.475 16.220 15.238 16.230 C 13.457 16.236,10.543 16.236,8.762 16.230 L 5.525 16.220 6.642 14.730 L 7.760 13.241 7.760 9.771 L 7.760 6.301 8.530 5.530 L 9.299 4.760 11.999 4.760 L 14.699 4.760 15.470 5.530 M11.000 20.000 L 11.000 20.760 12.000 20.760 L 13.000 20.760 13.000 20.000 L 13.000 19.240 12.000 19.240 L 11.000 19.240 11.000 20.000 " stroke="none" fill-rule="evenodd"></path>';

const BellSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bell';
  const symbolId = 'snack-uikit-product-icons-' + 'bell';
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
export default BellSpriteSVG;
