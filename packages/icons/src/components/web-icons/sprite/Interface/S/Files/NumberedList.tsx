// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.720 4.061 C 5.492 4.164,3.334 5.805,3.259 5.933 C 2.903 6.536,3.469 7.261,4.119 7.034 C 4.192 7.009,4.464 6.829,4.726 6.634 C 4.987 6.439,5.209 6.280,5.219 6.280 C 5.229 6.280,5.242 7.178,5.249 8.276 L 5.260 10.273 5.382 10.426 C 5.524 10.605,5.803 10.760,5.981 10.760 C 6.201 10.760,6.509 10.574,6.631 10.366 L 6.740 10.180 6.740 7.380 L 6.740 4.580 6.649 4.410 C 6.475 4.084,6.036 3.919,5.720 4.061 M8.920 6.000 L 8.920 6.760 14.460 6.760 L 20.000 6.760 20.000 6.000 L 20.000 5.240 14.460 5.240 L 8.920 5.240 8.920 6.000 M8.920 12.000 L 8.920 12.760 14.460 12.760 L 20.000 12.760 20.000 12.000 L 20.000 11.240 14.460 11.240 L 8.920 11.240 8.920 12.000 M4.984 12.824 C 4.854 12.855,4.602 12.957,4.424 13.050 C 3.848 13.352,3.231 14.057,3.147 14.508 C 3.114 14.686,3.217 15.003,3.349 15.129 C 3.564 15.335,3.894 15.413,4.147 15.318 C 4.296 15.261,4.509 15.055,4.601 14.877 C 4.765 14.558,5.191 14.280,5.514 14.280 C 5.817 14.280,5.900 14.368,5.900 14.687 C 5.900 15.105,5.777 15.295,4.522 16.815 C 3.908 17.560,3.385 18.224,3.362 18.291 C 3.220 18.698,3.445 19.139,3.856 19.261 C 4.015 19.308,4.335 19.320,5.457 19.319 C 6.275 19.318,6.935 19.301,7.039 19.277 C 7.501 19.170,7.753 18.708,7.578 18.289 C 7.504 18.112,7.383 17.976,7.220 17.886 C 7.126 17.834,6.948 17.816,6.386 17.800 L 5.672 17.780 6.266 17.053 C 6.900 16.278,7.070 16.028,7.229 15.634 C 7.667 14.549,7.313 13.418,6.398 12.975 C 5.949 12.757,5.470 12.706,4.984 12.824 M8.920 18.000 L 8.920 18.760 14.460 18.760 L 20.000 18.760 20.000 18.000 L 20.000 17.240 14.460 17.240 L 8.920 17.240 8.920 18.000 " stroke="none" fill-rule="evenodd"></path>';

const NumberedListSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-numbered-list';
  const symbolId = 'snack-uikit-web-icons-' + 'numbered-list';
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
export default NumberedListSpriteSVG;
