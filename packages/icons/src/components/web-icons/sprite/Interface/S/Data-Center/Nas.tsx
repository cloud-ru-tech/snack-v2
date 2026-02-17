// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M18.470 5.530 L 19.240 6.299 19.240 11.999 L 19.240 17.699 18.470 18.470 L 17.701 19.240 12.000 19.240 L 6.299 19.240 5.530 18.470 L 4.760 17.699 4.760 12.000 L 4.760 6.301 5.530 5.530 L 6.299 4.760 11.999 4.760 L 17.699 4.760 18.470 5.530 M7.000 7.000 L 7.000 7.762 7.750 7.751 L 8.500 7.740 8.500 7.000 L 8.500 6.260 7.750 6.249 L 7.000 6.238 7.000 7.000 M10.240 11.996 L 10.240 17.753 13.970 17.768 C 16.021 17.776,17.713 17.776,17.730 17.769 C 17.747 17.761,17.760 15.164,17.760 11.998 L 17.760 6.240 14.000 6.240 L 10.240 6.240 10.240 11.996 M13.240 12.000 L 13.240 16.240 12.500 16.240 L 11.760 16.240 11.760 12.000 L 11.760 7.760 12.500 7.760 L 13.240 7.760 13.240 12.000 M16.240 12.020 L 16.240 16.280 15.500 16.280 L 14.760 16.280 14.760 12.020 L 14.760 7.760 15.500 7.760 L 16.240 7.760 16.240 12.020 " stroke="none" fill-rule="evenodd"></path>';

const NasSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-nas';
  const symbolId = 'snack-uikit-web-icons-' + 'nas';
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
export default NasSpriteSVG;
