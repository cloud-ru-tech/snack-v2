// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.626 6.140 C 6.591 7.909,2.466 9.361,2.460 9.368 C 2.453 9.375,3.882 10.469,5.634 11.800 L 8.820 14.221 8.830 17.350 C 8.836 19.072,8.854 20.480,8.870 20.479 C 8.887 20.478,9.762 19.740,10.815 18.838 L 12.730 17.198 12.855 17.292 C 12.984 17.389,18.460 21.542,18.551 21.612 C 18.579 21.634,18.609 21.644,18.617 21.636 C 18.630 21.622,20.882 3.034,20.880 2.950 C 20.880 2.934,20.858 2.921,20.830 2.923 C 20.803 2.924,16.660 4.372,11.626 6.140 M13.480 9.460 C 11.489 11.451,9.846 13.080,9.829 13.080 C 9.807 13.080,5.837 10.086,5.603 9.894 C 5.594 9.886,5.596 9.871,5.608 9.859 C 5.639 9.828,16.971 5.847,17.040 5.843 C 17.073 5.842,15.471 7.469,13.480 9.460 M18.220 12.472 C 17.796 15.976,17.443 18.850,17.435 18.858 C 17.427 18.866,15.984 17.781,14.229 16.447 L 11.038 14.022 15.007 10.053 C 17.190 7.869,18.980 6.087,18.983 6.092 C 18.987 6.096,18.643 8.967,18.220 12.472 M10.970 15.857 C 11.251 16.071,11.480 16.258,11.480 16.274 C 11.480 16.289,11.278 16.472,11.031 16.681 C 10.784 16.889,10.532 17.102,10.471 17.154 L 10.360 17.247 10.360 16.319 C 10.360 15.582,10.370 15.398,10.410 15.429 C 10.438 15.451,10.690 15.643,10.970 15.857 " stroke="none" fill-rule="evenodd"></path>';

const SendSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-send';
  const symbolId = 'snack-uikit-product-icons-' + 'send';
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
export default SendSpriteSVG;
