// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M9.780 2.282 C 7.042 2.471,4.643 4.296,3.696 6.910 C 3.383 7.771,3.264 8.485,3.264 9.480 C 3.264 10.702,3.500 11.764,3.985 12.729 L 4.160 13.079 3.555 14.589 C 3.222 15.420,2.941 16.131,2.930 16.170 C 2.912 16.236,3.033 16.240,5.075 16.240 L 7.240 16.240 7.240 17.500 L 7.240 18.760 9.280 18.760 L 11.320 18.760 14.280 20.240 L 17.240 21.720 17.240 20.240 L 17.240 18.760 19.000 18.760 L 20.760 18.760 20.760 13.500 L 20.760 8.240 18.999 8.240 C 17.624 8.240,17.235 8.229,17.224 8.190 C 17.216 8.162,17.170 7.960,17.120 7.740 C 16.715 5.947,15.558 4.314,13.998 3.334 C 12.742 2.544,11.276 2.179,9.780 2.282 M11.080 3.818 C 13.478 4.182,15.358 6.070,15.742 8.500 C 15.815 8.963,15.815 9.845,15.741 10.280 C 15.541 11.467,15.033 12.427,14.175 13.240 C 13.272 14.095,12.175 14.582,10.846 14.718 C 10.437 14.759,5.120 14.780,5.120 14.740 C 5.120 14.730,5.283 14.314,5.481 13.817 L 5.843 12.912 5.636 12.589 C 5.042 11.663,4.762 10.648,4.761 9.420 C 4.761 6.597,6.726 4.255,9.460 3.820 C 9.901 3.750,10.625 3.749,11.080 3.818 M9.717 5.217 C 9.068 5.360,8.359 5.900,8.061 6.478 C 7.964 6.667,7.847 7.106,7.835 7.323 L 7.824 7.540 8.567 7.551 L 9.311 7.562 9.339 7.412 C 9.423 6.963,9.803 6.670,10.297 6.672 C 10.623 6.674,10.847 6.770,11.040 6.989 C 11.216 7.189,11.262 7.350,11.227 7.645 C 11.162 8.189,10.442 8.941,9.570 9.374 L 9.240 9.538 9.240 10.269 L 9.240 11.000 10.000 11.000 L 10.760 11.000 10.761 10.710 L 10.763 10.420 11.014 10.251 C 11.338 10.032,11.874 9.534,12.098 9.243 C 12.781 8.355,12.934 7.341,12.514 6.480 C 12.331 6.105,11.837 5.620,11.440 5.426 C 10.931 5.177,10.267 5.096,9.717 5.217 M19.240 13.500 L 19.240 17.240 17.500 17.240 L 15.760 17.240 15.760 18.260 C 15.760 18.821,15.751 19.280,15.740 19.280 C 15.729 19.280,14.802 18.821,13.680 18.260 L 11.640 17.240 10.200 17.240 L 8.760 17.240 8.760 16.740 L 8.760 16.240 9.820 16.240 C 11.157 16.240,11.705 16.168,12.600 15.873 C 13.655 15.526,14.483 15.027,15.273 14.263 C 16.448 13.127,17.124 11.703,17.302 9.990 L 17.326 9.760 18.283 9.760 L 19.240 9.760 19.240 13.500 M9.249 12.750 L 9.260 13.500 10.000 13.500 L 10.740 13.500 10.751 12.750 L 10.762 12.000 10.000 12.000 L 9.238 12.000 9.249 12.750 " stroke="none" fill-rule="evenodd"></path>';

const BubblesQuestionSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bubbles-question';
  const symbolId = 'snack-uikit-web-icons-' + 'bubbles-question';
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
export default BubblesQuestionSpriteSVG;
