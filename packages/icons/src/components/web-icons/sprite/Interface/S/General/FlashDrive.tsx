// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M13.940 3.600 L 12.300 5.240 11.400 5.240 L 10.500 5.240 6.370 9.370 L 2.240 13.500 2.240 14.700 L 2.240 15.900 5.170 18.830 L 8.100 21.760 9.294 21.760 L 10.487 21.760 14.644 17.633 L 18.800 13.505 18.800 12.583 L 18.800 11.660 20.430 10.030 L 22.060 8.400 18.840 5.180 C 17.069 3.409,15.611 1.960,15.600 1.960 C 15.589 1.960,14.842 2.698,13.940 3.600 M17.780 6.240 L 19.940 8.400 18.980 9.360 L 18.020 10.320 15.850 8.150 L 13.680 5.980 14.630 5.030 C 15.152 4.508,15.589 4.080,15.600 4.080 C 15.611 4.080,16.592 5.052,17.780 6.240 M14.790 9.210 L 17.280 11.700 17.280 12.301 L 17.280 12.902 13.583 16.571 L 9.887 20.240 9.293 20.240 L 8.700 20.240 6.230 17.770 L 3.760 15.300 3.760 14.700 L 3.760 14.100 7.430 10.431 L 11.100 6.762 11.620 6.750 C 11.906 6.743,12.176 6.733,12.220 6.729 C 12.278 6.722,12.991 7.411,14.790 9.210 M6.290 15.290 L 5.760 15.821 6.960 17.020 L 8.160 18.220 8.690 17.690 L 9.220 17.160 8.020 15.960 L 6.819 14.760 6.290 15.290 " stroke="none" fill-rule="evenodd"></path>';

const FlashDriveSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-flash-drive';
  const symbolId = 'snack-uikit-web-icons-' + 'flash-drive';
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
export default FlashDriveSpriteSVG;
