// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M16.970 3.010 L 16.440 3.541 18.080 5.180 L 19.720 6.820 19.720 13.270 L 19.720 19.720 20.460 19.720 L 21.200 19.720 21.200 12.950 L 21.200 6.180 19.350 4.330 L 17.499 2.480 16.970 3.010 M4.200 6.620 L 4.200 10.000 4.960 10.000 L 5.720 10.000 5.720 7.380 L 5.720 4.760 8.960 4.760 L 12.200 4.760 12.200 6.760 L 12.200 8.760 14.200 8.760 L 16.200 8.760 16.200 13.499 L 16.200 18.239 14.850 18.249 L 13.500 18.260 13.500 19.000 L 13.500 19.740 15.610 19.750 L 17.720 19.761 17.720 13.880 L 17.720 8.000 17.351 8.000 L 16.982 8.000 17.241 7.739 L 17.499 7.479 15.500 5.480 L 13.501 3.481 13.231 3.749 L 12.960 4.018 12.960 3.629 L 12.960 3.240 8.580 3.240 L 4.200 3.240 4.200 6.620 M14.440 6.540 L 15.139 7.240 14.430 7.240 L 13.720 7.240 13.720 6.540 C 13.720 6.155,13.725 5.840,13.730 5.840 C 13.736 5.840,14.055 6.155,14.440 6.540 M3.241 14.890 C 3.241 17.812,3.244 17.854,3.488 18.351 C 3.575 18.530,3.713 18.715,3.900 18.903 C 4.178 19.182,4.205 19.197,5.841 20.019 L 7.501 20.852 9.160 20.019 C 10.797 19.196,10.823 19.181,11.099 18.902 C 11.287 18.714,11.424 18.529,11.512 18.349 C 11.756 17.850,11.759 17.812,11.759 14.890 L 11.760 12.240 7.500 12.240 L 3.240 12.240 3.241 14.890 M10.240 15.662 C 10.240 17.781,10.249 17.708,9.964 17.911 C 9.880 17.971,9.290 18.279,8.655 18.595 L 7.499 19.170 6.319 18.581 C 5.671 18.257,5.081 17.948,5.010 17.894 C 4.754 17.701,4.760 17.756,4.760 15.662 L 4.760 13.760 7.500 13.760 L 10.240 13.760 10.240 15.662 " stroke="none" fill-rule="evenodd"></path>';

const ShieldDataShieldSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-shield-data-shield';
  const symbolId = 'snack-uikit-web-icons-' + 'shield-data-shield';
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
export default ShieldDataShieldSpriteSVG;
