// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.887 3.883 L 5.835 5.600 4.537 5.600 L 3.240 5.600 3.240 11.660 L 3.240 17.720 7.240 17.720 L 11.240 17.720 11.240 18.980 L 11.240 20.240 9.120 20.240 L 7.000 20.240 7.000 21.000 L 7.000 21.760 12.000 21.760 L 17.000 21.760 17.000 21.000 L 17.000 20.240 14.880 20.240 L 12.760 20.240 12.760 18.980 L 12.760 17.720 16.760 17.720 L 20.760 17.720 20.760 11.660 L 20.760 5.600 19.463 5.600 L 18.165 5.600 15.099 3.880 C 13.412 2.934,12.011 2.162,11.986 2.163 C 11.961 2.165,10.566 2.939,8.887 3.883 M14.186 5.085 C 15.371 5.748,16.362 6.311,16.390 6.336 C 16.428 6.372,15.930 6.668,14.220 7.627 L 12.000 8.872 9.780 7.627 C 8.417 6.863,7.575 6.369,7.598 6.346 C 7.655 6.289,11.934 3.888,11.986 3.884 C 12.011 3.882,13.001 4.422,14.186 5.085 M6.520 7.517 L 7.220 7.912 7.240 9.636 L 7.260 11.359 9.630 12.655 L 12.000 13.951 14.380 12.649 L 16.759 11.348 16.770 9.630 L 16.780 7.912 17.480 7.517 L 18.180 7.122 18.710 7.121 L 19.240 7.120 19.240 11.660 L 19.240 16.200 12.000 16.200 L 4.760 16.200 4.760 11.660 L 4.760 7.120 5.290 7.121 L 5.820 7.122 6.520 7.517 M10.432 9.712 L 12.000 10.593 13.568 9.712 C 14.431 9.228,15.160 8.822,15.188 8.811 C 15.230 8.795,15.240 8.959,15.240 9.631 L 15.240 10.470 13.620 11.356 L 12.000 12.241 10.380 11.356 L 8.760 10.470 8.760 9.631 C 8.760 8.959,8.770 8.795,8.812 8.811 C 8.840 8.822,9.569 9.228,10.432 9.712 " stroke="none" fill-rule="evenodd"></path>';

const WebCourseSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-web-course';
  const symbolId = 'snack-uikit-web-icons-' + 'web-course';
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
export default WebCourseSpriteSVG;
