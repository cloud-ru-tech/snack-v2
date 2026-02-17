// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 12.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 12.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 12.000 M6.240 8.260 C 6.240 9.371,6.253 10.280,6.270 10.280 C 6.286 10.280,6.628 9.952,7.030 9.550 L 7.760 8.820 9.350 10.410 L 10.940 12.000 9.350 13.590 L 7.760 15.180 7.030 14.450 C 6.628 14.048,6.286 13.720,6.270 13.720 C 6.253 13.720,6.240 14.629,6.240 15.740 L 6.240 17.760 8.260 17.760 C 9.371 17.760,10.280 17.747,10.280 17.730 C 10.280 17.714,9.952 17.372,9.550 16.970 L 8.820 16.240 10.410 14.650 L 12.000 13.060 13.590 14.650 L 15.180 16.240 14.450 16.970 C 14.048 17.372,13.720 17.714,13.720 17.730 C 13.720 17.747,14.629 17.760,15.740 17.760 L 17.760 17.760 17.760 15.740 C 17.760 14.629,17.747 13.720,17.730 13.720 C 17.714 13.720,17.372 14.048,16.970 14.450 L 16.240 15.180 14.650 13.590 L 13.060 12.000 14.650 10.410 L 16.240 8.820 16.970 9.550 C 17.372 9.952,17.714 10.280,17.730 10.280 C 17.747 10.280,17.760 9.371,17.760 8.260 L 17.760 6.240 15.740 6.240 C 14.629 6.240,13.720 6.253,13.720 6.270 C 13.720 6.286,14.048 6.628,14.450 7.030 L 15.180 7.760 13.590 9.350 L 12.000 10.940 10.410 9.350 L 8.820 7.760 9.550 7.030 C 9.952 6.628,10.280 6.286,10.280 6.270 C 10.280 6.253,9.371 6.240,8.260 6.240 L 6.240 6.240 6.240 8.260 " stroke="none" fill-rule="evenodd"></path>';

const SpineSwitchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-spine-switch';
  const symbolId = 'snack-uikit-web-icons-' + 'spine-switch';
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
export default SpineSwitchSpriteSVG;
