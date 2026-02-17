// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.880 4.500 L 10.880 5.240 14.560 5.240 L 18.240 5.240 18.240 12.500 L 18.240 19.760 14.560 19.760 L 10.880 19.760 10.880 20.500 L 10.880 21.240 15.320 21.240 L 19.760 21.240 19.760 12.500 L 19.760 3.760 15.320 3.760 L 10.880 3.760 10.880 4.500 M4.830 10.590 C 3.801 11.619,2.960 12.478,2.960 12.500 C 2.960 12.546,6.685 16.280,6.730 16.280 C 6.747 16.280,6.760 15.596,6.760 14.760 L 6.760 13.240 10.700 13.240 L 14.640 13.240 14.640 12.500 L 14.640 11.760 10.700 11.760 L 6.760 11.760 6.760 10.240 C 6.760 9.404,6.746 8.720,6.730 8.720 C 6.713 8.720,5.858 9.562,4.830 10.590 " stroke="none" fill-rule="evenodd"></path>';

const ExitSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-exit';
  const symbolId = 'snack-uikit-web-icons-' + 'exit';
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
export default ExitSpriteSVG;
