// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.470 3.470 L 7.240 4.700 7.240 8.500 L 7.240 12.300 8.470 13.530 L 9.700 14.760 12.000 14.760 L 14.300 14.760 15.530 13.530 L 16.760 12.300 16.760 8.500 L 16.760 4.700 15.530 3.470 L 14.300 2.240 12.000 2.240 L 9.700 2.240 8.470 3.470 M14.440 4.500 L 15.179 5.240 14.090 5.240 L 13.000 5.240 13.000 6.000 L 13.000 6.760 14.120 6.760 L 15.240 6.760 15.240 7.500 L 15.240 8.240 14.120 8.240 L 13.000 8.240 13.000 9.000 L 13.000 9.760 14.120 9.760 L 15.240 9.760 15.240 10.730 L 15.240 11.701 14.470 12.470 L 13.699 13.240 12.000 13.240 L 10.301 13.240 9.530 12.470 L 8.760 11.701 8.760 10.730 L 8.760 9.760 9.880 9.760 L 11.000 9.760 11.000 9.000 L 11.000 8.240 9.880 8.240 L 8.760 8.240 8.760 7.500 L 8.760 6.760 9.880 6.760 L 11.000 6.760 11.000 6.000 L 11.000 5.240 9.910 5.240 L 8.821 5.240 9.560 4.500 L 10.299 3.760 12.000 3.760 L 13.701 3.760 14.440 4.500 M4.240 16.380 L 4.240 17.760 7.740 17.760 L 11.240 17.760 11.240 19.000 L 11.240 20.240 10.120 20.240 L 9.000 20.240 9.000 21.000 L 9.000 21.760 12.000 21.760 L 15.000 21.760 15.000 21.000 L 15.000 20.240 13.880 20.240 L 12.760 20.240 12.760 19.000 L 12.760 17.760 16.260 17.760 L 19.760 17.760 19.760 16.380 L 19.760 15.000 19.000 15.000 L 18.240 15.000 18.240 15.620 L 18.240 16.240 12.000 16.240 L 5.760 16.240 5.760 15.620 L 5.760 15.000 5.000 15.000 L 4.240 15.000 4.240 16.380 " stroke="none" fill-rule="evenodd"></path>';

const MicrophoneSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-microphone';
  const symbolId = 'snack-uikit-web-icons-' + 'microphone';
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
export default MicrophoneSpriteSVG;
