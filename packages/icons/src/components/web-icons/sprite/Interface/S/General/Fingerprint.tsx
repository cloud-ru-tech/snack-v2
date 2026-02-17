// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.470 3.470 L 4.240 4.700 4.240 12.000 L 4.240 19.300 5.470 20.530 L 6.700 21.760 12.000 21.760 L 17.300 21.760 18.530 20.530 L 19.760 19.300 19.760 12.000 L 19.760 4.700 18.530 3.470 L 17.300 2.240 12.000 2.240 L 6.700 2.240 5.470 3.470 M17.470 4.530 L 18.240 5.301 18.240 12.001 L 18.240 18.701 17.470 19.470 L 16.699 20.240 12.000 20.240 L 7.301 20.240 6.530 19.470 L 5.760 18.701 5.760 12.001 L 5.760 5.301 6.530 4.530 L 7.299 3.760 12.000 3.760 L 16.701 3.760 17.470 4.530 M8.240 9.120 L 8.240 12.000 9.000 12.000 L 9.760 12.000 9.760 9.880 L 9.760 7.760 12.000 7.760 L 14.240 7.760 14.240 8.880 L 14.240 10.000 15.000 10.000 L 15.760 10.000 15.760 8.120 L 15.760 6.240 12.000 6.240 L 8.240 6.240 8.240 9.120 M11.240 12.000 L 11.240 15.000 12.000 15.000 L 12.760 15.000 12.760 12.000 L 12.760 9.000 12.000 9.000 L 11.240 9.000 11.240 12.000 M14.240 14.380 L 14.240 16.240 12.000 16.240 L 9.760 16.240 9.760 15.380 L 9.760 14.520 9.000 14.520 L 8.240 14.520 8.240 16.140 L 8.240 17.760 12.000 17.760 L 15.760 17.760 15.760 15.140 L 15.760 12.520 15.000 12.520 L 14.240 12.520 14.240 14.380 " stroke="none" fill-rule="evenodd"></path>';

const FingerprintSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-fingerprint';
  const symbolId = 'snack-uikit-web-icons-' + 'fingerprint';
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
export default FingerprintSpriteSVG;
