// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M13.980 4.440 L 12.020 6.400 12.550 6.930 L 13.080 7.460 14.780 5.760 L 16.480 4.060 18.200 5.780 L 19.920 7.500 16.510 10.908 L 13.100 14.315 12.201 13.457 C 11.706 12.986,11.290 12.604,11.276 12.610 C 11.262 12.615,11.025 12.855,10.748 13.142 L 10.246 13.665 11.428 14.792 L 12.611 15.920 13.115 15.920 L 13.620 15.920 17.570 11.970 L 21.520 8.020 21.520 7.480 L 21.520 6.940 19.290 4.710 L 17.060 2.480 16.500 2.480 L 15.940 2.480 13.980 4.440 M10.314 8.108 C 10.236 8.120,9.186 9.160,6.354 12.030 L 2.500 15.934 2.489 16.496 L 2.478 17.057 4.709 19.289 L 6.940 21.520 7.480 21.520 L 8.020 21.520 9.990 19.550 L 11.960 17.579 11.450 17.070 C 11.169 16.789,10.921 16.560,10.900 16.560 C 10.878 16.560,10.104 17.316,9.180 18.240 L 7.500 19.920 5.782 18.202 L 4.065 16.485 6.423 14.098 C 7.719 12.786,9.230 11.253,9.780 10.692 L 10.780 9.672 11.675 10.526 C 12.167 10.996,12.582 11.385,12.598 11.391 C 12.613 11.397,12.854 11.161,13.133 10.866 L 13.639 10.329 12.463 9.205 L 11.286 8.080 10.853 8.086 C 10.615 8.089,10.372 8.099,10.314 8.108 " stroke="none" fill-rule="evenodd"></path>';

const LinkSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-link';
  const symbolId = 'snack-uikit-snack-icons-' + 'link';
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
export default LinkSpriteSVG;
