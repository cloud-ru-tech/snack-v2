// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.970 5.970 L 3.240 8.700 3.240 12.000 L 3.240 15.300 5.970 18.030 L 8.700 20.760 12.000 20.760 L 15.300 20.760 18.030 18.030 L 20.760 15.300 20.760 12.000 L 20.760 8.700 18.030 5.970 L 15.300 3.240 12.000 3.240 L 8.700 3.240 5.970 5.970 M16.970 7.030 L 19.240 9.300 19.240 12.000 L 19.240 14.700 16.970 16.970 L 14.700 19.240 12.000 19.240 L 9.300 19.240 7.030 16.970 L 4.760 14.700 4.760 12.000 L 4.760 9.300 7.030 7.030 L 9.300 4.760 12.000 4.760 L 14.700 4.760 16.970 7.030 M11.240 10.500 L 11.240 14.000 12.000 14.000 L 12.760 14.000 12.760 10.500 L 12.760 7.000 12.000 7.000 L 11.240 7.000 11.240 10.500 M11.240 16.260 L 11.240 17.000 12.000 17.000 L 12.760 17.000 12.760 16.260 L 12.760 15.520 12.000 15.520 L 11.240 15.520 11.240 16.260 " stroke="none" fill-rule="evenodd"></path>';

const WarningSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-warning';
  const symbolId = 'snack-uikit-snack-icons-' + 'warning';
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
export default WarningSpriteSVG;
