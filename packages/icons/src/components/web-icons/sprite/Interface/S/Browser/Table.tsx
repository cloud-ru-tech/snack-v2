// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M8.240 6.500 L 8.240 8.240 6.500 8.240 L 4.760 8.240 4.760 7.270 L 4.760 6.301 5.530 5.530 L 6.299 4.760 7.270 4.760 L 8.240 4.760 8.240 6.500 M18.470 5.530 L 19.240 6.301 19.240 7.270 L 19.240 8.240 14.500 8.240 L 9.760 8.240 9.760 6.500 L 9.760 4.760 13.730 4.760 L 17.701 4.760 18.470 5.530 M8.240 14.500 L 8.240 19.240 7.270 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 13.730 L 4.760 9.760 6.500 9.760 L 8.240 9.760 8.240 14.500 M19.240 13.730 L 19.240 17.699 18.470 18.470 L 17.701 19.240 13.730 19.240 L 9.760 19.240 9.760 14.500 L 9.760 9.760 14.500 9.760 L 19.240 9.760 19.240 13.730 " stroke="none" fill-rule="evenodd"></path>';

const TableSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-table';
  const symbolId = 'snack-uikit-web-icons-' + 'table';
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
export default TableSpriteSVG;
