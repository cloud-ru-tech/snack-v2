// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.857 3.280 C 8.688 3.433,6.600 4.510,5.174 6.211 C 2.609 9.274,2.610 13.737,5.176 16.789 C 6.636 18.526,8.617 19.541,10.909 19.728 C 12.892 19.889,15.045 19.230,16.600 17.985 L 16.780 17.841 18.620 19.678 L 20.460 21.514 21.000 20.997 L 21.540 20.480 19.691 18.630 L 17.841 16.780 17.985 16.600 C 19.442 14.779,20.060 12.226,19.600 9.931 C 19.036 7.118,17.131 4.846,14.461 3.802 C 13.385 3.382,12.089 3.194,10.857 3.280 M12.388 4.821 C 15.396 5.211,17.789 7.604,18.179 10.612 C 18.379 12.153,18.057 13.694,17.262 15.001 C 17.080 15.300,16.802 15.680,16.765 15.680 C 16.751 15.680,16.263 15.203,15.680 14.620 L 14.621 13.560 11.500 13.558 L 8.380 13.556 7.317 14.644 L 6.254 15.732 6.075 15.496 C 5.052 14.146,4.594 12.364,4.821 10.612 C 5.013 9.134,5.669 7.807,6.738 6.738 C 8.236 5.240,10.278 4.548,12.388 4.821 M11.100 7.025 C 10.400 7.134,9.723 7.573,9.307 8.189 C 8.806 8.929,8.743 9.970,9.148 10.795 C 9.339 11.183,9.854 11.718,10.244 11.934 C 10.982 12.342,12.020 12.342,12.756 11.934 C 13.080 11.754,13.619 11.224,13.788 10.920 C 14.074 10.406,14.190 9.707,14.082 9.152 C 13.895 8.187,13.169 7.379,12.240 7.102 C 12.021 7.036,11.328 6.990,11.100 7.025 M11.943 8.596 C 12.680 8.931,12.839 9.916,12.242 10.454 C 12.004 10.668,11.830 10.734,11.500 10.734 C 11.164 10.734,10.990 10.666,10.747 10.442 C 10.160 9.901,10.322 8.930,11.055 8.597 C 11.277 8.496,11.721 8.495,11.943 8.596 M14.860 15.923 L 15.700 16.765 15.560 16.885 C 15.203 17.192,14.452 17.598,13.789 17.844 C 12.358 18.374,10.642 18.374,9.211 17.844 C 8.562 17.603,7.886 17.242,7.472 16.914 L 7.320 16.793 8.148 15.937 L 8.977 15.080 11.499 15.080 L 14.021 15.080 14.860 15.923 " stroke="none" fill-rule="evenodd"></path>';

const UserSearchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-user-search';
  const symbolId = 'snack-uikit-web-icons-' + 'user-search';
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
export default UserSearchSpriteSVG;
