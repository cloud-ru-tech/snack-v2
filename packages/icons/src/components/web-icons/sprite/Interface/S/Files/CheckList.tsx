// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.550 5.200 C 6.028 5.618,5.588 5.960,5.571 5.960 C 5.555 5.960,5.316 5.735,5.040 5.460 L 4.539 4.960 4.000 5.500 L 3.461 6.040 4.447 7.027 L 5.433 8.013 6.951 6.799 L 8.470 5.585 8.011 5.013 C 7.758 4.698,7.540 4.440,7.526 4.440 C 7.511 4.440,7.073 4.782,6.550 5.200 M10.000 6.480 L 10.000 7.240 15.500 7.240 L 21.000 7.240 21.000 6.480 L 21.000 5.720 15.500 5.720 L 10.000 5.720 10.000 6.480 M6.596 11.145 C 6.081 11.556,5.636 11.910,5.608 11.933 C 5.568 11.964,5.431 11.850,5.047 11.467 L 4.539 10.960 4.010 11.490 L 3.480 12.021 4.450 12.990 C 4.984 13.524,5.434 13.960,5.451 13.960 C 5.496 13.960,8.440 11.597,8.440 11.561 C 8.440 11.539,7.633 10.503,7.542 10.409 C 7.536 10.403,7.110 10.734,6.596 11.145 M10.000 12.000 L 10.000 12.760 15.500 12.760 L 21.000 12.760 21.000 12.000 L 21.000 11.240 15.500 11.240 L 10.000 11.240 10.000 12.000 M5.000 18.000 L 5.000 18.762 5.750 18.751 L 6.500 18.740 6.500 18.000 L 6.500 17.260 5.750 17.249 L 5.000 17.238 5.000 18.000 M10.000 18.000 L 10.000 18.760 15.500 18.760 L 21.000 18.760 21.000 18.000 L 21.000 17.240 15.500 17.240 L 10.000 17.240 10.000 18.000 " stroke="none" fill-rule="evenodd"></path>';

const CheckListSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-check-list';
  const symbolId = 'snack-uikit-web-icons-' + 'check-list';
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
export default CheckListSpriteSVG;
