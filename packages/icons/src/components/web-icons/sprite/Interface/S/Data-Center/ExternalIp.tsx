// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.360 2.281 C 10.234 2.357,9.200 2.639,8.140 3.160 C 5.335 4.539,3.522 7.232,3.273 10.390 C 3.156 11.879,3.476 13.492,4.163 14.876 C 4.357 15.267,4.482 15.466,4.607 15.584 C 4.976 15.934,11.964 21.960,12.000 21.960 C 12.036 21.960,19.024 15.934,19.393 15.584 C 19.765 15.232,20.360 13.794,20.577 12.720 C 21.205 9.622,20.060 6.334,17.654 4.329 C 15.862 2.836,13.678 2.125,11.360 2.281 M12.948 3.821 C 15.845 4.197,18.249 6.305,18.998 9.129 C 19.184 9.830,19.253 10.463,19.227 11.240 C 19.190 12.328,18.996 13.142,18.544 14.104 L 18.354 14.507 15.193 17.243 C 13.455 18.748,12.018 19.980,12.000 19.980 C 11.982 19.980,10.546 18.749,8.807 17.244 L 5.647 14.509 5.448 14.084 C 4.998 13.129,4.810 12.334,4.773 11.240 C 4.689 8.710,5.867 6.399,7.956 4.994 C 9.434 4.001,11.177 3.592,12.948 3.821 M8.811 7.278 C 8.639 7.320,8.417 7.493,8.330 7.652 C 8.265 7.771,8.259 8.031,8.248 11.160 C 8.239 13.527,8.249 14.585,8.280 14.691 C 8.304 14.774,8.381 14.907,8.451 14.987 C 8.753 15.330,9.247 15.330,9.549 14.987 C 9.619 14.907,9.696 14.774,9.720 14.691 C 9.751 14.585,9.761 13.527,9.752 11.160 C 9.740 7.837,9.739 7.778,9.658 7.641 C 9.494 7.361,9.122 7.202,8.811 7.278 M11.811 7.276 C 11.638 7.321,11.416 7.494,11.330 7.652 C 11.265 7.771,11.259 8.031,11.248 11.160 C 11.239 13.527,11.249 14.585,11.280 14.691 C 11.304 14.774,11.381 14.907,11.451 14.987 C 11.818 15.405,12.443 15.300,12.684 14.780 C 12.750 14.637,12.758 14.507,12.759 13.570 L 12.760 12.520 13.310 12.519 C 13.946 12.519,14.244 12.461,14.664 12.260 C 15.188 12.007,15.542 11.601,15.748 11.016 C 15.854 10.712,15.858 10.669,15.858 9.920 C 15.859 9.303,15.844 9.086,15.789 8.880 C 15.574 8.083,15.061 7.553,14.300 7.340 C 14.111 7.287,13.836 7.270,13.000 7.258 C 12.417 7.250,11.882 7.258,11.811 7.276 M14.027 8.838 C 14.301 8.962,14.337 9.073,14.352 9.820 C 14.364 10.423,14.359 10.471,14.272 10.640 C 14.202 10.777,14.133 10.844,13.980 10.920 C 13.805 11.008,13.717 11.022,13.270 11.034 L 12.760 11.048 12.760 9.904 L 12.760 8.760 13.310 8.761 C 13.764 8.762,13.889 8.775,14.027 8.838 " stroke="none" fill-rule="evenodd"></path>';

const ExternalIpSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-external-ip';
  const symbolId = 'snack-uikit-web-icons-' + 'external-ip';
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
export default ExternalIpSpriteSVG;
