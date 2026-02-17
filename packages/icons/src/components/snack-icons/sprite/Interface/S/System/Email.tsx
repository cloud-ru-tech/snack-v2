// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 19.760 12.000 19.760 L 20.760 19.760 20.760 12.000 L 20.760 4.240 12.000 4.240 L 3.240 4.240 3.240 12.000 M19.240 6.650 L 19.240 7.541 15.810 9.252 C 13.560 10.374,12.315 10.975,12.190 10.996 C 12.085 11.015,11.915 11.015,11.810 10.996 C 11.685 10.975,10.440 10.374,8.190 9.252 L 4.760 7.541 4.760 6.650 L 4.760 5.760 12.000 5.760 L 19.240 5.760 19.240 6.650 M7.929 10.801 C 9.912 11.790,11.155 12.387,11.320 12.430 C 11.667 12.522,12.333 12.522,12.680 12.430 C 12.845 12.387,14.088 11.790,16.071 10.801 C 17.793 9.942,19.211 9.240,19.221 9.240 C 19.231 9.240,19.240 11.265,19.240 13.740 L 19.240 18.240 12.000 18.240 L 4.760 18.240 4.760 13.740 C 4.760 11.265,4.769 9.240,4.779 9.240 C 4.789 9.240,6.207 9.942,7.929 10.801 " stroke="none" fill-rule="evenodd"></path>';

const EmailSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-email';
  const symbolId = 'snack-uikit-snack-icons-' + 'email';
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
export default EmailSpriteSVG;
