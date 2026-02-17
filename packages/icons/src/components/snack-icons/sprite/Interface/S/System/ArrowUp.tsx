// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.470 8.470 L 5.480 11.460 6.010 11.990 L 6.540 12.520 8.890 10.170 L 11.240 7.820 11.240 12.910 L 11.240 18.000 12.000 18.000 L 12.760 18.000 12.760 12.910 L 12.760 7.820 15.110 10.170 L 17.461 12.520 17.990 11.990 L 18.520 11.459 15.520 8.460 L 12.521 5.461 12.261 5.719 L 12.000 5.978 11.749 5.729 C 11.611 5.592,11.489 5.480,11.479 5.480 C 11.468 5.480,10.114 6.826,8.470 8.470 " stroke="none" fill-rule="evenodd"></path>';

const ArrowUpSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-arrow-up';
  const symbolId = 'snack-uikit-snack-icons-' + 'arrow-up';
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
export default ArrowUpSpriteSVG;
