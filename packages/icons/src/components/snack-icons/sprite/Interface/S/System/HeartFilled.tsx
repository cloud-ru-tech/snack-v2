// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.527 4.284 C 6.133 4.409,4.799 5.208,4.016 6.389 C 3.801 6.712,3.538 7.296,3.425 7.700 C 3.113 8.812,3.232 9.987,3.762 11.040 C 3.995 11.503,4.255 11.843,4.935 12.568 C 8.721 16.611,11.973 20.060,12.000 20.060 C 12.027 20.060,15.279 16.611,19.065 12.568 C 19.933 11.641,20.237 11.189,20.492 10.440 C 20.905 9.227,20.820 8.031,20.239 6.860 C 19.567 5.508,18.284 4.568,16.766 4.316 C 16.620 4.292,16.257 4.272,15.960 4.272 C 14.870 4.273,13.966 4.577,13.086 5.240 C 12.751 5.493,12.306 5.942,12.135 6.200 C 12.077 6.288,12.017 6.360,12.001 6.360 C 11.986 6.360,11.918 6.282,11.850 6.188 C 11.504 5.706,10.990 5.251,10.396 4.900 C 9.563 4.407,8.556 4.191,7.527 4.284 " stroke="none" fill-rule="evenodd"></path>';

const HeartFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-heart-filled';
  const symbolId = 'snack-uikit-snack-icons-' + 'heart-filled';
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
export default HeartFilledSpriteSVG;
