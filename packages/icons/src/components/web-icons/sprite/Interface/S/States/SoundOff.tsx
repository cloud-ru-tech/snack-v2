// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.224 5.559 L 7.708 7.760 5.974 7.760 L 4.240 7.760 4.240 12.000 L 4.240 16.240 5.974 16.240 L 7.708 16.240 10.224 18.441 L 12.740 20.642 12.750 16.321 C 12.756 13.944,12.756 10.056,12.750 7.679 L 12.740 3.358 10.224 5.559 M11.230 14.661 L 11.220 17.322 9.760 16.042 L 8.300 14.763 7.030 14.761 L 5.760 14.760 5.760 12.000 L 5.760 9.240 7.030 9.239 L 8.300 9.237 9.760 7.958 L 11.220 6.678 11.230 9.339 C 11.236 10.803,11.236 13.197,11.230 14.661 M14.980 10.000 L 14.461 10.520 15.200 11.260 L 15.939 12.000 15.210 12.730 L 14.480 13.461 15.010 13.990 L 15.539 14.520 16.270 13.790 L 17.000 13.061 17.730 13.790 L 18.461 14.520 18.990 13.990 L 19.520 13.461 18.790 12.730 L 18.061 12.000 18.800 11.260 L 19.539 10.520 19.010 9.990 L 18.480 9.461 17.740 10.200 L 17.000 10.939 16.270 10.210 C 15.868 9.808,15.530 9.480,15.519 9.480 C 15.508 9.480,15.265 9.714,14.980 10.000 " stroke="none" fill-rule="evenodd"></path>';

const SoundOffSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-sound-off';
  const symbolId = 'snack-uikit-web-icons-' + 'sound-off';
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
export default SoundOffSpriteSVG;
