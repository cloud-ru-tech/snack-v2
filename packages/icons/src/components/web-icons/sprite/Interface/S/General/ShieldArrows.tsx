// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.251 9.910 C 3.263 15.051,3.271 15.605,3.331 15.849 C 3.494 16.502,3.813 17.131,4.226 17.612 C 4.729 18.197,4.760 18.215,8.530 20.103 L 12.000 21.841 15.470 20.103 C 19.240 18.215,19.271 18.197,19.774 17.612 C 20.187 17.131,20.506 16.502,20.669 15.849 C 20.729 15.605,20.737 15.051,20.749 9.910 L 20.762 4.240 12.000 4.240 L 3.238 4.240 3.251 9.910 M11.240 9.500 L 11.240 13.240 10.000 13.240 L 8.760 13.240 8.760 12.210 L 8.760 11.180 7.350 12.590 L 5.940 14.000 7.350 15.410 L 8.760 16.820 8.760 15.790 L 8.760 14.760 10.000 14.760 L 11.240 14.760 11.240 17.260 C 11.240 18.635,11.231 19.760,11.219 19.760 C 11.208 19.760,9.988 19.155,8.509 18.415 L 5.820 17.069 5.499 16.745 C 5.131 16.374,4.956 16.074,4.839 15.616 C 4.762 15.317,4.760 15.156,4.760 10.534 L 4.760 5.760 8.000 5.760 L 11.240 5.760 11.240 9.500 M19.240 10.534 C 19.240 15.156,19.238 15.317,19.161 15.616 C 19.044 16.074,18.869 16.374,18.501 16.745 L 18.180 17.069 15.491 18.415 C 14.012 19.155,12.792 19.760,12.781 19.760 C 12.769 19.760,12.760 17.735,12.760 15.260 L 12.760 10.760 14.000 10.760 L 15.240 10.760 15.240 11.790 L 15.240 12.820 16.650 11.410 L 18.060 10.000 16.650 8.590 L 15.240 7.180 15.240 8.210 L 15.240 9.240 14.000 9.240 L 12.760 9.240 12.760 7.500 L 12.760 5.760 16.000 5.760 L 19.240 5.760 19.240 10.534 " stroke="none" fill-rule="evenodd"></path>';

const ShieldArrowsSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-shield-arrows';
  const symbolId = 'snack-uikit-web-icons-' + 'shield-arrows';
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
export default ShieldArrowsSpriteSVG;
