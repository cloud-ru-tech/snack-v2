// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M16.520 4.269 C 16.520 4.286,16.846 4.625,17.244 5.024 C 17.949 5.730,17.967 5.752,17.914 5.848 C 17.884 5.902,17.348 6.787,16.723 7.813 L 15.586 9.680 14.978 9.680 L 14.370 9.680 12.875 7.690 L 11.380 5.700 9.960 5.690 L 8.540 5.679 7.040 8.680 L 5.540 11.680 4.770 11.680 L 4.000 11.680 4.000 12.440 L 4.000 13.200 5.230 13.200 L 6.460 13.200 7.960 10.200 L 9.460 7.200 10.045 7.200 L 10.630 7.200 12.125 9.198 L 13.620 11.197 15.020 11.198 L 16.420 11.200 17.734 9.040 C 18.457 7.852,19.060 6.880,19.074 6.880 C 19.089 6.880,19.398 7.177,19.760 7.540 C 20.122 7.903,20.433 8.200,20.450 8.200 C 20.467 8.200,20.476 7.314,20.470 6.230 L 20.460 4.260 18.490 4.250 C 17.407 4.244,16.520 4.253,16.520 4.269 M19.240 14.780 L 19.240 19.440 20.000 19.440 L 20.760 19.440 20.760 14.780 L 20.760 10.120 20.000 10.120 L 19.240 10.120 19.240 14.780 M9.240 14.940 L 9.240 19.440 10.000 19.440 L 10.760 19.440 10.760 14.940 L 10.760 10.440 10.000 10.440 L 9.240 10.440 9.240 14.940 M14.240 16.440 L 14.240 19.440 15.000 19.440 L 15.760 19.440 15.760 16.440 L 15.760 13.440 15.000 13.440 L 14.240 13.440 14.240 16.440 M4.240 17.440 L 4.240 19.440 5.000 19.440 L 5.760 19.440 5.760 17.440 L 5.760 15.440 5.000 15.440 L 4.240 15.440 4.240 17.440 " stroke="none" fill-rule="evenodd"></path>';

const MertricSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-mertric';
  const symbolId = 'snack-uikit-web-icons-' + 'mertric';
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
export default MertricSpriteSVG;
