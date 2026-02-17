// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M15.249 3.250 L 15.260 4.500 16.000 4.500 L 16.740 4.500 16.751 3.250 L 16.761 2.000 16.000 2.000 L 15.239 2.000 15.249 3.250 M18.470 3.470 L 17.480 4.461 18.010 4.990 L 18.541 5.520 19.540 4.520 L 20.539 3.520 20.020 3.000 C 19.735 2.714,19.492 2.480,19.480 2.480 C 19.469 2.480,19.014 2.926,18.470 3.470 M9.700 7.870 C 5.520 8.874,2.093 9.700,2.085 9.706 C 2.071 9.716,4.787 19.441,4.811 19.464 C 4.830 19.484,14.610 21.923,14.621 21.911 C 14.626 21.905,15.238 18.381,15.979 14.080 C 16.721 9.779,17.337 6.210,17.349 6.150 C 17.360 6.090,17.354 6.041,17.335 6.043 C 17.316 6.044,13.880 6.867,9.700 7.870 M18.498 6.291 C 18.487 6.320,18.483 6.657,18.489 7.041 L 18.500 7.740 19.750 7.751 L 21.000 7.761 21.000 7.001 L 21.000 6.240 19.759 6.240 C 18.785 6.240,18.513 6.251,18.498 6.291 M13.893 8.656 C 11.119 11.658,5.776 17.343,5.763 17.308 C 5.753 17.281,5.338 15.807,4.840 14.032 L 3.934 10.803 4.857 10.581 C 9.604 9.435,14.070 8.365,14.113 8.363 C 14.143 8.361,14.044 8.493,13.893 8.656 M14.340 14.743 C 13.843 17.623,13.430 20.000,13.422 20.024 C 13.412 20.053,12.258 19.783,10.139 19.257 C 8.342 18.810,6.865 18.438,6.857 18.430 C 6.849 18.422,8.727 16.395,11.030 13.926 C 13.334 11.456,15.224 9.452,15.230 9.471 C 15.237 9.491,14.836 11.863,14.340 14.743 " stroke="none" fill-rule="evenodd"></path>';

const CursorSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cursor';
  const symbolId = 'snack-uikit-web-icons-' + 'cursor';
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
export default CursorSpriteSVG;
