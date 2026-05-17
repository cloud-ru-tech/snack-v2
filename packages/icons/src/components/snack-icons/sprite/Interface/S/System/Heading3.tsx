// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.000 6.000 19.000 L 6.760 19.000 6.760 15.880 L 6.760 12.760 10.000 12.760 L 13.240 12.760 13.240 15.880 L 13.240 19.000 14.000 19.000 L 14.760 19.000 14.760 12.000 L 14.760 5.000 14.000 5.000 L 13.240 5.000 13.240 8.120 L 13.240 11.240 10.000 11.240 L 6.760 11.240 6.760 8.120 L 6.760 5.000 6.000 5.000 L 5.240 5.000 5.240 12.000 M17.462 12.284 C 16.628 12.408,15.964 12.933,15.861 13.550 L 15.833 13.720 16.593 13.720 C 17.333 13.720,17.352 13.722,17.332 13.800 C 17.307 13.896,17.311 13.896,17.494 13.820 C 17.694 13.736,18.063 13.745,18.269 13.838 C 18.556 13.969,18.543 14.232,18.239 14.428 C 17.955 14.610,17.910 14.654,17.837 14.815 C 17.631 15.267,17.878 15.755,18.376 15.882 C 18.771 15.982,18.859 16.109,18.831 16.537 C 18.809 16.886,18.729 17.047,18.532 17.142 C 18.347 17.231,17.794 17.265,17.480 17.208 C 17.242 17.164,17.206 17.171,17.270 17.249 C 17.293 17.277,17.318 17.345,17.326 17.400 L 17.340 17.500 16.588 17.511 L 15.837 17.522 15.863 17.671 C 15.986 18.363,16.728 18.740,17.960 18.736 C 18.757 18.734,19.293 18.547,19.715 18.125 C 20.484 17.354,20.573 15.924,19.903 15.100 L 19.773 14.940 19.857 14.760 C 19.927 14.608,19.940 14.503,19.940 14.079 C 19.940 13.595,19.936 13.569,19.811 13.316 C 19.579 12.846,19.075 12.469,18.510 12.343 C 18.161 12.266,17.743 12.242,17.462 12.284 " stroke="none" fill-rule="evenodd"></path>';

const Heading3SpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-heading3';
  const symbolId = 'snack-uikit-snack-icons-' + 'heading3';
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
export default Heading3SpriteSVG;
