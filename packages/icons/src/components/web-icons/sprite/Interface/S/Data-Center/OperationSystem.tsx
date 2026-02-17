// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.340 4.240 L 7.100 6.237 5.170 6.238 L 3.240 6.240 3.240 11.980 L 3.240 17.720 7.240 17.720 L 11.240 17.720 11.240 18.980 L 11.240 20.240 9.120 20.240 L 7.000 20.240 7.000 21.000 L 7.000 21.760 12.000 21.760 L 17.000 21.760 17.000 21.000 L 17.000 20.240 14.880 20.240 L 12.760 20.240 12.760 18.980 L 12.760 17.720 16.760 17.720 L 20.760 17.720 20.760 11.980 L 20.760 6.241 18.793 6.230 L 16.826 6.220 15.623 4.230 L 14.420 2.241 12.000 2.242 L 9.580 2.243 8.340 4.240 M14.541 5.346 C 15.068 6.219,15.500 6.963,15.500 7.000 C 15.500 7.037,15.068 7.781,14.541 8.654 L 13.581 10.240 11.995 10.240 L 10.410 10.240 9.416 8.650 C 8.870 7.776,8.423 7.033,8.423 7.000 C 8.423 6.967,8.870 6.224,9.416 5.350 L 10.410 3.760 11.995 3.760 L 13.581 3.760 14.541 5.346 M11.451 5.592 C 10.874 5.823,10.521 6.375,10.569 6.971 C 10.599 7.337,10.729 7.603,11.003 7.857 C 11.579 8.390,12.380 8.355,12.926 7.771 C 13.566 7.087,13.294 5.931,12.417 5.602 C 12.142 5.499,11.694 5.495,11.451 5.592 M11.993 6.755 C 12.023 6.774,12.041 6.832,12.033 6.885 C 12.023 6.956,11.995 6.980,11.920 6.980 C 11.845 6.980,11.817 6.956,11.807 6.885 C 11.795 6.803,11.852 6.721,11.920 6.721 C 11.931 6.721,11.964 6.736,11.993 6.755 M8.340 9.760 L 9.580 11.757 12.000 11.758 L 14.420 11.759 15.623 9.770 L 16.826 7.780 18.033 7.769 L 19.240 7.759 19.240 11.979 L 19.240 16.200 12.000 16.200 L 4.760 16.200 4.760 11.980 L 4.760 7.760 5.930 7.762 L 7.100 7.763 8.340 9.760 " stroke="none" fill-rule="evenodd"></path>';

const OperationSystemSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-operation-system';
  const symbolId = 'snack-uikit-web-icons-' + 'operation-system';
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
export default OperationSystemSpriteSVG;
