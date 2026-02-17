// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.970 3.970 L 3.240 4.701 3.240 6.500 L 3.240 8.298 3.589 8.649 L 3.938 9.000 3.589 9.351 L 3.240 9.702 3.240 12.000 L 3.240 14.298 3.589 14.649 L 3.938 15.000 3.589 15.351 L 3.240 15.702 3.240 17.501 L 3.240 19.301 3.970 20.030 L 4.701 20.760 12.001 20.760 L 19.301 20.760 20.030 20.030 L 20.760 19.299 20.760 17.500 L 20.760 15.702 20.411 15.351 L 20.062 15.000 20.411 14.649 L 20.760 14.298 20.760 12.000 L 20.760 9.702 20.411 9.351 L 20.062 9.000 20.411 8.649 L 20.760 8.298 20.760 6.499 L 20.760 4.699 20.030 3.970 L 19.299 3.240 11.999 3.240 L 4.699 3.240 3.970 3.970 M18.969 5.029 L 19.240 5.298 19.240 6.498 L 19.240 7.698 18.971 7.969 L 18.702 8.240 12.002 8.240 L 5.302 8.240 5.031 7.971 L 4.760 7.702 4.760 6.502 L 4.760 5.302 5.029 5.031 L 5.298 4.760 11.998 4.760 L 18.698 4.760 18.969 5.029 M7.000 6.500 L 7.000 7.240 7.760 7.240 L 8.520 7.240 8.520 6.500 L 8.520 5.760 7.760 5.760 L 7.000 5.760 7.000 6.500 M12.000 6.500 L 12.000 7.240 14.780 7.240 L 17.560 7.240 17.560 6.500 L 17.560 5.760 14.780 5.760 L 12.000 5.760 12.000 6.500 M18.969 10.029 L 19.240 10.298 19.240 11.998 L 19.240 13.698 18.971 13.969 L 18.702 14.240 12.002 14.240 L 5.302 14.240 5.031 13.971 L 4.760 13.702 4.760 12.002 L 4.760 10.302 5.029 10.031 L 5.298 9.760 11.998 9.760 L 18.698 9.760 18.969 10.029 M7.000 12.000 L 7.000 12.762 7.750 12.751 L 8.500 12.740 8.500 12.000 L 8.500 11.260 7.750 11.249 L 7.000 11.238 7.000 12.000 M12.000 12.000 L 12.000 12.761 14.770 12.750 L 17.540 12.740 17.540 12.000 L 17.540 11.260 14.770 11.250 L 12.000 11.239 12.000 12.000 M18.969 16.029 L 19.240 16.298 19.240 17.498 L 19.240 18.698 18.971 18.969 L 18.702 19.240 12.002 19.240 L 5.302 19.240 5.031 18.971 L 4.760 18.702 4.760 17.502 L 4.760 16.302 5.029 16.031 L 5.298 15.760 11.998 15.760 L 18.698 15.760 18.969 16.029 M7.000 17.500 L 7.000 18.240 7.760 18.240 L 8.520 18.240 8.520 17.500 L 8.520 16.760 7.760 16.760 L 7.000 16.760 7.000 17.500 M12.000 17.500 L 12.000 18.240 14.780 18.240 L 17.560 18.240 17.560 17.500 L 17.560 16.760 14.780 16.760 L 12.000 16.760 12.000 17.500 " stroke="none" fill-rule="evenodd"></path>';

const ServerSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-server';
  const symbolId = 'snack-uikit-web-icons-' + 'server';
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
export default ServerSpriteSVG;
