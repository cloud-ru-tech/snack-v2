// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.540 4.282 C 11.129 4.316,10.613 4.431,10.238 4.572 C 8.480 5.233,7.224 6.738,6.853 8.625 C 6.816 8.813,6.767 8.973,6.743 8.979 C 6.719 8.985,6.583 9.012,6.440 9.038 C 5.053 9.294,3.657 10.345,2.928 11.680 C 1.566 14.175,2.336 17.347,4.681 18.897 C 5.220 19.253,5.810 19.499,6.492 19.650 L 6.900 19.740 12.000 19.740 L 17.100 19.740 17.508 19.650 C 19.842 19.133,21.486 17.251,21.723 14.824 C 21.906 12.949,21.032 10.992,19.532 9.923 C 18.932 9.495,18.162 9.149,17.560 9.038 C 17.417 9.012,17.280 8.985,17.255 8.978 C 17.230 8.971,17.189 8.848,17.164 8.704 C 17.060 8.108,16.782 7.347,16.491 6.862 C 15.430 5.095,13.550 4.116,11.540 4.282 M11.240 12.042 L 11.240 18.244 9.030 18.230 L 6.820 18.216 6.480 18.104 C 5.131 17.660,4.191 16.635,3.853 15.240 C 3.745 14.796,3.755 13.777,3.872 13.350 C 4.129 12.408,4.686 11.589,5.407 11.093 C 5.785 10.832,5.963 10.744,6.412 10.593 C 6.756 10.477,6.828 10.468,7.504 10.450 L 8.228 10.431 8.253 9.803 C 8.282 9.054,8.361 8.626,8.560 8.136 C 8.912 7.272,9.581 6.538,10.370 6.151 C 10.626 6.025,11.101 5.847,11.190 5.842 C 11.230 5.840,11.240 7.106,11.240 12.042 M13.082 5.924 C 14.320 6.330,15.245 7.316,15.599 8.607 C 15.693 8.949,15.757 9.538,15.759 10.065 L 15.760 10.430 16.490 10.450 C 17.172 10.468,17.244 10.477,17.588 10.593 C 18.248 10.814,18.621 11.049,19.120 11.559 C 19.618 12.067,19.927 12.616,20.128 13.350 C 20.198 13.605,20.214 13.777,20.216 14.320 C 20.219 14.920,20.209 15.015,20.111 15.368 C 19.736 16.714,18.828 17.674,17.520 18.104 L 17.180 18.216 14.970 18.230 L 12.760 18.244 12.760 12.042 C 12.760 8.631,12.775 5.840,12.793 5.840 C 12.812 5.840,12.942 5.878,13.082 5.924 " stroke="none" fill-rule="evenodd"></path>';

const MultiCloudSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-multi-cloud';
  const symbolId = 'snack-uikit-web-icons-' + 'multi-cloud';
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
export default MultiCloudSpriteSVG;
