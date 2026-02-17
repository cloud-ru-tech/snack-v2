// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M9.765 8.170 L 6.566 12.740 10.543 12.750 C 12.730 12.756,14.520 12.771,14.520 12.783 C 14.520 12.796,13.456 14.326,12.155 16.184 C 10.854 18.043,9.799 19.572,9.809 19.582 C 9.866 19.639,10.979 20.400,11.005 20.400 C 11.022 20.400,12.476 18.343,14.235 15.830 L 17.434 11.260 13.457 11.250 C 11.270 11.244,9.480 11.229,9.480 11.217 C 9.480 11.204,10.544 9.674,11.845 7.816 C 13.146 5.957,14.201 4.428,14.191 4.418 C 14.134 4.361,13.021 3.600,12.995 3.600 C 12.978 3.600,11.524 5.657,9.765 8.170 " stroke="none" fill-rule="evenodd"></path>';

const ZapFlashSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-zap-flash';
  const symbolId = 'snack-uikit-product-icons-' + 'zap-flash';
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
export default ZapFlashSpriteSVG;
