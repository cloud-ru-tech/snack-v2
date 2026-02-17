// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.840 4.100 L 8.940 6.000 10.850 7.910 L 12.760 9.820 12.760 8.308 L 12.760 6.796 12.910 6.820 C 15.281 7.202,17.189 8.809,17.923 11.043 C 18.159 11.764,18.216 12.143,18.216 13.000 C 18.216 13.857,18.159 14.236,17.923 14.957 C 17.467 16.345,16.475 17.600,15.253 18.334 C 14.657 18.692,13.943 18.972,13.234 19.127 C 12.879 19.205,12.703 19.218,12.000 19.218 C 11.297 19.218,11.121 19.205,10.766 19.127 C 9.462 18.842,8.398 18.252,7.500 17.314 C 6.842 16.627,6.379 15.864,6.083 14.978 C 5.837 14.242,5.782 13.870,5.783 12.960 C 5.785 12.305,5.799 12.113,5.875 11.760 C 6.168 10.395,6.807 9.290,7.857 8.330 L 8.084 8.123 7.618 7.541 L 7.152 6.960 7.005 7.076 C 6.777 7.256,6.145 7.910,5.898 8.220 C 5.399 8.847,4.942 9.700,4.664 10.525 C 4.107 12.177,4.107 13.823,4.666 15.480 C 4.954 16.335,5.430 17.205,5.981 17.881 C 6.281 18.248,7.005 18.945,7.361 19.208 C 8.876 20.326,10.776 20.880,12.573 20.726 C 13.307 20.663,13.813 20.559,14.480 20.334 C 15.684 19.929,16.666 19.302,17.581 18.355 C 18.410 17.496,18.957 16.599,19.336 15.475 C 19.890 13.831,19.890 12.169,19.336 10.525 C 18.787 8.897,17.724 7.513,16.280 6.542 C 15.485 6.009,14.358 5.556,13.428 5.396 C 13.160 5.349,12.900 5.304,12.850 5.295 L 12.761 5.279 12.750 3.739 L 12.740 2.200 10.840 4.100 " stroke="none" fill-rule="evenodd"></path>';

const RepeatSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-repeat';
  const symbolId = 'snack-uikit-product-icons-' + 'repeat';
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
export default RepeatSpriteSVG;
