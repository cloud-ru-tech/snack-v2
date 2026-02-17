// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.469 8.471 L 5.479 11.461 5.740 11.720 L 6.000 11.978 5.731 12.249 L 5.461 12.521 8.460 15.520 L 11.459 18.520 11.990 17.990 L 12.520 17.461 10.170 15.110 L 7.820 12.760 12.910 12.760 L 18.000 12.760 18.000 12.000 L 18.000 11.240 12.910 11.240 L 7.820 11.240 10.180 8.880 L 12.539 6.520 12.020 6.000 C 11.735 5.714,11.492 5.480,11.480 5.480 C 11.469 5.480,10.114 6.826,8.469 8.471 " stroke="none" fill-rule="evenodd"></path>';

const ArrowLeftSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-arrow-left';
  const symbolId = 'snack-uikit-snack-icons-' + 'arrow-left';
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
export default ArrowLeftSpriteSVG;
