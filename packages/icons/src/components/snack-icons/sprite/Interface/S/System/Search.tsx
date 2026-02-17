// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M9.892 3.283 C 7.634 3.456,5.541 4.750,4.310 6.731 C 3.851 7.470,3.486 8.463,3.336 9.380 C 3.237 9.978,3.237 11.022,3.336 11.620 C 3.778 14.314,5.647 16.516,8.225 17.381 C 10.420 18.117,12.904 17.727,14.765 16.355 C 14.911 16.248,15.046 16.160,15.065 16.160 C 15.084 16.160,16.086 17.146,17.292 18.350 L 19.484 20.540 19.999 20.000 L 20.515 19.460 18.320 17.260 L 16.126 15.060 16.284 14.860 C 16.530 14.550,16.858 14.006,17.060 13.574 C 18.360 10.797,17.789 7.554,15.617 5.383 C 14.376 4.141,12.798 3.417,11.040 3.281 C 10.489 3.238,10.476 3.238,9.892 3.283 M11.660 4.873 C 12.783 5.116,13.766 5.648,14.559 6.441 C 15.377 7.260,15.937 8.321,16.151 9.460 C 16.244 9.953,16.244 11.047,16.151 11.540 C 15.836 13.217,14.800 14.662,13.303 15.515 C 11.603 16.484,9.397 16.484,7.697 15.515 C 6.236 14.683,5.227 13.308,4.873 11.668 C 4.755 11.124,4.744 9.964,4.851 9.433 C 5.086 8.271,5.624 7.261,6.442 6.442 C 7.373 5.512,8.422 5.003,9.860 4.785 C 10.154 4.740,11.309 4.797,11.660 4.873 " stroke="none" fill-rule="evenodd"></path>';

const SearchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-search';
  const symbolId = 'snack-uikit-snack-icons-' + 'search';
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
export default SearchSpriteSVG;
