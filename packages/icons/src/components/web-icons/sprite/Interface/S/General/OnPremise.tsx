// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.590 5.691 L 3.240 8.219 3.240 13.989 L 3.240 19.760 4.971 19.760 L 6.701 19.760 7.200 20.260 L 7.699 20.760 12.000 20.760 L 16.301 20.760 16.800 20.260 L 17.299 19.760 19.029 19.760 L 20.760 19.760 20.760 13.989 L 20.760 8.219 16.402 5.689 C 14.005 4.298,12.020 3.161,11.992 3.162 C 11.963 3.163,9.982 4.301,7.590 5.691 M15.662 6.990 L 19.236 9.060 19.238 13.650 L 19.240 18.240 18.500 18.240 L 17.760 18.240 17.760 17.471 L 17.760 16.702 17.411 16.351 L 17.062 16.000 17.411 15.649 L 17.760 15.298 17.760 14.000 L 17.760 12.701 17.030 11.970 L 16.301 11.240 12.001 11.240 L 7.701 11.240 6.970 11.970 L 6.240 12.699 6.240 13.999 L 6.240 15.298 6.589 15.649 L 6.938 16.000 6.589 16.351 L 6.240 16.702 6.240 17.471 L 6.240 18.240 5.500 18.240 L 4.760 18.240 4.762 13.650 L 4.763 9.060 8.372 6.970 C 10.356 5.821,12.004 4.889,12.034 4.900 C 12.063 4.911,13.696 5.852,15.662 6.990 M15.969 13.029 L 16.240 13.298 16.240 13.998 L 16.240 14.698 15.971 14.969 L 15.702 15.240 12.002 15.240 L 8.302 15.240 8.031 14.971 L 7.760 14.702 7.760 14.002 L 7.760 13.302 8.029 13.031 L 8.298 12.760 11.998 12.760 L 15.698 12.760 15.969 13.029 M15.969 17.029 L 16.240 17.298 16.240 17.998 L 16.240 18.698 15.971 18.969 L 15.702 19.240 12.002 19.240 L 8.302 19.240 8.031 18.971 L 7.760 18.702 7.760 18.002 L 7.760 17.302 8.029 17.031 L 8.298 16.760 11.998 16.760 L 15.698 16.760 15.969 17.029 " stroke="none" fill-rule="evenodd"></path>';

const OnPremiseSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-on-premise';
  const symbolId = 'snack-uikit-web-icons-' + 'on-premise';
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
export default OnPremiseSpriteSVG;
