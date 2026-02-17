// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.281 C 9.259 3.432,7.316 4.326,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.640 3.114,11.340 3.281 M13.232 4.856 C 14.352 5.063,15.344 5.485,16.247 6.138 L 16.569 6.371 11.475 11.466 L 6.380 16.562 6.288 16.451 C 5.751 15.802,5.206 14.701,4.987 13.820 C 4.809 13.106,4.781 12.857,4.781 12.000 C 4.781 11.143,4.809 10.894,4.987 10.180 C 5.605 7.699,7.696 5.608,10.180 4.986 C 10.528 4.899,10.747 4.860,11.300 4.783 C 11.566 4.746,12.915 4.797,13.232 4.856 M8.600 6.742 C 7.910 6.891,7.224 7.440,6.923 8.085 C 6.426 9.149,6.697 10.313,7.620 11.077 C 8.379 11.706,9.605 11.776,10.436 11.240 C 10.927 10.922,11.326 10.421,11.485 9.923 C 11.604 9.550,11.629 8.973,11.543 8.587 C 11.254 7.287,9.927 6.456,8.600 6.742 M17.887 7.787 C 18.538 8.697,18.964 9.724,19.167 10.880 C 19.199 11.063,19.219 11.500,19.219 12.000 C 19.219 12.500,19.199 12.937,19.167 13.120 C 18.892 14.684,18.207 16.020,17.120 17.112 C 16.083 18.154,14.839 18.820,13.360 19.125 C 12.956 19.209,12.791 19.220,12.000 19.220 C 11.209 19.220,11.044 19.209,10.640 19.125 C 9.555 18.901,8.574 18.472,7.724 17.848 L 7.429 17.631 12.522 12.538 C 15.323 9.737,17.626 7.451,17.639 7.459 C 17.652 7.468,17.764 7.615,17.887 7.787 M9.540 8.275 C 9.886 8.434,10.085 8.749,10.087 9.141 C 10.090 9.603,9.784 9.988,9.341 10.080 C 8.740 10.205,8.203 9.766,8.201 9.149 C 8.199 8.757,8.399 8.434,8.740 8.276 C 8.951 8.178,9.328 8.178,9.540 8.275 M14.300 12.459 C 13.609 12.610,12.974 13.113,12.642 13.772 C 12.285 14.477,12.333 15.495,12.753 16.144 C 13.483 17.274,14.828 17.632,16.041 17.020 C 16.342 16.868,16.875 16.328,17.029 16.020 C 17.261 15.555,17.300 15.383,17.297 14.840 C 17.294 14.312,17.262 14.168,17.049 13.730 C 16.849 13.318,16.384 12.867,15.925 12.640 C 15.467 12.412,14.834 12.342,14.300 12.459 M15.281 14.002 C 15.613 14.168,15.798 14.475,15.798 14.860 C 15.798 15.875,14.458 16.177,13.993 15.266 C 13.866 15.018,13.882 14.654,14.030 14.391 C 14.276 13.953,14.835 13.779,15.281 14.002 " stroke="none" fill-rule="evenodd"></path>';

const DiscountSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-discount';
  const symbolId = 'snack-uikit-product-icons-' + 'discount';
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
export default DiscountSpriteSVG;
