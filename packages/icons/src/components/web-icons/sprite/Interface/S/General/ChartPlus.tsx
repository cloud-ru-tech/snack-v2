// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 19.760 12.000 19.760 L 19.760 19.760 19.760 15.500 L 19.760 11.240 16.260 11.240 L 12.760 11.240 12.760 7.740 L 12.760 4.240 8.500 4.240 L 4.240 4.240 4.240 12.000 M16.240 5.620 L 16.240 6.240 15.620 6.240 L 15.000 6.240 15.000 7.000 L 15.000 7.760 15.620 7.760 L 16.240 7.760 16.240 8.380 L 16.240 9.000 17.000 9.000 L 17.760 9.000 17.760 8.380 L 17.760 7.760 18.380 7.760 L 19.000 7.760 19.000 7.000 L 19.000 6.240 18.380 6.240 L 17.760 6.240 17.760 5.620 L 17.760 5.000 17.000 5.000 L 16.240 5.000 16.240 5.620 M11.240 8.500 L 11.240 11.240 8.500 11.240 L 5.760 11.240 5.760 8.500 L 5.760 5.760 8.500 5.760 L 11.240 5.760 11.240 8.500 M18.240 15.500 L 18.240 18.240 12.000 18.240 L 5.760 18.240 5.760 15.500 L 5.760 12.760 12.000 12.760 L 18.240 12.760 18.240 15.500 " stroke="none" fill-rule="evenodd"></path>';

const ChartPlusSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-chart-plus';
  const symbolId = 'snack-uikit-web-icons-' + 'chart-plus';
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
export default ChartPlusSpriteSVG;
