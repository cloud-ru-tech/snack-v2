// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.360 3.281 C 8.872 3.446,6.493 4.749,4.987 6.772 C 4.123 7.933,3.559 9.293,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.627 15.153,4.473 16.835,5.819 18.181 C 8.175 20.537,11.600 21.347,14.760 20.297 C 16.069 19.862,17.198 19.163,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.861 3.835,13.684 3.126,11.360 3.281 M13.232 4.856 C 14.742 5.135,16.048 5.818,17.115 6.885 C 18.203 7.973,18.891 9.313,19.167 10.880 C 19.199 11.063,19.219 11.500,19.219 12.000 C 19.219 12.500,19.199 12.937,19.167 13.120 C 18.893 14.679,18.210 16.014,17.126 17.108 C 16.097 18.146,14.839 18.820,13.360 19.125 C 12.956 19.209,12.791 19.220,12.000 19.220 C 11.209 19.220,11.044 19.209,10.640 19.125 C 9.179 18.824,7.920 18.155,6.909 17.144 C 5.787 16.022,5.119 14.726,4.834 13.120 C 4.763 12.720,4.763 11.280,4.834 10.880 C 4.972 10.101,5.194 9.407,5.500 8.801 C 6.613 6.590,8.706 5.107,11.147 4.800 C 11.549 4.749,12.843 4.784,13.232 4.856 M11.546 7.286 C 10.562 7.378,9.767 7.848,9.262 8.635 C 8.975 9.082,8.762 9.723,8.761 10.150 L 8.760 10.320 9.499 10.320 C 10.334 10.320,10.240 10.360,10.301 9.980 C 10.341 9.738,10.505 9.423,10.694 9.228 C 11.445 8.456,13.145 8.675,13.590 9.601 C 13.799 10.035,13.784 10.680,13.555 11.160 C 13.447 11.386,13.306 11.543,12.478 12.360 C 11.955 12.877,11.442 13.417,11.339 13.560 C 11.009 14.017,10.800 14.517,10.800 14.847 L 10.800 15.000 11.535 15.000 L 12.269 15.000 12.335 14.830 C 12.448 14.536,12.772 14.156,13.534 13.426 C 14.524 12.477,14.793 12.140,15.019 11.562 C 15.190 11.125,15.252 10.716,15.230 10.160 C 15.207 9.591,15.110 9.223,14.868 8.793 C 14.280 7.748,12.966 7.152,11.546 7.286 M10.800 16.760 L 10.800 17.520 11.540 17.520 L 12.280 17.520 12.280 16.760 L 12.280 16.000 11.540 16.000 L 10.800 16.000 10.800 16.760 " stroke="none" fill-rule="evenodd"></path>';

const QuestionSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-question';
  const symbolId = 'snack-uikit-snack-icons-' + 'question';
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
export default QuestionSpriteSVG;
