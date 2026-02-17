// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.771 4.992 C 5.479 6.569,3.602 7.876,3.601 7.895 C 3.601 7.914,3.681 8.043,3.780 8.182 C 3.879 8.321,3.960 8.454,3.960 8.477 C 3.960 8.504,3.829 8.520,3.600 8.520 L 3.240 8.520 3.240 14.640 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 14.640 L 20.760 8.520 20.400 8.520 C 20.171 8.520,20.040 8.504,20.040 8.477 C 20.040 8.454,20.121 8.321,20.220 8.182 C 20.319 8.043,20.399 7.914,20.399 7.895 C 20.396 7.846,12.091 2.142,12.008 2.132 C 11.970 2.127,10.064 3.414,7.771 4.992 M15.330 6.201 C 17.128 7.438,18.600 8.462,18.599 8.475 C 18.598 8.516,12.073 12.575,12.004 12.578 C 11.924 12.581,5.398 8.512,5.412 8.467 C 5.429 8.412,11.978 3.922,12.020 3.937 C 12.042 3.945,13.531 4.963,15.330 6.201 M6.286 10.814 C 7.108 11.328,7.780 11.767,7.780 11.791 C 7.780 11.829,5.052 14.790,4.845 14.976 L 4.760 15.052 4.760 12.466 C 4.760 11.044,4.767 9.880,4.776 9.880 C 4.786 9.880,5.465 10.300,6.286 10.814 M19.240 12.481 L 19.240 15.082 17.730 13.458 C 16.899 12.565,16.220 11.815,16.220 11.791 C 16.220 11.753,19.136 9.892,19.210 9.884 C 19.227 9.882,19.240 11.050,19.240 12.481 M10.586 13.501 C 11.341 13.973,11.978 14.360,12.000 14.360 C 12.022 14.360,12.659 13.973,13.414 13.501 C 14.170 13.029,14.813 12.634,14.844 12.624 C 14.879 12.613,15.724 13.495,17.070 14.945 L 19.240 17.284 19.240 18.262 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 18.261 L 4.760 17.282 6.930 14.944 C 8.277 13.493,9.121 12.613,9.156 12.624 C 9.187 12.634,9.830 13.029,10.586 13.501 " stroke="none" fill-rule="evenodd"></path>';

const EnvelopeOpenSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-envelope-open';
  const symbolId = 'snack-uikit-web-icons-' + 'envelope-open';
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
export default EnvelopeOpenSpriteSVG;
