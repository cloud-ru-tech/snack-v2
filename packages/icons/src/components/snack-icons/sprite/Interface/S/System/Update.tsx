// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M18.593 5.346 L 17.447 6.493 17.133 6.203 C 16.242 5.377,14.842 4.675,13.580 4.419 C 11.282 3.954,8.883 4.539,7.100 6.000 C 6.718 6.314,6.062 6.996,5.793 7.361 C 4.940 8.514,4.415 9.884,4.282 11.300 C 4.259 11.542,4.240 11.798,4.240 11.870 L 4.240 12.000 4.994 12.000 L 5.748 12.000 5.774 11.607 C 5.831 10.734,6.067 9.880,6.459 9.130 C 7.213 7.685,8.539 6.560,10.071 6.065 C 10.785 5.834,11.148 5.782,12.040 5.783 C 12.881 5.785,13.305 5.847,13.960 6.065 C 14.694 6.309,15.608 6.837,16.120 7.313 L 16.380 7.554 15.280 8.657 L 14.181 9.760 16.970 9.760 L 19.760 9.760 19.760 6.980 C 19.760 5.451,19.755 4.200,19.750 4.200 C 19.744 4.200,19.224 4.716,18.593 5.346 M18.226 12.390 C 18.121 13.971,17.465 15.391,16.335 16.482 C 15.765 17.032,15.336 17.328,14.633 17.656 C 13.816 18.038,13.152 18.196,12.232 18.228 C 11.319 18.260,10.593 18.149,9.818 17.858 C 9.138 17.603,8.355 17.129,7.873 16.680 L 7.620 16.446 8.720 15.343 L 9.819 14.240 7.030 14.240 L 4.240 14.240 4.240 17.030 L 4.240 19.819 5.394 18.666 L 6.548 17.513 6.874 17.805 C 7.356 18.236,7.833 18.562,8.440 18.875 C 10.341 19.856,12.455 20.017,14.480 19.334 C 15.684 18.929,16.666 18.302,17.581 17.355 C 18.410 16.496,18.957 15.599,19.336 14.475 C 19.584 13.740,19.760 12.767,19.760 12.133 L 19.760 12.000 19.006 12.000 L 18.252 12.000 18.226 12.390 " stroke="none" fill-rule="evenodd"></path>';

const UpdateSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-update';
  const symbolId = 'snack-uikit-snack-icons-' + 'update';
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
export default UpdateSpriteSVG;
