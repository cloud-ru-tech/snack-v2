// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M9.900 2.282 C 8.211 2.416,6.567 3.191,5.351 4.426 C 3.526 6.280,2.826 8.930,3.502 11.427 C 3.629 11.897,3.906 12.587,4.117 12.960 C 4.233 13.164,4.274 13.276,4.255 13.335 C 4.241 13.382,3.934 14.163,3.574 15.072 C 3.214 15.980,2.920 16.740,2.920 16.762 C 2.920 16.786,3.760 16.800,5.180 16.800 L 7.440 16.800 7.440 18.460 L 7.440 20.120 9.500 20.120 L 11.559 20.120 14.710 21.265 C 16.442 21.895,17.883 22.419,17.910 22.430 C 17.949 22.444,17.960 22.199,17.960 21.284 L 17.960 20.120 19.460 20.120 L 20.960 20.120 20.960 14.380 L 20.960 8.640 19.443 8.640 C 17.732 8.640,17.910 8.678,17.860 8.300 C 17.783 7.712,17.536 6.951,17.210 6.301 C 16.266 4.416,14.503 3.024,12.376 2.484 C 11.672 2.305,10.655 2.222,9.900 2.282 M11.267 3.801 C 12.591 3.974,13.767 4.525,14.703 5.411 C 15.173 5.856,15.529 6.325,15.813 6.876 C 16.266 7.754,16.413 8.369,16.413 9.380 C 16.413 10.353,16.286 10.926,15.873 11.800 C 15.549 12.489,15.263 12.899,14.724 13.454 C 13.784 14.420,12.713 14.985,11.380 15.217 C 11.075 15.270,10.569 15.280,8.070 15.280 C 6.447 15.280,5.120 15.273,5.120 15.264 C 5.120 15.254,5.309 14.769,5.540 14.185 C 5.771 13.600,5.960 13.113,5.960 13.103 C 5.960 13.092,5.862 12.933,5.743 12.749 C 5.113 11.783,4.822 10.897,4.773 9.796 C 4.700 8.159,5.251 6.694,6.380 5.525 C 7.283 4.590,8.405 4.010,9.680 3.819 C 10.106 3.756,10.856 3.747,11.267 3.801 M7.680 8.380 L 7.680 9.120 10.680 9.120 L 13.680 9.120 13.680 8.380 L 13.680 7.640 10.680 7.640 L 7.680 7.640 7.680 8.380 M19.440 14.380 L 19.440 18.640 17.940 18.640 L 16.440 18.640 16.440 19.465 C 16.440 20.231,16.435 20.288,16.370 20.270 C 16.332 20.259,15.305 19.888,14.089 19.445 L 11.879 18.640 10.419 18.640 L 8.960 18.640 8.960 17.720 L 8.960 16.800 9.856 16.800 C 11.226 16.800,11.935 16.704,12.829 16.395 C 15.319 15.537,17.202 13.434,17.777 10.871 C 17.834 10.617,17.880 10.357,17.880 10.292 C 17.880 10.227,17.892 10.161,17.907 10.147 C 17.921 10.132,18.272 10.120,18.687 10.120 L 19.440 10.120 19.440 14.380 M7.680 11.380 L 7.680 12.120 10.680 12.120 L 13.680 12.120 13.680 11.380 L 13.680 10.640 10.680 10.640 L 7.680 10.640 7.680 11.380 " stroke="none" fill-rule="evenodd"></path>';

const DialogSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-dialog';
  const symbolId = 'snack-uikit-web-icons-' + 'dialog';
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
export default DialogSpriteSVG;
