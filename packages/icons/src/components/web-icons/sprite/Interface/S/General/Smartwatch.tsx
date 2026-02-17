// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.905 3.910 L 7.351 5.580 6.296 6.640 L 5.240 7.701 5.240 12.000 L 5.240 16.299 6.296 17.360 L 7.351 18.420 7.905 20.090 L 8.459 21.760 12.000 21.760 L 15.541 21.760 16.095 20.090 L 16.649 18.420 17.704 17.360 L 18.760 16.299 18.760 13.530 L 18.760 10.760 19.380 10.760 L 20.000 10.760 20.000 10.000 L 20.000 9.240 19.380 9.240 L 18.760 9.240 18.760 8.470 L 18.760 7.701 17.704 6.640 L 16.649 5.580 16.095 3.910 L 15.541 2.240 12.000 2.240 L 8.459 2.240 7.905 3.910 M14.707 4.500 L 14.953 5.240 12.000 5.240 L 9.047 5.240 9.293 4.500 L 9.539 3.760 12.000 3.760 L 14.461 3.760 14.707 4.500 M16.470 7.530 L 17.240 8.301 17.240 12.000 L 17.240 15.699 16.470 16.470 L 15.701 17.240 12.001 17.240 L 8.301 17.240 7.530 16.470 L 6.760 15.701 6.760 12.001 L 6.760 8.301 7.530 7.530 L 8.299 6.760 12.000 6.760 L 15.701 6.760 16.470 7.530 M9.000 15.000 L 9.000 15.760 12.000 15.760 L 15.000 15.760 15.000 15.000 L 15.000 14.240 12.000 14.240 L 9.000 14.240 9.000 15.000 M14.707 19.500 L 14.461 20.240 12.000 20.240 L 9.539 20.240 9.293 19.500 L 9.047 18.760 12.000 18.760 L 14.953 18.760 14.707 19.500 " stroke="none" fill-rule="evenodd"></path>';

const SmartwatchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-smartwatch';
  const symbolId = 'snack-uikit-web-icons-' + 'smartwatch';
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
export default SmartwatchSpriteSVG;
