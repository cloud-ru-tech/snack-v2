// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.281 C 9.259 3.432,7.316 4.326,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.640 3.114,11.340 3.281 M16.863 8.500 C 17.280 8.940,17.643 9.329,17.671 9.365 C 17.715 9.422,17.263 9.876,14.115 12.939 L 10.508 16.447 8.294 14.234 C 7.076 13.016,6.085 12.006,6.091 11.988 C 6.097 11.970,6.479 11.561,6.941 11.078 L 7.780 10.201 9.120 11.540 C 9.857 12.277,10.471 12.880,10.484 12.880 C 10.498 12.880,11.739 11.684,13.244 10.222 C 15.778 7.761,15.985 7.570,16.043 7.632 C 16.078 7.670,16.447 8.060,16.863 8.500 " stroke="none" fill-rule="evenodd"></path>';

const NotifierSuccessFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-notifier-success-filled';
  const symbolId = 'snack-uikit-snack-icons-' + 'notifier-success-filled';
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
export default NotifierSuccessFilledSpriteSVG;
