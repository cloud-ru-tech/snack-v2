// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.240 11.090 L 11.240 16.180 8.880 13.820 L 6.520 11.460 5.990 11.990 L 5.460 12.520 8.460 15.520 L 11.459 18.519 11.729 18.251 L 12.000 17.982 12.271 18.251 L 12.541 18.519 15.540 15.520 L 18.540 12.520 18.010 11.990 L 17.480 11.460 15.120 13.820 L 12.760 16.180 12.760 11.090 L 12.760 6.000 12.000 6.000 L 11.240 6.000 11.240 11.090 " stroke="none" fill-rule="evenodd"></path>';

const ArrowDownSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-arrow-down';
  const symbolId = 'snack-uikit-snack-icons-' + 'arrow-down';
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
export default ArrowDownSpriteSVG;
