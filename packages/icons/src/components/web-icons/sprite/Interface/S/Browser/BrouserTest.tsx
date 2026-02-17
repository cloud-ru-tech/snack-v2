// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M18.470 5.530 L 19.240 6.299 19.240 7.770 L 19.240 9.240 12.000 9.240 L 4.760 9.240 4.760 7.770 L 4.760 6.301 5.530 5.530 L 6.299 4.760 11.999 4.760 L 17.699 4.760 18.470 5.530 M6.240 7.000 L 6.240 7.760 7.000 7.760 L 7.760 7.760 7.760 7.000 L 7.760 6.240 7.000 6.240 L 6.240 6.240 6.240 7.000 M19.240 14.230 L 19.240 17.701 18.470 18.470 L 17.699 19.240 12.000 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 14.230 L 4.760 10.760 12.000 10.760 L 19.240 10.760 19.240 14.230 M7.490 12.490 L 6.960 13.020 7.950 14.010 L 8.939 15.000 7.960 15.980 L 6.980 16.960 7.510 17.490 L 8.040 18.020 9.550 16.510 L 11.060 15.000 9.540 13.480 L 8.020 11.960 7.490 12.490 M12.000 17.000 L 12.000 17.760 14.500 17.760 L 17.000 17.760 17.000 17.000 L 17.000 16.240 14.500 16.240 L 12.000 16.240 12.000 17.000 " stroke="none" fill-rule="evenodd"></path>';

const BrouserTestSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-brouser-test';
  const symbolId = 'snack-uikit-web-icons-' + 'brouser-test';
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
export default BrouserTestSpriteSVG;
