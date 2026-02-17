// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M18.470 5.530 L 19.240 6.299 19.240 11.999 L 19.240 17.699 18.470 18.470 L 17.701 19.240 12.000 19.240 L 6.299 19.240 5.530 18.470 L 4.760 17.699 4.760 12.000 L 4.760 6.301 5.530 5.530 L 6.299 4.760 11.999 4.760 L 17.699 4.760 18.470 5.530 M11.240 12.000 L 11.240 17.000 12.000 17.000 L 12.760 17.000 12.760 12.000 L 12.760 7.000 12.000 7.000 L 11.240 7.000 11.240 12.000 M8.160 12.040 L 8.160 15.080 8.920 15.080 L 9.680 15.080 9.680 12.040 L 9.680 9.000 8.920 9.000 L 8.160 9.000 8.160 12.040 M14.240 12.000 L 14.240 15.000 15.000 15.000 L 15.760 15.000 15.760 12.000 L 15.760 9.000 15.000 9.000 L 14.240 9.000 14.240 12.000 M5.760 12.000 L 5.760 13.000 6.500 13.000 L 7.240 13.000 7.240 12.000 L 7.240 11.000 6.500 11.000 L 5.760 11.000 5.760 12.000 M16.760 12.060 L 16.760 13.120 17.500 13.120 L 18.240 13.120 18.240 12.060 L 18.240 11.000 17.500 11.000 L 16.760 11.000 16.760 12.060 " stroke="none" fill-rule="evenodd"></path>';

const SoundSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-sound';
  const symbolId = 'snack-uikit-web-icons-' + 'sound';
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
export default SoundSpriteSVG;
