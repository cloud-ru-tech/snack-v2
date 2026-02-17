// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.240 3.120 L 6.240 4.240 4.740 4.240 L 3.240 4.240 3.240 12.000 L 3.240 19.760 12.000 19.760 L 20.760 19.760 20.760 12.000 L 20.760 4.240 19.260 4.240 L 17.760 4.240 17.760 3.120 L 17.760 2.000 17.000 2.000 L 16.240 2.000 16.240 3.120 L 16.240 4.240 12.000 4.240 L 7.760 4.240 7.760 3.120 L 7.760 2.000 7.000 2.000 L 6.240 2.000 6.240 3.120 M19.240 7.500 L 19.240 9.240 12.000 9.240 L 4.760 9.240 4.760 7.500 L 4.760 5.760 12.000 5.760 L 19.240 5.760 19.240 7.500 M19.240 14.500 L 19.240 18.240 12.000 18.240 L 4.760 18.240 4.760 14.500 L 4.760 10.760 12.000 10.760 L 19.240 10.760 19.240 14.500 " stroke="none" fill-rule="evenodd"></path>';

const CalendarSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-calendar';
  const symbolId = 'snack-uikit-snack-icons-' + 'calendar';
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
export default CalendarSpriteSVG;
