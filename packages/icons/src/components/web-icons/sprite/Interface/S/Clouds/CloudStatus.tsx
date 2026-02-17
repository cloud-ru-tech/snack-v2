// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.520 3.282 C 9.582 3.436,7.832 4.594,6.922 6.325 C 6.617 6.905,6.476 7.335,6.297 8.230 C 6.285 8.288,6.249 8.320,6.198 8.320 C 5.836 8.320,4.940 8.605,4.368 8.901 C 2.797 9.716,1.728 11.142,1.357 12.920 C 1.287 13.254,1.269 13.475,1.269 14.000 C 1.269 14.525,1.287 14.746,1.357 15.080 C 1.602 16.256,2.127 17.240,2.944 18.056 C 3.933 19.045,5.227 19.633,6.650 19.738 L 7.000 19.764 7.000 19.002 L 7.000 18.240 6.784 18.240 C 6.537 18.240,6.038 18.152,5.741 18.055 C 4.210 17.560,3.095 16.292,2.823 14.738 C 2.496 12.870,3.429 11.040,5.140 10.190 C 5.770 9.878,6.328 9.760,7.190 9.760 L 7.760 9.760 7.760 9.190 C 7.760 8.328,7.878 7.770,8.190 7.140 C 8.622 6.271,9.271 5.622,10.140 5.190 C 10.522 5.001,10.839 4.897,11.262 4.823 C 13.576 4.418,15.772 5.962,16.180 8.281 C 16.214 8.475,16.240 8.863,16.240 9.190 L 16.240 9.760 16.810 9.760 C 17.659 9.760,18.239 9.882,18.860 10.190 C 20.100 10.806,20.942 11.927,21.180 13.281 C 21.546 15.360,20.302 17.395,18.259 18.055 C 17.757 18.218,17.481 18.240,15.964 18.240 L 14.496 18.240 14.366 18.106 C 13.921 17.647,13.129 17.646,12.658 18.104 C 12.399 18.355,12.273 18.649,12.273 19.000 C 12.273 20.055,13.536 20.638,14.311 19.941 L 14.502 19.769 16.101 19.749 C 17.546 19.731,17.738 19.721,18.100 19.642 C 19.274 19.387,20.247 18.866,21.056 18.056 C 21.873 17.240,22.398 16.256,22.643 15.080 C 22.713 14.746,22.731 14.525,22.731 14.000 C 22.731 13.475,22.713 13.254,22.643 12.920 C 22.397 11.742,21.872 10.758,21.055 9.944 C 20.262 9.153,19.241 8.596,18.192 8.383 C 18.022 8.348,17.847 8.320,17.802 8.320 C 17.751 8.320,17.715 8.288,17.703 8.230 C 17.524 7.335,17.383 6.905,17.078 6.325 C 16.804 5.804,16.483 5.370,16.055 4.944 C 14.844 3.736,13.236 3.146,11.520 3.282 M11.985 12.004 L 9.951 15.566 9.175 14.403 L 8.400 13.240 6.700 13.240 L 5.000 13.240 5.000 14.000 L 5.000 14.760 6.300 14.760 L 7.600 14.760 8.810 16.579 C 9.475 17.579,10.034 18.393,10.051 18.388 C 10.068 18.384,10.953 16.852,12.019 14.986 L 13.956 11.592 14.748 13.176 L 15.540 14.760 17.270 14.760 L 19.000 14.760 19.000 14.000 L 19.000 13.240 17.730 13.240 L 16.459 13.240 15.260 10.840 C 14.600 9.520,14.051 8.440,14.040 8.440 C 14.029 8.441,13.104 10.044,11.985 12.004 " stroke="none" fill-rule="evenodd"></path>';

const CloudStatusSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cloud-status';
  const symbolId = 'snack-uikit-web-icons-' + 'cloud-status';
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
export default CloudStatusSpriteSVG;
