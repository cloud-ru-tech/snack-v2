// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.970 5.970 L 3.240 8.700 3.240 12.000 L 3.240 15.300 5.970 18.030 L 8.700 20.760 12.000 20.760 L 15.300 20.760 18.030 18.030 L 20.760 15.300 20.760 12.000 L 20.760 8.700 18.030 5.970 L 15.300 3.240 12.000 3.240 L 8.700 3.240 5.970 5.970 M13.750 8.310 L 15.500 6.560 16.470 7.530 L 17.440 8.500 15.690 10.250 L 13.940 12.000 15.690 13.750 L 17.440 15.500 16.470 16.470 L 15.500 17.440 13.750 15.690 L 12.000 13.940 10.250 15.690 L 8.500 17.440 7.530 16.470 L 6.560 15.500 8.310 13.750 L 10.060 12.000 8.310 10.250 L 6.560 8.500 7.530 7.530 L 8.500 6.560 10.250 8.310 L 12.000 10.060 13.750 8.310 " stroke="none" fill-rule="evenodd"></path>';

const NotifierCriticalFilledSpriteSVG = forwardRef(
  ({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
    props.width = undefined;
    props.height = undefined;
    const testId = '-notifier-critical-filled';
    const symbolId = 'snack-uikit-snack-icons-' + 'notifier-critical-filled';
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
  },
);
export default NotifierCriticalFilledSpriteSVG;
