// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 11.000 L 3.240 17.760 7.240 17.760 L 11.240 17.760 11.240 19.000 L 11.240 20.240 9.120 20.240 L 7.000 20.240 7.000 21.000 L 7.000 21.760 12.000 21.760 L 17.000 21.760 17.000 21.000 L 17.000 20.240 14.880 20.240 L 12.760 20.240 12.760 18.240 L 12.760 16.240 8.760 16.240 L 4.760 16.240 4.760 11.000 L 4.760 5.760 12.000 5.760 L 19.240 5.760 19.240 10.689 C 19.240 15.489,19.238 15.616,19.166 15.539 C 19.125 15.495,18.114 14.398,16.920 13.100 C 15.725 11.802,14.701 10.690,14.645 10.629 L 14.543 10.518 15.681 9.379 L 16.819 8.240 14.030 8.240 L 11.240 8.240 11.240 11.030 L 11.240 13.819 12.362 12.700 L 13.485 11.580 13.652 11.768 C 13.745 11.872,15.026 13.262,16.500 14.858 L 19.180 17.760 19.970 17.760 L 20.760 17.760 20.760 11.000 L 20.760 4.240 12.000 4.240 L 3.240 4.240 3.240 11.000 " stroke="none" fill-rule="evenodd"></path>';

const MonitorTestSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-monitor-test';
  const symbolId = 'snack-uikit-web-icons-' + 'monitor-test';
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
export default MonitorTestSpriteSVG;
