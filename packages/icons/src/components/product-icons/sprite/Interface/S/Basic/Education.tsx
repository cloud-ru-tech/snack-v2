// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.780 6.260 C 3.942 7.965,1.615 9.374,1.610 9.390 C 1.604 9.407,2.414 9.927,3.410 10.547 L 5.220 11.674 5.240 14.185 L 5.260 16.696 8.620 18.787 C 10.468 19.937,11.989 20.878,12.000 20.878 C 12.011 20.878,13.532 19.937,15.380 18.787 L 18.740 16.696 18.760 14.182 L 18.780 11.668 19.500 11.217 L 20.220 10.766 20.240 14.893 L 20.260 19.020 21.000 19.020 L 21.740 19.020 21.750 14.413 L 21.760 9.806 22.101 9.597 L 22.442 9.388 17.271 6.288 C 14.427 4.584,12.064 3.183,12.020 3.175 C 11.968 3.165,10.102 4.264,6.780 6.260 M15.782 7.146 C 17.861 8.392,19.557 9.416,19.551 9.420 C 19.545 9.425,17.844 10.486,15.770 11.778 L 12.000 14.128 8.221 11.775 C 5.895 10.328,4.460 9.411,4.491 9.393 C 4.518 9.377,6.214 8.356,8.260 7.125 C 10.306 5.894,11.985 4.885,11.991 4.883 C 11.998 4.882,13.703 5.900,15.782 7.146 M9.440 14.302 C 10.815 15.157,11.967 15.857,12.000 15.857 C 12.033 15.857,13.203 15.145,14.600 14.275 C 15.997 13.405,17.163 12.680,17.190 12.664 C 17.230 12.641,17.240 12.969,17.240 14.249 L 17.240 15.863 14.620 17.493 L 12.000 19.123 9.380 17.493 L 6.760 15.863 6.760 14.247 L 6.760 12.631 6.850 12.689 C 6.900 12.720,8.065 13.446,9.440 14.302 " stroke="none" fill-rule="evenodd"></path>';

const EducationSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-education';
  const symbolId = 'snack-uikit-product-icons-' + 'education';
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
export default EducationSpriteSVG;
