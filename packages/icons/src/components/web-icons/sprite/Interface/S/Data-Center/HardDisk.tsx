// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M18.470 5.530 L 19.240 6.299 19.240 10.239 L 19.240 14.179 18.769 13.709 L 18.299 13.240 12.000 13.240 L 5.701 13.240 5.231 13.709 L 4.760 14.179 4.760 10.240 L 4.760 6.301 5.530 5.530 L 6.299 4.760 11.999 4.760 L 17.699 4.760 18.470 5.530 M18.470 15.530 L 19.240 16.299 19.240 17.000 L 19.240 17.701 18.470 18.470 L 17.699 19.240 12.000 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 17.001 L 4.760 16.301 5.530 15.530 L 6.299 14.760 11.999 14.760 L 17.699 14.760 18.470 15.530 M6.498 16.291 C 6.487 16.320,6.483 16.657,6.489 17.041 L 6.500 17.740 7.250 17.751 L 8.000 17.762 8.000 17.001 L 8.000 16.240 7.259 16.240 C 6.692 16.240,6.513 16.252,6.498 16.291 " stroke="none" fill-rule="evenodd"></path>';

const HardDiskSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-hard-disk';
  const symbolId = 'snack-uikit-web-icons-' + 'hard-disk';
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
export default HardDiskSpriteSVG;
