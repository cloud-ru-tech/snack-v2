// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M15.560 4.620 L 16.940 6.000 14.710 8.230 L 12.480 10.460 13.010 10.990 L 13.540 11.520 15.770 9.290 L 18.000 7.060 19.380 8.440 L 20.760 9.820 20.760 6.530 L 20.760 3.240 17.470 3.240 L 14.180 3.240 15.560 4.620 M19.240 5.460 C 19.240 5.845,19.235 6.160,19.230 6.160 C 19.224 6.160,18.905 5.845,18.520 5.460 L 17.821 4.760 18.530 4.760 L 19.240 4.760 19.240 5.460 M8.230 14.710 L 6.000 16.940 4.620 15.560 L 3.240 14.180 3.240 17.470 L 3.240 20.760 6.530 20.760 L 9.820 20.760 8.440 19.380 L 7.060 18.000 9.300 15.760 L 11.539 13.520 11.020 13.000 C 10.735 12.714,10.492 12.480,10.481 12.480 C 10.469 12.480,9.456 13.483,8.230 14.710 M5.480 18.540 L 6.179 19.240 5.470 19.240 L 4.760 19.240 4.760 18.540 C 4.760 18.155,4.765 17.840,4.770 17.840 C 4.776 17.840,5.095 18.155,5.480 18.540 " stroke="none" fill-rule="evenodd"></path>';

const ExpandSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-expand';
  const symbolId = 'snack-uikit-product-icons-' + 'expand';
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
export default ExpandSpriteSVG;
