// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M14.760 4.180 L 14.760 6.180 12.850 8.090 L 10.940 10.000 12.470 11.530 L 14.000 13.060 15.910 11.150 L 17.820 9.241 19.810 9.230 L 21.800 9.220 18.280 5.700 L 14.760 2.180 14.760 4.180 M17.670 7.751 L 17.180 7.762 15.590 9.351 L 14.000 10.940 13.530 10.470 L 13.060 10.000 14.650 8.410 L 16.240 6.820 16.240 6.320 L 16.240 5.821 17.200 6.780 L 18.161 7.740 17.670 7.751 M4.980 7.000 L 4.461 7.521 10.460 13.520 L 16.459 19.520 16.990 18.990 L 17.521 18.461 11.530 12.470 C 8.236 9.176,5.531 6.480,5.519 6.480 C 5.508 6.480,5.265 6.714,4.980 7.000 M4.980 11.000 L 4.461 11.520 6.200 13.260 L 7.940 15.000 5.710 17.230 L 3.480 19.460 4.010 19.990 L 4.540 20.520 6.770 18.290 L 9.000 16.060 10.730 17.790 L 12.461 19.520 12.990 18.990 L 13.520 18.459 9.530 14.470 C 7.335 12.275,5.531 10.480,5.519 10.480 C 5.508 10.480,5.265 10.714,4.980 11.000 " stroke="none" fill-rule="evenodd"></path>';

const UnPinnedSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-un-pinned';
  const symbolId = 'snack-uikit-snack-icons-' + 'un-pinned';
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
export default UnPinnedSpriteSVG;
