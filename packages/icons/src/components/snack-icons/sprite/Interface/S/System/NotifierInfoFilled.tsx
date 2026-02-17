// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.280 C 9.269 3.429,7.313 4.328,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.645 3.115,11.340 3.280 M13.480 7.260 L 13.480 8.760 12.000 8.760 L 10.520 8.760 10.520 7.260 L 10.520 5.760 12.000 5.760 L 13.480 5.760 13.480 7.260 M13.480 14.760 L 13.480 18.760 12.000 18.760 L 10.520 18.760 10.520 14.760 L 10.520 10.760 12.000 10.760 L 13.480 10.760 13.480 14.760 " stroke="none" fill-rule="evenodd"></path>';

const NotifierInfoFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-notifier-info-filled';
  const symbolId = 'snack-uikit-snack-icons-' + 'notifier-info-filled';
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
export default NotifierInfoFilledSpriteSVG;
