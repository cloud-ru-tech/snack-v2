// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.280 C 9.269 3.429,7.313 4.328,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.645 3.115,11.340 3.280 M13.232 4.856 C 13.780 4.957,14.308 5.111,14.757 5.300 C 15.252 5.510,15.779 5.803,15.762 5.860 C 15.756 5.882,14.794 7.141,13.625 8.657 C 12.456 10.174,11.479 11.444,11.453 11.480 C 11.413 11.536,11.448 11.577,11.691 11.763 L 11.976 11.980 11.608 11.992 L 11.240 12.003 11.240 15.602 L 11.240 19.200 11.130 19.200 C 10.940 19.199,10.104 19.011,9.714 18.881 C 9.298 18.742,8.644 18.440,8.267 18.214 C 6.676 17.258,5.426 15.583,4.987 13.820 C 4.809 13.106,4.781 12.857,4.781 12.000 C 4.781 11.143,4.809 10.894,4.987 10.180 C 5.605 7.699,7.696 5.608,10.180 4.986 C 10.528 4.899,10.747 4.860,11.300 4.783 C 11.566 4.746,12.915 4.797,13.232 4.856 M17.306 7.070 C 18.347 8.220,18.993 9.584,19.180 11.030 L 19.208 11.240 16.380 11.240 C 14.826 11.240,13.559 11.225,13.567 11.208 C 13.592 11.147,16.980 6.761,17.002 6.761 C 17.015 6.760,17.151 6.900,17.306 7.070 M19.183 12.970 C 18.982 14.513,18.238 15.999,17.098 17.136 C 16.086 18.145,14.850 18.810,13.446 19.102 C 13.190 19.156,12.931 19.200,12.870 19.200 L 12.760 19.200 12.760 15.980 L 12.760 12.760 15.985 12.760 L 19.210 12.760 19.183 12.970 " stroke="none" fill-rule="evenodd"></path>';

const QuotaSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-quota';
  const symbolId = 'snack-uikit-product-icons-' + 'quota';
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
export default QuotaSpriteSVG;
