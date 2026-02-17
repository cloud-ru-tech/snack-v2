// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.070 7.870 L 2.440 12.500 6.970 17.030 L 11.500 21.560 16.130 16.930 L 20.760 12.300 20.760 7.770 L 20.760 3.240 16.230 3.240 L 11.700 3.240 7.070 7.870 M19.240 8.230 L 19.240 11.700 15.370 15.570 L 11.500 19.440 8.030 15.970 L 4.560 12.500 8.430 8.630 L 12.300 4.760 15.770 4.760 L 19.240 4.760 19.240 8.230 M16.277 6.282 C 15.501 6.408,15.036 7.287,15.367 8.003 C 15.819 8.985,17.181 8.985,17.633 8.003 C 17.713 7.831,17.737 7.716,17.737 7.500 C 17.737 6.725,17.053 6.155,16.277 6.282 M16.662 7.338 C 16.716 7.392,16.760 7.465,16.760 7.500 C 16.760 7.582,16.582 7.760,16.500 7.760 C 16.418 7.760,16.240 7.582,16.240 7.500 C 16.240 7.418,16.418 7.240,16.500 7.240 C 16.535 7.240,16.608 7.284,16.662 7.338 M8.000 12.000 L 8.000 12.760 12.000 12.760 L 16.000 12.760 16.000 12.000 L 16.000 11.240 12.000 11.240 L 8.000 11.240 8.000 12.000 " stroke="none" fill-rule="evenodd"></path>';

const TagDashSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-tag-dash';
  const symbolId = 'snack-uikit-product-icons-' + 'tag-dash';
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
export default TagDashSpriteSVG;
