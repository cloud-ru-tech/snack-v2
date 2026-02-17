// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 13.000 L 20.760 7.700 18.530 5.470 L 16.300 3.240 11.000 3.240 L 5.700 3.240 4.470 4.470 M7.240 6.760 L 7.240 8.760 12.000 8.760 L 16.760 8.760 16.760 7.290 L 16.760 5.820 18.000 7.060 L 19.240 8.300 19.240 12.999 L 19.240 17.699 18.470 18.470 L 17.701 19.240 17.230 19.240 L 16.760 19.240 16.760 15.740 L 16.760 12.240 12.000 12.240 L 7.240 12.240 7.240 15.740 L 7.240 19.240 6.770 19.240 L 6.299 19.240 5.530 18.470 L 4.760 17.699 4.760 12.000 L 4.760 6.301 5.530 5.530 L 6.299 4.760 6.770 4.760 L 7.240 4.760 7.240 6.760 M15.240 6.000 L 15.240 7.240 12.000 7.240 L 8.760 7.240 8.760 6.000 L 8.760 4.760 12.000 4.760 L 15.240 4.760 15.240 6.000 M15.240 16.500 L 15.240 19.240 12.000 19.240 L 8.760 19.240 8.760 16.500 L 8.760 13.760 12.000 13.760 L 15.240 13.760 15.240 16.500 " stroke="none" fill-rule="evenodd"></path>';

const SaveSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-save';
  const symbolId = 'snack-uikit-product-icons-' + 'save';
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
export default SaveSpriteSVG;
