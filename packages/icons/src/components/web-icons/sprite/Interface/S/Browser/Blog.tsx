// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M18.470 5.530 L 19.240 6.299 19.240 11.999 L 19.240 17.699 18.470 18.470 L 17.701 19.240 12.000 19.240 L 6.299 19.240 5.530 18.470 L 4.760 17.699 4.760 12.000 L 4.760 6.301 5.530 5.530 L 6.299 4.760 11.999 4.760 L 17.699 4.760 18.470 5.530 M7.000 8.000 L 7.000 8.762 7.750 8.751 L 8.500 8.740 8.500 8.000 L 8.500 7.260 7.750 7.249 L 7.000 7.238 7.000 8.000 M11.240 10.000 L 11.240 12.760 14.000 12.760 L 16.760 12.760 16.760 10.000 L 16.760 7.240 14.000 7.240 L 11.240 7.240 11.240 10.000 M15.240 10.000 L 15.240 11.240 14.000 11.240 L 12.760 11.240 12.760 10.000 L 12.760 8.760 14.000 8.760 L 15.240 8.760 15.240 10.000 M7.000 12.000 L 7.000 12.762 7.750 12.751 L 8.500 12.740 8.500 12.000 L 8.500 11.260 7.750 11.249 L 7.000 11.238 7.000 12.000 M7.000 16.000 L 7.000 16.760 12.010 16.750 L 17.020 16.740 17.020 16.000 L 17.020 15.260 12.010 15.250 L 7.000 15.240 7.000 16.000 " stroke="none" fill-rule="evenodd"></path>';

const BlogSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-blog';
  const symbolId = 'snack-uikit-web-icons-' + 'blog';
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
export default BlogSpriteSVG;
