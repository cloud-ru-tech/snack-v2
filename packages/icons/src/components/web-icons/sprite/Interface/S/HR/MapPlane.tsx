// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 10.032 L 3.240 17.383 6.050 19.089 C 7.596 20.027,8.890 20.807,8.927 20.821 C 8.971 20.837,10.022 20.326,11.945 19.353 C 13.567 18.532,14.916 17.855,14.941 17.848 C 14.967 17.842,16.279 18.620,17.856 19.578 C 19.434 20.536,20.733 21.320,20.743 21.320 C 20.752 21.320,20.760 18.012,20.760 13.970 L 20.760 6.620 17.995 4.940 C 16.475 4.016,15.182 3.236,15.122 3.206 C 15.018 3.154,14.896 3.211,12.046 4.656 C 10.414 5.483,9.061 6.160,9.039 6.160 C 9.018 6.160,7.711 5.377,6.134 4.420 C 4.558 3.463,3.262 2.680,3.254 2.680 C 3.246 2.680,3.240 5.988,3.240 10.032 M14.240 10.877 L 14.240 16.513 12.018 17.637 C 10.796 18.255,9.788 18.760,9.778 18.760 C 9.768 18.760,9.760 18.364,9.760 17.880 L 9.760 17.000 9.000 17.000 L 8.240 17.000 8.240 17.820 C 8.240 18.271,8.232 18.640,8.222 18.640 C 8.212 18.640,7.429 18.170,6.482 17.596 L 4.760 16.552 4.760 10.953 C 4.760 7.808,4.775 5.359,4.795 5.367 C 4.814 5.374,5.597 5.846,6.535 6.416 L 8.240 7.453 8.240 8.726 L 8.240 10.000 9.000 10.000 L 9.760 10.000 9.760 8.746 L 9.760 7.493 11.970 6.370 C 13.185 5.753,14.194 5.246,14.210 5.244 C 14.227 5.242,14.240 7.777,14.240 10.877 M17.535 6.416 L 19.240 7.453 19.240 13.046 C 19.240 16.123,19.232 18.640,19.222 18.640 C 19.212 18.640,18.429 18.170,17.482 17.596 L 15.760 16.552 15.760 10.953 C 15.760 7.808,15.775 5.359,15.795 5.367 C 15.814 5.374,16.597 5.846,17.535 6.416 M11.200 10.823 C 11.123 10.856,10.885 11.057,10.671 11.270 L 10.282 11.657 8.760 11.223 C 7.923 10.984,7.228 10.799,7.215 10.812 C 7.186 10.841,6.791 12.205,6.808 12.220 C 6.815 12.226,7.279 12.361,7.840 12.520 C 8.401 12.678,8.874 12.822,8.891 12.838 C 8.909 12.854,8.381 13.331,7.720 13.897 C 6.673 14.794,6.524 14.936,6.568 14.991 C 6.825 15.307,7.452 16.023,7.480 16.033 C 7.507 16.042,9.274 14.560,9.863 14.033 L 9.946 13.959 10.096 15.008 C 10.178 15.584,10.252 16.067,10.261 16.081 C 10.269 16.095,10.605 16.059,11.008 16.001 C 11.584 15.919,11.739 15.884,11.733 15.838 C 11.729 15.806,11.630 15.100,11.514 14.270 L 11.302 12.760 11.709 12.350 C 12.133 11.924,12.241 11.749,12.239 11.491 C 12.238 11.318,12.127 11.052,12.014 10.952 C 11.808 10.768,11.457 10.713,11.200 10.823 " stroke="none" fill-rule="evenodd"></path>';

const MapPlaneSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-map-plane';
  const symbolId = 'snack-uikit-web-icons-' + 'map-plane';
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
export default MapPlaneSpriteSVG;
