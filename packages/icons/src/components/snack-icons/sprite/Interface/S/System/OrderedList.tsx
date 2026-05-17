// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.100 3.840 L 3.460 5.480 3.990 6.009 L 4.519 6.539 4.880 6.180 L 5.240 5.822 5.240 7.911 L 5.240 10.000 6.000 10.000 L 6.760 10.000 6.760 6.100 C 6.760 3.955,6.755 2.200,6.750 2.200 C 6.744 2.200,6.002 2.938,5.100 3.840 M11.000 6.000 L 11.000 6.760 15.500 6.760 L 20.000 6.760 20.000 6.000 L 20.000 5.240 15.500 5.240 L 11.000 5.240 11.000 6.000 M11.000 12.000 L 11.000 12.760 15.500 12.760 L 20.000 12.760 20.000 12.000 L 20.000 11.240 15.500 11.240 L 11.000 11.240 11.000 12.000 M5.630 12.281 C 4.398 12.428,3.394 13.465,3.259 14.730 L 3.231 15.000 3.990 15.000 L 4.750 15.000 4.769 14.824 C 4.812 14.448,5.103 14.055,5.472 13.873 C 5.624 13.798,5.725 13.780,6.000 13.780 C 6.399 13.780,6.616 13.866,6.875 14.125 C 7.143 14.392,7.295 14.815,7.225 15.096 C 7.161 15.348,6.657 15.811,4.420 17.673 C 3.166 18.716,2.095 19.613,2.041 19.665 L 1.942 19.760 4.971 19.760 L 8.000 19.760 8.000 19.001 L 8.000 18.241 7.055 18.231 L 6.111 18.220 6.900 17.563 C 8.631 16.122,9.004 15.384,8.618 14.162 C 8.220 12.903,6.978 12.121,5.630 12.281 M11.000 18.000 L 11.000 18.760 15.500 18.760 L 20.000 18.760 20.000 18.000 L 20.000 17.240 15.500 17.240 L 11.000 17.240 11.000 18.000 " stroke="none" fill-rule="evenodd"></path>';

const OrderedListSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-ordered-list';
  const symbolId = 'snack-uikit-snack-icons-' + 'ordered-list';
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
export default OrderedListSpriteSVG;
