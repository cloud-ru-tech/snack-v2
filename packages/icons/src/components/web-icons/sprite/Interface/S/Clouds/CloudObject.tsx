// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.540 4.282 C 11.129 4.316,10.613 4.431,10.238 4.572 C 8.480 5.233,7.224 6.738,6.853 8.625 C 6.816 8.813,6.767 8.973,6.743 8.979 C 6.719 8.985,6.583 9.012,6.440 9.038 C 5.053 9.294,3.657 10.345,2.928 11.680 C 1.566 14.175,2.336 17.347,4.681 18.897 C 5.220 19.253,5.810 19.499,6.492 19.650 L 6.900 19.740 12.000 19.740 L 17.100 19.740 17.508 19.650 C 19.842 19.133,21.486 17.251,21.723 14.824 C 21.906 12.949,21.032 10.992,19.532 9.923 C 18.932 9.495,18.162 9.149,17.560 9.038 C 17.417 9.012,17.280 8.985,17.255 8.978 C 17.230 8.971,17.189 8.848,17.164 8.704 C 17.060 8.108,16.782 7.347,16.491 6.862 C 15.430 5.095,13.550 4.116,11.540 4.282 M12.880 5.861 C 13.227 5.951,13.830 6.237,14.134 6.455 C 14.464 6.691,14.869 7.118,15.096 7.470 C 15.555 8.179,15.756 8.966,15.759 10.065 L 15.760 10.430 16.490 10.450 C 17.172 10.468,17.244 10.477,17.588 10.593 C 18.248 10.814,18.621 11.049,19.120 11.559 C 19.618 12.067,19.927 12.616,20.128 13.350 C 20.198 13.605,20.214 13.777,20.216 14.320 C 20.219 14.920,20.209 15.015,20.111 15.368 C 19.733 16.724,18.811 17.692,17.500 18.106 L 17.140 18.220 12.000 18.220 L 6.860 18.220 6.500 18.106 C 5.148 17.679,4.193 16.645,3.853 15.240 C 3.745 14.796,3.755 13.777,3.872 13.350 C 4.129 12.408,4.686 11.589,5.407 11.093 C 5.785 10.832,5.963 10.744,6.412 10.593 C 6.756 10.477,6.828 10.468,7.504 10.450 L 8.228 10.431 8.253 9.803 C 8.282 9.051,8.361 8.626,8.563 8.129 C 8.844 7.439,9.384 6.770,9.980 6.375 C 10.303 6.161,10.799 5.943,11.140 5.865 C 11.294 5.831,11.456 5.793,11.500 5.783 C 11.677 5.742,12.629 5.795,12.880 5.861 M9.809 11.811 L 9.240 12.381 9.240 14.001 L 9.240 15.621 9.811 16.191 L 10.381 16.760 12.001 16.760 L 13.621 16.760 14.191 16.189 L 14.760 15.619 14.760 13.999 L 14.760 12.379 14.189 11.809 L 13.619 11.240 11.999 11.240 L 10.379 11.240 9.809 11.811 M13.133 12.872 L 13.240 12.984 13.240 14.000 L 13.240 15.016 13.133 15.128 L 13.025 15.240 12.005 15.240 L 10.984 15.240 10.872 15.133 L 10.760 15.025 10.760 14.005 L 10.760 12.984 10.867 12.872 L 10.975 12.760 12.000 12.760 L 13.025 12.760 13.133 12.872 " stroke="none" fill-rule="evenodd"></path>';

const CloudObjectSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cloud-object';
  const symbolId = 'snack-uikit-web-icons-' + 'cloud-object';
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
export default CloudObjectSpriteSVG;
