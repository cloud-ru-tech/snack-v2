// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 10.500 L 3.240 17.760 5.740 17.760 L 8.240 17.760 8.240 19.480 C 8.240 20.426,8.249 21.200,8.260 21.200 C 8.271 21.200,9.828 20.426,11.720 19.480 L 15.160 17.760 17.960 17.760 L 20.760 17.760 20.760 10.500 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 10.500 M19.240 10.500 L 19.240 16.240 17.040 16.240 L 14.840 16.240 12.320 17.500 C 10.934 18.193,9.791 18.760,9.780 18.760 C 9.769 18.760,9.760 18.193,9.760 17.500 L 9.760 16.240 7.260 16.240 L 4.760 16.240 4.760 10.500 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 10.500 M7.000 9.000 L 7.000 9.760 12.000 9.760 L 17.000 9.760 17.000 9.000 L 17.000 8.240 12.000 8.240 L 7.000 8.240 7.000 9.000 M7.000 12.000 L 7.000 12.760 12.000 12.760 L 17.000 12.760 17.000 12.000 L 17.000 11.240 12.000 11.240 L 7.000 11.240 7.000 12.000 " stroke="none" fill-rule="evenodd"></path>';

const FeedbackSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-feedback';
  const symbolId = 'snack-uikit-product-icons-' + 'feedback';
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
export default FeedbackSpriteSVG;
