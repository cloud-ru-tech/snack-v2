// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 12.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 18.000 L 4.760 16.760 7.110 16.760 L 9.461 16.760 10.220 15.240 C 10.638 14.404,10.989 13.720,11.000 13.720 C 11.011 13.720,11.362 14.404,11.780 15.240 L 12.539 16.760 13.890 16.760 L 15.240 16.760 15.240 17.790 L 15.240 18.820 16.650 17.410 L 18.060 16.000 16.650 14.590 L 15.240 13.180 15.240 14.210 L 15.240 15.240 14.350 15.240 L 13.460 15.240 12.650 13.620 L 11.840 12.000 12.650 10.380 L 13.460 8.760 14.350 8.760 L 15.240 8.760 15.240 9.790 L 15.240 10.820 16.650 9.410 L 18.060 8.000 16.650 6.590 L 15.240 5.180 15.240 6.210 L 15.240 7.240 13.890 7.240 L 12.539 7.240 11.780 8.760 C 11.362 9.596,11.011 10.280,11.000 10.280 C 10.989 10.280,10.638 9.596,10.220 8.760 L 9.461 7.240 7.110 7.240 L 4.760 7.240 4.760 6.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 12.000 M9.350 10.380 L 10.160 12.000 9.350 13.620 L 8.540 15.240 6.650 15.240 L 4.760 15.240 4.760 12.000 L 4.760 8.760 6.650 8.760 L 8.540 8.760 9.350 10.380 " stroke="none" fill-rule="evenodd"></path>';

const CrossArrowsSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cross-arrows';
  const symbolId = 'snack-uikit-web-icons-' + 'cross-arrows';
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
export default CrossArrowsSpriteSVG;
