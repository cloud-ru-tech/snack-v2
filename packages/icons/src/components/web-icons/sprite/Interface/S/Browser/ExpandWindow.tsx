// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M12.000 4.000 L 12.000 4.760 14.850 4.760 L 17.699 4.760 18.470 5.530 L 19.240 6.299 19.240 9.270 L 19.240 12.240 15.740 12.240 L 12.240 12.240 12.240 15.740 L 12.240 19.240 9.270 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 14.850 L 4.760 12.000 4.000 12.000 L 3.240 12.000 3.240 15.150 L 3.240 18.300 4.470 19.530 L 5.700 20.760 13.230 20.760 L 20.760 20.760 20.760 13.230 L 20.760 5.700 19.530 4.470 L 18.300 3.240 15.150 3.240 L 12.000 3.240 12.000 4.000 M5.000 4.620 L 5.000 5.000 4.620 5.000 L 4.240 5.000 4.240 7.000 L 4.240 9.000 5.000 9.000 L 5.760 9.000 5.760 7.910 L 5.760 6.820 8.110 9.170 L 10.460 11.520 10.990 10.990 L 11.520 10.460 9.170 8.110 L 6.820 5.760 7.910 5.760 L 9.000 5.760 9.000 5.000 L 9.000 4.240 7.000 4.240 L 5.000 4.240 5.000 4.620 M19.240 16.500 L 19.240 19.240 16.500 19.240 L 13.760 19.240 13.760 16.500 L 13.760 13.760 16.500 13.760 L 19.240 13.760 19.240 16.500 " stroke="none" fill-rule="evenodd"></path>';

const ExpandWindowSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-expand-window';
  const symbolId = 'snack-uikit-web-icons-' + 'expand-window';
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
export default ExpandWindowSpriteSVG;
