// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.620 3.281 C 6.205 3.326,5.865 3.425,5.446 3.622 C 4.484 4.076,3.842 4.799,3.493 5.820 C 3.075 7.044,3.214 8.749,3.815 9.775 C 4.057 10.189,4.516 10.673,4.933 10.957 C 5.193 11.133,5.713 11.374,6.080 11.487 L 6.380 11.579 12.490 11.600 L 18.600 11.620 17.360 13.511 C 16.678 14.551,16.120 15.415,16.121 15.431 C 16.121 15.447,16.676 16.306,17.355 17.340 L 18.589 19.220 12.668 19.230 C 6.769 19.240,6.745 19.240,6.436 19.157 C 5.827 18.992,5.336 18.590,5.063 18.030 C 4.783 17.456,4.786 17.484,4.770 15.210 L 4.755 13.160 3.995 13.160 L 3.234 13.160 3.252 15.210 C 3.266 16.844,3.282 17.323,3.331 17.570 C 3.648 19.156,4.605 20.200,6.155 20.649 L 6.460 20.737 13.915 20.750 C 20.100 20.760,21.366 20.753,21.349 20.708 C 21.338 20.679,20.569 19.499,19.642 18.085 C 18.714 16.671,17.946 15.489,17.934 15.460 C 17.923 15.430,18.689 14.224,19.637 12.780 C 20.585 11.336,21.360 10.147,21.360 10.138 C 21.360 10.129,18.053 10.117,14.010 10.111 L 6.660 10.100 6.340 9.991 C 5.464 9.691,4.930 9.001,4.794 7.992 C 4.739 7.587,4.772 6.828,4.858 6.500 C 5.083 5.643,5.680 5.035,6.506 4.823 C 6.723 4.767,7.306 4.760,11.496 4.760 L 16.240 4.760 16.240 6.100 L 16.240 7.440 17.000 7.440 L 17.760 7.440 17.760 5.340 L 17.760 3.240 12.330 3.245 C 9.344 3.248,6.774 3.264,6.620 3.281 M10.369 13.643 C 9.934 13.719,9.559 14.009,9.379 14.408 C 9.286 14.614,9.265 14.718,9.263 14.980 C 9.260 15.254,9.277 15.333,9.373 15.531 C 9.533 15.856,9.758 16.068,10.583 16.669 C 10.981 16.959,11.325 17.219,11.347 17.248 C 11.369 17.277,11.456 17.496,11.540 17.736 L 11.693 18.172 11.807 17.856 C 11.870 17.682,11.948 17.468,11.981 17.380 C 12.033 17.241,12.137 17.150,12.785 16.680 C 13.597 16.091,13.741 15.951,13.932 15.561 C 14.047 15.327,14.060 15.265,14.060 14.941 C 14.060 14.636,14.044 14.546,13.956 14.360 C 13.704 13.826,13.106 13.522,12.537 13.641 C 12.298 13.690,12.005 13.893,11.816 14.142 C 11.711 14.279,11.701 14.283,11.651 14.214 C 11.520 14.034,11.257 13.790,11.120 13.720 C 10.933 13.625,10.642 13.595,10.369 13.643 " stroke="none" fill-rule="evenodd"></path>';

const SberprimeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-sberprime';
  const symbolId = 'snack-uikit-web-icons-' + 'sberprime';
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
export default SberprimeSpriteSVG;
