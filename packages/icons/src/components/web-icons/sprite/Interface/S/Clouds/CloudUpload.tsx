// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.540 4.282 C 11.129 4.316,10.613 4.431,10.238 4.572 C 8.480 5.233,7.224 6.738,6.853 8.625 C 6.816 8.813,6.767 8.973,6.743 8.979 C 6.719 8.985,6.583 9.012,6.440 9.038 C 5.053 9.294,3.657 10.345,2.928 11.680 C 1.566 14.175,2.336 17.347,4.681 18.897 C 5.423 19.387,6.350 19.696,7.180 19.728 L 7.500 19.740 7.500 19.000 L 7.500 18.260 7.160 18.229 C 5.580 18.087,4.252 16.887,3.853 15.240 C 3.745 14.796,3.755 13.777,3.872 13.350 C 4.129 12.408,4.686 11.589,5.407 11.093 C 5.785 10.832,5.963 10.744,6.412 10.593 C 6.756 10.477,6.828 10.468,7.504 10.450 L 8.228 10.431 8.253 9.803 C 8.282 9.051,8.361 8.626,8.563 8.129 C 8.937 7.210,9.646 6.472,10.540 6.073 C 11.071 5.836,11.342 5.781,12.000 5.781 C 12.682 5.781,12.947 5.838,13.514 6.104 C 13.980 6.322,14.303 6.552,14.645 6.906 C 15.414 7.705,15.755 8.673,15.759 10.065 L 15.760 10.430 16.490 10.450 C 17.172 10.468,17.244 10.477,17.588 10.593 C 18.248 10.814,18.621 11.049,19.120 11.559 C 19.618 12.067,19.927 12.616,20.128 13.350 C 20.198 13.605,20.214 13.777,20.216 14.320 C 20.219 14.920,20.209 15.015,20.111 15.368 C 19.667 16.962,18.377 18.090,16.840 18.229 L 16.500 18.260 16.500 19.000 L 16.500 19.740 16.820 19.728 C 17.650 19.696,18.577 19.387,19.319 18.897 C 21.226 17.637,22.141 15.255,21.583 13.005 C 21.198 11.453,20.193 10.180,18.800 9.481 C 18.359 9.260,17.928 9.106,17.560 9.038 C 17.417 9.012,17.280 8.985,17.255 8.978 C 17.230 8.971,17.189 8.848,17.164 8.704 C 17.060 8.108,16.782 7.347,16.491 6.862 C 15.430 5.095,13.550 4.116,11.540 4.282 M10.580 13.360 L 9.180 14.760 10.210 14.760 L 11.240 14.760 11.240 17.380 L 11.240 20.000 12.000 20.000 L 12.760 20.000 12.760 17.380 L 12.760 14.760 13.790 14.760 L 14.820 14.760 13.420 13.360 C 12.650 12.590,12.011 11.960,12.000 11.960 C 11.989 11.960,11.350 12.590,10.580 13.360 " stroke="none" fill-rule="evenodd"></path>';

const CloudUploadSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cloud-upload';
  const symbolId = 'snack-uikit-web-icons-' + 'cloud-upload';
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
export default CloudUploadSpriteSVG;
