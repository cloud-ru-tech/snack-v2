// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.916 3.282 C 10.385 3.418,9.012 4.378,8.361 5.768 C 7.621 7.349,7.959 9.197,9.218 10.454 C 10.353 11.587,12.038 12.020,13.589 11.578 C 15.591 11.007,16.952 9.056,16.723 7.087 C 16.607 6.091,16.213 5.265,15.520 4.567 C 14.772 3.815,13.828 3.378,12.740 3.280 C 12.498 3.258,12.291 3.243,12.280 3.246 C 12.269 3.249,12.105 3.265,11.916 3.282 M13.175 4.857 C 14.151 5.125,14.984 5.982,15.185 6.925 C 15.270 7.324,15.241 7.965,15.122 8.320 C 14.875 9.055,14.235 9.733,13.508 10.028 C 12.807 10.313,11.913 10.313,11.212 10.028 C 10.485 9.733,9.845 9.055,9.598 8.320 C 9.479 7.966,9.450 7.324,9.534 6.928 C 9.764 5.850,10.676 5.017,11.880 4.785 C 12.082 4.746,12.945 4.794,13.175 4.857 M15.876 12.281 C 15.532 12.339,15.232 12.542,15.029 12.854 C 14.798 13.208,14.741 13.583,14.858 13.969 L 14.916 14.159 13.778 16.107 C 13.153 17.178,12.618 18.069,12.590 18.087 C 12.563 18.104,12.495 18.119,12.440 18.120 C 12.170 18.122,11.681 18.483,11.521 18.798 C 11.393 19.052,11.346 19.381,11.400 19.655 C 11.461 19.969,11.551 20.139,11.766 20.353 C 11.986 20.573,12.163 20.664,12.484 20.723 C 12.905 20.800,13.366 20.639,13.677 20.304 L 13.774 20.200 16.119 20.200 L 18.465 20.200 18.583 20.325 C 18.760 20.513,18.975 20.635,19.251 20.706 C 19.690 20.819,20.136 20.690,20.474 20.353 C 20.689 20.139,20.779 19.969,20.840 19.655 C 20.894 19.381,20.847 19.052,20.719 18.798 C 20.558 18.481,20.069 18.121,19.798 18.120 C 19.741 18.120,19.666 18.097,19.630 18.070 C 19.580 18.032,17.582 14.695,17.355 14.271 C 17.327 14.218,17.334 14.134,17.378 13.982 C 17.660 13.012,16.866 12.113,15.876 12.281 M4.638 16.857 C 3.440 18.297,2.460 19.491,2.460 19.512 C 2.460 19.533,2.712 19.760,3.019 20.016 C 3.557 20.463,3.581 20.478,3.639 20.403 C 3.673 20.360,4.555 19.298,5.600 18.043 L 7.500 15.762 9.750 15.761 L 12.000 15.760 12.000 15.000 L 12.000 14.240 9.408 14.240 L 6.816 14.240 4.638 16.857 M17.160 16.905 L 18.197 18.660 16.132 18.670 C 14.997 18.676,14.060 18.673,14.051 18.664 C 14.042 18.655,14.498 17.854,15.065 16.885 C 15.632 15.915,16.102 15.129,16.110 15.136 C 16.117 15.144,16.590 15.940,17.160 16.905 " stroke="none" fill-rule="evenodd"></path>';

const UserFederationSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-user-federation';
  const symbolId = 'snack-uikit-web-icons-' + 'user-federation';
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
export default UserFederationSpriteSVG;
