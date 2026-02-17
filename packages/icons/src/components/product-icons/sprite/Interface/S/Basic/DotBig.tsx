// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.520 6.282 C 10.172 6.389,8.914 6.974,7.944 7.944 C 7.127 8.760,6.602 9.744,6.357 10.920 C 6.232 11.516,6.232 12.484,6.357 13.080 C 6.602 14.256,7.127 15.240,7.944 16.056 C 8.760 16.873,9.744 17.398,10.920 17.643 C 11.254 17.713,11.475 17.731,12.000 17.731 C 12.525 17.731,12.746 17.713,13.080 17.643 C 14.256 17.398,15.240 16.873,16.056 16.056 C 16.873 15.240,17.398 14.256,17.643 13.080 C 17.713 12.746,17.731 12.525,17.731 12.000 C 17.731 11.475,17.713 11.254,17.643 10.920 C 17.397 9.742,16.872 8.758,16.055 7.944 C 14.844 6.736,13.236 6.146,11.520 6.282 " stroke="none" fill-rule="evenodd"></path>';

const DotBigSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-dot-big';
  const symbolId = 'snack-uikit-product-icons-' + 'dot-big';
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
export default DotBigSpriteSVG;
