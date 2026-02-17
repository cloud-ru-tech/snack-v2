// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.280 C 8.231 3.503,5.407 5.437,4.081 8.251 C 3.735 8.983,3.480 9.816,3.334 10.680 C 3.270 11.062,3.263 11.539,3.250 15.930 L 3.237 20.760 6.238 20.760 L 9.240 20.760 9.240 17.000 L 9.240 13.240 6.995 13.240 L 4.751 13.240 4.771 12.150 C 4.784 11.396,4.810 10.957,4.854 10.726 C 5.143 9.209,5.797 7.958,6.858 6.898 C 8.628 5.128,11.076 4.404,13.550 4.920 C 15.737 5.376,17.693 6.961,18.610 9.020 C 19.090 10.097,19.202 10.663,19.229 12.150 L 19.249 13.240 17.245 13.240 L 15.240 13.240 15.240 17.000 L 15.240 20.760 18.000 20.760 L 20.760 20.760 20.760 16.210 C 20.760 13.352,20.744 11.489,20.718 11.200 C 20.531 9.154,19.665 7.299,18.223 5.856 C 17.445 5.077,16.817 4.626,15.860 4.157 C 14.444 3.464,12.916 3.167,11.340 3.280 M7.760 17.000 L 7.760 19.240 6.260 19.240 L 4.760 19.240 4.760 17.000 L 4.760 14.760 6.260 14.760 L 7.760 14.760 7.760 17.000 M19.240 17.000 L 19.240 19.240 18.000 19.240 L 16.760 19.240 16.760 17.000 L 16.760 14.760 18.000 14.760 L 19.240 14.760 19.240 17.000 " stroke="none" fill-rule="evenodd"></path>';

const HeadphonesSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-headphones';
  const symbolId = 'snack-uikit-product-icons-' + 'headphones';
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
export default HeadphonesSpriteSVG;
