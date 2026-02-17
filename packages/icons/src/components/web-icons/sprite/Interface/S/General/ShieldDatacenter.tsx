// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.251 9.910 C 3.263 15.051,3.271 15.605,3.331 15.849 C 3.494 16.502,3.813 17.131,4.226 17.612 C 4.729 18.197,4.760 18.215,8.530 20.103 L 12.000 21.841 15.470 20.103 C 19.240 18.215,19.271 18.197,19.774 17.612 C 20.187 17.131,20.506 16.502,20.669 15.849 C 20.729 15.605,20.737 15.051,20.749 9.910 L 20.762 4.240 12.000 4.240 L 3.238 4.240 3.251 9.910 M19.240 8.500 L 19.240 11.240 17.500 11.240 L 15.760 11.240 15.760 9.740 L 15.760 8.240 12.000 8.240 L 8.240 8.240 8.240 9.740 L 8.240 11.240 6.500 11.240 L 4.760 11.240 4.760 8.500 L 4.760 5.760 12.000 5.760 L 19.240 5.760 19.240 8.500 M14.240 14.400 L 14.240 19.040 13.120 19.600 L 12.000 20.160 10.880 19.600 L 9.760 19.040 9.760 14.400 L 9.760 9.760 12.000 9.760 L 14.240 9.760 14.240 14.400 M11.000 12.000 L 11.000 12.760 12.000 12.760 L 13.000 12.760 13.000 12.000 L 13.000 11.240 12.000 11.240 L 11.000 11.240 11.000 12.000 M8.240 15.521 L 8.240 18.281 7.030 17.675 L 5.820 17.068 5.499 16.744 C 5.131 16.374,4.956 16.074,4.839 15.616 C 4.768 15.340,4.760 15.171,4.760 14.034 L 4.760 12.760 6.500 12.760 L 8.240 12.760 8.240 15.521 M19.240 14.034 C 19.240 15.171,19.232 15.340,19.161 15.616 C 19.044 16.074,18.869 16.374,18.501 16.744 L 18.180 17.068 16.970 17.675 L 15.760 18.281 15.760 15.521 L 15.760 12.760 17.500 12.760 L 19.240 12.760 19.240 14.034 " stroke="none" fill-rule="evenodd"></path>';

const ShieldDatacenterSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-shield-datacenter';
  const symbolId = 'snack-uikit-web-icons-' + 'shield-datacenter';
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
export default ShieldDatacenterSpriteSVG;
