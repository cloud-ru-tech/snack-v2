// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.224 6.447 L 3.515 10.060 4.611 10.080 L 5.707 10.100 4.213 12.754 C 3.392 14.214,2.720 15.416,2.720 15.424 C 2.720 15.433,3.611 15.440,4.700 15.440 C 5.789 15.440,6.680 15.449,6.680 15.460 C 6.680 15.471,6.035 16.628,5.246 18.030 C 4.458 19.433,3.791 20.621,3.765 20.670 L 3.717 20.760 10.359 20.760 L 17.000 20.760 17.000 20.371 L 17.000 19.982 17.271 20.251 L 17.542 20.520 19.721 18.194 C 20.919 16.915,21.900 15.853,21.900 15.834 C 21.900 15.780,15.183 3.843,15.152 3.841 C 15.136 3.841,14.533 4.470,13.812 5.239 L 12.500 6.638 12.395 6.529 C 12.338 6.469,11.593 5.673,10.740 4.760 C 9.887 3.847,9.132 3.040,9.062 2.967 L 8.934 2.835 6.224 6.447 M10.263 6.440 C 10.892 7.111,11.416 7.683,11.428 7.710 C 11.439 7.738,11.231 7.992,10.964 8.275 C 10.698 8.559,10.480 8.804,10.480 8.821 C 10.480 8.838,10.583 8.949,10.710 9.068 L 10.940 9.285 10.652 9.133 C 10.464 9.033,10.351 8.994,10.326 9.020 C 10.305 9.042,9.682 10.140,8.941 11.460 C 8.199 12.780,7.580 13.874,7.564 13.891 C 7.548 13.907,7.030 13.916,6.414 13.911 L 5.293 13.900 6.779 11.260 L 8.264 8.620 7.392 8.609 C 6.912 8.603,6.520 8.590,6.520 8.579 C 6.520 8.526,9.050 5.197,9.082 5.207 C 9.102 5.214,9.633 5.769,10.263 6.440 M17.401 10.870 C 18.796 13.351,19.968 15.434,20.007 15.500 L 20.077 15.621 18.635 17.160 C 17.842 18.007,17.181 18.704,17.167 18.710 C 17.152 18.715,16.019 16.726,14.649 14.290 C 13.280 11.853,12.105 9.767,12.040 9.653 L 11.922 9.446 13.368 7.903 C 14.163 7.054,14.825 6.360,14.839 6.360 C 14.854 6.360,16.006 8.389,17.401 10.870 M13.355 15.053 C 14.634 17.327,15.680 19.199,15.680 19.213 C 15.680 19.228,14.798 19.240,13.720 19.240 L 11.760 19.240 11.760 16.960 L 11.760 14.680 11.000 14.680 L 10.240 14.680 10.240 16.960 L 10.240 19.240 8.280 19.240 C 7.202 19.240,6.320 19.228,6.320 19.213 C 6.320 19.161,10.970 10.920,11.000 10.920 C 11.017 10.920,12.077 12.780,13.355 15.053 " stroke="none" fill-rule="evenodd"></path>';

const CampSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-camp';
  const symbolId = 'snack-uikit-web-icons-' + 'camp';
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
export default CampSpriteSVG;
