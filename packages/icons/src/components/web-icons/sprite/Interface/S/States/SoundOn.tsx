// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.224 5.559 L 7.708 7.760 5.974 7.760 L 4.240 7.760 4.240 12.000 L 4.240 16.240 5.974 16.240 L 7.708 16.240 10.224 18.441 L 12.740 20.642 12.750 16.321 C 12.756 13.944,12.756 10.056,12.750 7.679 L 12.740 3.358 10.224 5.559 M15.000 7.005 L 15.000 7.760 15.190 7.760 C 15.295 7.760,15.532 7.787,15.719 7.820 C 17.496 8.133,18.867 9.504,19.180 11.281 C 19.546 13.360,18.302 15.395,16.259 16.055 C 15.962 16.152,15.463 16.240,15.216 16.240 L 15.000 16.240 15.000 17.002 L 15.000 17.764 15.350 17.738 C 16.773 17.633,18.067 17.045,19.056 16.056 C 19.873 15.240,20.398 14.256,20.643 13.080 C 20.713 12.746,20.731 12.525,20.731 12.000 C 20.731 11.475,20.713 11.254,20.643 10.920 C 20.397 9.742,19.872 8.758,19.055 7.944 C 18.024 6.916,16.767 6.358,15.270 6.266 L 15.000 6.249 15.000 7.005 M11.230 14.661 L 11.220 17.322 9.760 16.042 L 8.300 14.763 7.030 14.761 L 5.760 14.760 5.760 12.000 L 5.760 9.240 7.030 9.239 L 8.300 9.237 9.760 7.958 L 11.220 6.678 11.230 9.339 C 11.236 10.803,11.236 13.197,11.230 14.661 M15.000 9.998 L 15.000 10.750 15.176 10.769 C 15.552 10.812,15.945 11.103,16.127 11.472 C 16.260 11.742,16.260 12.259,16.127 12.529 C 15.938 12.912,15.473 13.240,15.118 13.240 L 15.000 13.240 15.000 14.005 L 15.000 14.769 15.270 14.741 C 15.907 14.673,16.472 14.400,16.936 13.936 C 17.271 13.601,17.482 13.260,17.628 12.820 C 17.719 12.543,17.733 12.433,17.733 12.000 C 17.733 11.568,17.719 11.457,17.628 11.180 C 17.273 10.101,16.353 9.367,15.230 9.266 L 15.000 9.246 15.000 9.998 " stroke="none" fill-rule="evenodd"></path>';

const SoundOnSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-sound-on';
  const symbolId = 'snack-uikit-web-icons-' + 'sound-on';
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
export default SoundOnSpriteSVG;
