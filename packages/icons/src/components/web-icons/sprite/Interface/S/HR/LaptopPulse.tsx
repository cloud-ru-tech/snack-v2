// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 10.500 L 4.240 16.760 6.120 16.760 L 8.000 16.760 8.000 16.000 L 8.000 15.240 6.880 15.240 L 5.760 15.240 5.760 10.500 L 5.760 5.761 7.630 5.750 L 9.500 5.740 9.500 5.000 L 9.500 4.260 6.870 4.250 L 4.240 4.239 4.240 10.500 M15.180 4.268 C 13.960 4.324,12.754 4.761,11.740 5.514 C 11.608 5.612,11.341 5.847,11.146 6.036 C 10.063 7.090,9.422 8.432,9.281 9.940 C 9.257 10.198,9.240 11.700,9.240 13.570 L 9.240 16.760 12.430 16.760 C 14.300 16.760,15.802 16.743,16.060 16.719 C 16.776 16.652,17.516 16.452,18.173 16.146 C 19.422 15.566,20.566 14.422,21.146 13.173 C 22.028 11.275,21.929 9.124,20.881 7.421 C 20.293 6.463,19.340 5.529,18.412 4.998 C 17.506 4.480,16.335 4.215,15.180 4.268 M16.261 5.819 C 17.381 6.000,18.381 6.614,19.173 7.604 C 19.847 8.446,20.178 9.287,20.227 10.282 C 20.294 11.663,19.787 12.944,18.794 13.901 C 18.238 14.437,17.727 14.752,17.020 14.993 C 16.320 15.233,16.210 15.240,13.355 15.240 L 10.760 15.240 10.760 12.670 C 10.760 9.884,10.773 9.675,10.984 9.043 C 11.235 8.288,11.579 7.736,12.157 7.157 C 12.737 6.578,13.287 6.235,14.048 5.982 C 14.688 5.769,15.557 5.705,16.261 5.819 M16.183 9.926 L 14.429 11.848 13.484 10.904 L 12.539 9.960 12.000 10.500 L 11.461 11.040 12.961 12.541 L 14.461 14.041 16.741 11.541 C 17.994 10.167,19.020 9.028,19.020 9.011 C 19.020 8.984,18.164 8.181,17.998 8.052 C 17.946 8.011,17.671 8.295,16.183 9.926 M3.000 19.000 L 3.000 19.760 12.000 19.760 L 21.000 19.760 21.000 19.000 L 21.000 18.240 12.000 18.240 L 3.000 18.240 3.000 19.000 " stroke="none" fill-rule="evenodd"></path>';

const LaptopPulseSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-laptop-pulse';
  const symbolId = 'snack-uikit-web-icons-' + 'laptop-pulse';
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
export default LaptopPulseSpriteSVG;
