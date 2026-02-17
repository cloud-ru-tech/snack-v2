// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.980 5.000 L 3.461 5.520 6.700 8.760 L 9.940 12.000 6.710 15.230 L 3.480 18.461 4.010 18.990 L 4.541 19.520 8.300 15.760 L 12.060 12.000 8.300 8.240 C 6.232 6.172,4.531 4.480,4.520 4.480 C 4.508 4.480,4.265 4.714,3.980 5.000 M11.000 19.000 L 11.000 19.760 15.500 19.760 L 20.000 19.760 20.000 19.000 L 20.000 18.240 15.500 18.240 L 11.000 18.240 11.000 19.000 " stroke="none" fill-rule="evenodd"></path>';

const ComandSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-comand';
  const symbolId = 'snack-uikit-product-icons-' + 'comand';
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
export default ComandSpriteSVG;
