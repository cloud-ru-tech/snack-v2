// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.520 4.717 L 3.460 7.066 3.460 12.002 L 3.460 16.937 7.520 19.286 C 9.753 20.577,11.592 21.635,11.607 21.637 C 11.622 21.639,11.711 21.505,11.805 21.340 C 11.899 21.175,11.987 21.040,12.000 21.040 C 12.013 21.040,12.101 21.175,12.195 21.340 C 12.289 21.505,12.378 21.639,12.393 21.637 C 12.408 21.635,14.247 20.577,16.480 19.285 L 20.540 16.937 20.540 12.002 L 20.540 7.067 16.464 4.713 C 14.222 3.419,12.383 2.360,12.377 2.360 C 12.371 2.360,12.289 2.495,12.195 2.660 C 12.101 2.825,12.013 2.960,12.000 2.960 C 11.987 2.960,11.899 2.825,11.805 2.660 C 11.711 2.495,11.622 2.362,11.607 2.364 C 11.592 2.366,9.753 3.425,7.520 4.717 M12.000 6.900 L 12.740 6.900 12.760 5.609 L 12.780 4.319 15.910 6.125 L 19.040 7.932 19.040 12.002 L 19.040 16.072 15.934 17.866 C 14.226 18.853,12.813 19.666,12.794 19.673 C 12.775 19.681,12.760 19.109,12.760 18.403 L 12.760 17.120 12.000 17.120 L 11.240 17.120 11.240 18.403 C 11.240 19.109,11.225 19.681,11.206 19.673 C 11.187 19.666,9.774 18.853,8.066 17.866 L 4.960 16.072 4.960 12.002 L 4.960 7.932 8.090 6.125 L 11.220 4.319 11.240 5.609 L 11.260 6.900 12.000 6.900 M7.700 10.240 L 5.940 12.000 7.700 13.760 L 9.459 15.520 9.990 14.990 L 10.520 14.461 9.290 13.230 L 8.060 12.000 9.300 10.760 L 10.539 9.520 10.020 9.000 C 9.735 8.714,9.492 8.480,9.480 8.480 C 9.469 8.480,8.668 9.272,7.700 10.240 M13.980 9.000 L 13.461 9.520 14.700 10.760 L 15.940 12.000 14.710 13.230 L 13.480 14.461 14.010 14.990 L 14.541 15.520 16.300 13.760 L 18.060 12.000 16.300 10.240 C 15.332 9.272,14.531 8.480,14.520 8.480 C 14.508 8.480,14.265 8.714,13.980 9.000 " stroke="none" fill-rule="evenodd"></path>';

const ReserchTestSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-reserch-test';
  const symbolId = 'snack-uikit-web-icons-' + 'reserch-test';
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
export default ReserchTestSpriteSVG;
