// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M14.760 4.180 L 14.760 6.180 13.230 7.710 L 11.700 9.240 8.699 9.240 L 5.699 9.240 4.820 10.120 L 3.940 11.000 5.940 13.000 L 7.940 15.000 5.710 17.230 L 3.480 19.460 4.010 19.990 L 4.540 20.520 6.770 18.290 L 9.000 16.060 11.000 18.060 L 13.000 20.060 13.880 19.180 L 14.760 18.301 14.760 15.300 L 14.760 12.300 16.290 10.770 L 17.820 9.241 19.810 9.230 L 21.800 9.220 18.280 5.700 L 14.760 2.180 14.760 4.180 M17.670 7.751 L 17.180 7.762 15.590 9.351 L 14.000 10.940 13.530 10.470 L 13.060 10.000 14.650 8.410 L 16.240 6.820 16.240 6.320 L 16.240 5.821 17.200 6.780 L 18.161 7.740 17.670 7.751 M12.470 11.530 L 13.240 12.299 13.240 15.002 L 13.240 17.705 13.119 17.821 L 12.997 17.937 9.530 14.470 L 6.063 11.003 6.179 10.881 L 6.295 10.760 8.997 10.760 L 11.699 10.760 12.470 11.530 " stroke="none" fill-rule="evenodd"></path>';

const PinnedSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-pinned';
  const symbolId = 'snack-uikit-snack-icons-' + 'pinned';
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
export default PinnedSpriteSVG;
