// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 10.000 L 3.240 16.760 7.240 16.760 L 11.240 16.760 11.240 18.000 L 11.240 19.240 9.120 19.240 L 7.000 19.240 7.000 20.000 L 7.000 20.760 12.000 20.760 L 17.000 20.760 17.000 20.000 L 17.000 19.240 14.880 19.240 L 12.760 19.240 12.760 18.000 L 12.760 16.760 16.760 16.760 L 20.760 16.760 20.760 10.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 10.000 M19.240 10.000 L 19.240 15.240 12.000 15.240 L 4.760 15.240 4.760 10.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 10.000 M7.700 8.240 L 5.940 10.000 7.700 11.760 L 9.459 13.520 9.990 12.990 L 10.520 12.461 9.290 11.230 L 8.060 10.000 9.300 8.760 L 10.539 7.520 10.020 7.000 C 9.735 6.714,9.492 6.480,9.480 6.480 C 9.469 6.480,8.668 7.272,7.700 8.240 M13.980 7.000 L 13.461 7.520 14.700 8.760 L 15.940 10.000 14.710 11.230 L 13.480 12.461 14.010 12.990 L 14.541 13.520 16.300 11.760 L 18.060 10.000 16.300 8.240 C 15.332 7.272,14.531 6.480,14.520 6.480 C 14.508 6.480,14.265 6.714,13.980 7.000 " stroke="none" fill-rule="evenodd"></path>';

const MonitorTest1SpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-monitor-test1';
  const symbolId = 'snack-uikit-web-icons-' + 'monitor-test1';
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
export default MonitorTest1SpriteSVG;
