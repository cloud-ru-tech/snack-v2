// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.240 5.240 L 8.240 7.240 6.240 7.240 L 4.240 7.240 4.240 14.800 C 4.240 18.958,4.251 22.360,4.263 22.360 C 4.276 22.360,5.572 21.524,7.143 20.503 L 10.000 18.645 12.857 20.503 C 14.428 21.524,15.724 22.360,15.737 22.360 C 15.749 22.360,15.760 20.902,15.760 19.120 C 15.760 17.338,15.767 15.880,15.776 15.880 C 15.785 15.880,16.671 16.429,17.744 17.100 C 18.818 17.771,19.710 18.320,19.728 18.320 C 19.746 18.320,19.760 14.927,19.760 10.780 L 19.760 3.240 14.000 3.240 L 8.240 3.240 8.240 5.240 M18.240 10.200 L 18.240 15.640 17.890 15.421 C 17.698 15.301,17.140 14.954,16.651 14.651 L 15.763 14.100 15.761 10.670 L 15.760 7.240 12.760 7.240 L 9.760 7.240 9.760 6.000 L 9.760 4.760 14.000 4.760 L 18.240 4.760 18.240 10.200 M14.240 14.182 C 14.240 18.509,14.230 19.599,14.190 19.575 C 14.162 19.559,13.216 18.946,12.087 18.213 C 10.958 17.480,10.019 16.880,10.000 16.880 C 9.981 16.880,9.042 17.480,7.913 18.213 C 6.784 18.946,5.838 19.559,5.810 19.575 C 5.770 19.599,5.760 18.509,5.760 14.182 L 5.760 8.760 10.000 8.760 L 14.240 8.760 14.240 14.182 " stroke="none" fill-rule="evenodd"></path>';

const BookmarksSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bookmarks';
  const symbolId = 'snack-uikit-product-icons-' + 'bookmarks';
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
export default BookmarksSpriteSVG;
