// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.281 C 9.259 3.432,7.316 4.326,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.506 20.129,9.915 20.597,11.240 20.718 C 11.530 20.744,13.435 20.760,16.394 20.760 L 21.089 20.760 21.065 20.670 C 21.051 20.621,20.684 19.680,20.247 18.580 L 19.454 16.580 19.565 16.398 C 19.736 16.120,20.101 15.340,20.239 14.960 C 20.508 14.215,20.657 13.488,20.724 12.593 C 20.927 9.856,19.753 7.079,17.654 5.329 C 15.859 3.834,13.640 3.114,11.340 3.281 M13.232 4.856 C 14.742 5.135,16.048 5.818,17.115 6.885 C 18.186 7.955,18.858 9.244,19.148 10.780 C 19.245 11.293,19.244 12.711,19.146 13.240 C 18.957 14.263,18.604 15.141,18.038 16.000 C 17.900 16.209,17.788 16.398,17.788 16.420 C 17.789 16.442,18.035 17.078,18.335 17.834 C 18.635 18.589,18.880 19.215,18.880 19.225 C 18.880 19.235,17.112 19.237,14.950 19.230 L 11.020 19.217 10.554 19.111 C 9.097 18.781,7.900 18.135,6.909 17.144 C 5.787 16.022,5.119 14.726,4.834 13.120 C 4.763 12.720,4.763 11.280,4.834 10.880 C 4.921 10.392,5.077 9.804,5.218 9.439 C 5.965 7.504,7.504 5.965,9.439 5.218 C 9.961 5.017,10.468 4.898,11.300 4.783 C 11.566 4.746,12.915 4.797,13.232 4.856 M7.240 12.000 L 7.240 13.000 8.000 13.000 L 8.760 13.000 8.760 12.000 L 8.760 11.000 8.000 11.000 L 7.240 11.000 7.240 12.000 M11.240 12.000 L 11.240 13.000 12.000 13.000 L 12.760 13.000 12.760 12.000 L 12.760 11.000 12.000 11.000 L 11.240 11.000 11.240 12.000 M15.240 12.000 L 15.240 13.000 16.000 13.000 L 16.760 13.000 16.760 12.000 L 16.760 11.000 16.000 11.000 L 15.240 11.000 15.240 12.000 " stroke="none" fill-rule="evenodd"></path>';

const ChatSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-chat';
  const symbolId = 'snack-uikit-product-icons-' + 'chat';
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
export default ChatSpriteSVG;
