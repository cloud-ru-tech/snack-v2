// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.444 7.495 L 4.240 12.750 4.240 13.755 L 4.240 14.760 7.180 14.760 C 9.506 14.760,10.120 14.770,10.119 14.810 C 10.118 14.838,9.896 16.404,9.626 18.290 C 9.355 20.177,9.143 21.730,9.154 21.740 C 9.164 21.751,9.670 21.759,10.277 21.758 L 11.380 21.757 15.310 16.512 L 19.240 11.267 19.240 10.253 L 19.240 9.240 16.560 9.240 C 14.442 9.240,13.880 9.230,13.881 9.190 C 13.882 9.162,14.104 7.596,14.374 5.710 C 14.645 3.823,14.857 2.270,14.846 2.260 C 14.836 2.249,14.336 2.240,13.737 2.240 L 12.648 2.240 8.444 7.495 " stroke="none" fill-rule="evenodd"></path>';

const FeaturedFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-featured-filled';
  const symbolId = 'snack-uikit-product-icons-' + 'featured-filled';
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
export default FeaturedFilledSpriteSVG;
