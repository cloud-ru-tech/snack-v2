// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.980 6.000 L 11.461 6.520 13.820 8.880 L 16.180 11.240 11.090 11.240 L 6.000 11.240 6.000 12.000 L 6.000 12.760 11.090 12.760 L 16.180 12.760 13.830 15.110 L 11.480 17.461 12.010 17.990 L 12.541 18.520 15.540 15.520 L 18.539 12.521 18.269 12.249 L 18.000 11.978 18.260 11.720 L 18.521 11.461 15.531 8.471 C 13.886 6.826,12.531 5.480,12.520 5.480 C 12.508 5.480,12.265 5.714,11.980 6.000 " stroke="none" fill-rule="evenodd"></path>';

const ArrowRightSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-arrow-right';
  const symbolId = 'snack-uikit-snack-icons-' + 'arrow-right';
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
export default ArrowRightSpriteSVG;
