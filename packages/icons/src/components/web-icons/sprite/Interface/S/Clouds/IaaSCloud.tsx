// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.540 3.282 C 11.129 3.316,10.613 3.431,10.238 3.572 C 8.480 4.233,7.224 5.738,6.853 7.625 C 6.816 7.813,6.767 7.973,6.743 7.979 C 6.719 7.985,6.583 8.012,6.440 8.038 C 5.053 8.294,3.657 9.345,2.928 10.680 C 2.089 12.217,2.029 14.082,2.766 15.677 C 3.142 16.491,3.893 17.379,4.604 17.851 C 4.920 18.061,5.709 18.466,5.738 18.434 C 5.768 18.400,6.252 17.039,6.237 17.030 C 6.228 17.024,6.066 16.945,5.878 16.854 C 4.821 16.342,4.030 15.261,3.816 14.034 C 3.693 13.327,3.785 12.466,4.055 11.796 C 4.312 11.161,4.861 10.468,5.407 10.093 C 5.785 9.832,5.963 9.744,6.412 9.593 C 6.756 9.477,6.828 9.468,7.504 9.450 L 8.228 9.431 8.253 8.803 C 8.282 8.051,8.361 7.626,8.563 7.129 C 8.937 6.210,9.646 5.472,10.540 5.073 C 11.071 4.836,11.342 4.781,12.000 4.781 C 12.682 4.781,12.947 4.838,13.514 5.104 C 13.980 5.322,14.303 5.552,14.645 5.906 C 15.414 6.705,15.755 7.673,15.759 9.065 L 15.760 9.430 16.490 9.450 C 17.172 9.468,17.244 9.477,17.588 9.593 C 18.248 9.814,18.621 10.049,19.120 10.559 C 19.621 11.070,19.936 11.631,20.125 12.350 C 20.241 12.791,20.268 13.553,20.185 14.028 C 19.970 15.259,19.180 16.342,18.122 16.854 C 17.934 16.945,17.772 17.024,17.763 17.030 C 17.748 17.039,18.232 18.400,18.262 18.434 C 18.269 18.441,18.449 18.365,18.663 18.264 C 20.211 17.530,21.334 16.071,21.654 14.377 C 21.931 12.915,21.585 11.332,20.726 10.123 C 20.444 9.726,19.920 9.199,19.532 8.923 C 18.932 8.495,18.162 8.149,17.560 8.038 C 17.417 8.012,17.280 7.985,17.255 7.978 C 17.230 7.971,17.189 7.848,17.164 7.704 C 17.060 7.108,16.782 6.347,16.491 5.862 C 15.430 4.095,13.550 3.116,11.540 3.282 M11.240 13.240 L 11.240 15.240 9.240 15.240 L 7.240 15.240 7.240 18.000 L 7.240 20.760 12.000 20.760 L 16.760 20.760 16.760 16.000 L 16.760 11.240 14.000 11.240 L 11.240 11.240 11.240 13.240 M15.240 14.000 L 15.240 15.240 14.000 15.240 L 12.760 15.240 12.760 14.000 L 12.760 12.760 14.000 12.760 L 15.240 12.760 15.240 14.000 M11.240 18.000 L 11.240 19.240 10.000 19.240 L 8.760 19.240 8.760 18.000 L 8.760 16.760 10.000 16.760 L 11.240 16.760 11.240 18.000 M15.240 18.000 L 15.240 19.240 14.000 19.240 L 12.760 19.240 12.760 18.000 L 12.760 16.760 14.000 16.760 L 15.240 16.760 15.240 18.000 " stroke="none" fill-rule="evenodd"></path>';

const IaaSCloudSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-iaa-s-cloud';
  const symbolId = 'snack-uikit-web-icons-' + 'iaa-s-cloud';
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
export default IaaSCloudSpriteSVG;
