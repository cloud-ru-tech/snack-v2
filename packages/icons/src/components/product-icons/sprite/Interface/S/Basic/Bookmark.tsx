// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.280 C 4.240 17.252,4.248 21.320,4.258 21.320 C 4.268 21.320,6.000 20.272,8.108 18.992 C 10.216 17.712,11.967 16.664,12.000 16.664 C 12.033 16.664,13.784 17.712,15.892 18.992 C 18.000 20.272,19.732 21.320,19.742 21.320 C 19.752 21.320,19.760 17.252,19.760 12.280 L 19.760 3.240 12.000 3.240 L 4.240 3.240 4.240 12.280 M18.240 11.700 C 18.240 15.517,18.231 18.640,18.221 18.640 C 18.211 18.640,16.807 17.793,15.101 16.757 L 12.000 14.874 8.899 16.757 C 7.193 17.793,5.789 18.640,5.779 18.640 C 5.769 18.640,5.760 15.517,5.760 11.700 L 5.760 4.760 12.000 4.760 L 18.240 4.760 18.240 11.700 " stroke="none" fill-rule="evenodd"></path>';

const BookmarkSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bookmark';
  const symbolId = 'snack-uikit-product-icons-' + 'bookmark';
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
export default BookmarkSpriteSVG;
