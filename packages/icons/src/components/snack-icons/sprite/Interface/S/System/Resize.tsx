// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M15.970 15.970 L 11.480 20.461 12.010 20.990 L 12.541 21.520 17.040 17.020 L 21.539 12.521 21.020 12.000 C 20.735 11.714,20.492 11.480,20.481 11.480 C 20.469 11.480,18.439 13.501,15.970 15.970 M17.970 17.970 L 15.480 20.461 16.010 20.990 L 16.541 21.520 19.040 19.020 L 21.539 16.520 21.020 16.000 C 20.735 15.714,20.492 15.480,20.480 15.480 C 20.469 15.480,19.339 16.601,17.970 17.970 M19.969 19.971 L 19.480 20.461 20.011 20.991 L 20.541 21.520 21.040 21.020 L 21.539 20.520 21.020 20.000 C 20.735 19.714,20.492 19.480,20.480 19.480 C 20.468 19.480,20.239 19.701,19.969 19.971 " stroke="none" fill-rule="evenodd"></path>';

const ResizeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-resize';
  const symbolId = 'snack-uikit-snack-icons-' + 'resize';
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
export default ResizeSpriteSVG;
