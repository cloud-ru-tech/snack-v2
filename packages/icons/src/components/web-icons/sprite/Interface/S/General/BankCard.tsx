// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 5.470 L 3.240 6.700 3.240 12.000 L 3.240 17.300 4.470 18.530 L 5.700 19.760 12.000 19.760 L 18.300 19.760 19.530 18.530 L 20.760 17.300 20.760 12.000 L 20.760 6.700 19.530 5.470 L 18.300 4.240 12.000 4.240 L 5.700 4.240 4.470 5.470 M18.470 6.530 L 19.240 7.299 19.240 8.270 L 19.240 9.240 12.000 9.240 L 4.760 9.240 4.760 8.270 L 4.760 7.301 5.530 6.530 L 6.299 5.760 11.999 5.760 L 17.699 5.760 18.470 6.530 M19.240 13.730 L 19.240 16.701 18.470 17.470 L 17.699 18.240 11.999 18.240 L 6.299 18.240 5.530 17.470 L 4.760 16.699 4.760 13.730 L 4.760 10.760 12.000 10.760 L 19.240 10.760 19.240 13.730 M10.498 15.291 C 10.487 15.320,10.483 15.657,10.489 16.041 L 10.500 16.740 11.250 16.751 L 12.000 16.762 12.000 16.001 L 12.000 15.240 11.259 15.240 C 10.692 15.240,10.513 15.252,10.498 15.291 M13.498 15.291 C 13.487 15.320,13.483 15.657,13.489 16.041 L 13.500 16.740 14.250 16.751 L 15.000 16.762 15.000 16.001 L 15.000 15.240 14.259 15.240 C 13.692 15.240,13.513 15.252,13.498 15.291 M16.498 15.291 C 16.487 15.320,16.483 15.657,16.489 16.041 L 16.500 16.740 17.250 16.751 L 18.000 16.762 18.000 16.001 L 18.000 15.240 17.259 15.240 C 16.692 15.240,16.513 15.252,16.498 15.291 " stroke="none" fill-rule="evenodd"></path>';

const BankCardSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bank-card';
  const symbolId = 'snack-uikit-web-icons-' + 'bank-card';
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
export default BankCardSpriteSVG;
