// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.258 3.290 C 3.248 3.317,3.244 7.255,3.250 12.040 L 3.260 20.740 12.010 20.750 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.019 3.240 C 5.063 3.240,3.274 3.250,3.258 3.290 M19.238 6.190 L 19.236 7.620 15.616 10.105 L 11.996 12.590 8.379 10.105 L 4.762 7.620 4.761 6.190 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.238 6.190 M6.977 10.959 C 7.569 11.367,8.059 11.718,8.067 11.740 C 8.074 11.762,7.333 12.527,6.420 13.440 L 4.760 15.100 4.760 12.268 L 4.760 9.435 5.330 9.827 C 5.644 10.042,6.385 10.552,6.977 10.959 M19.231 13.683 L 19.220 15.080 17.550 13.410 L 15.879 11.739 17.550 10.592 L 19.220 9.444 19.231 10.865 C 19.236 11.647,19.236 12.915,19.231 13.683 M10.690 13.516 C 11.367 13.982,11.943 14.371,11.970 14.381 C 11.998 14.391,12.605 13.995,13.320 13.502 L 14.620 12.604 16.930 14.912 L 19.240 17.220 19.240 18.230 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 18.230 L 4.760 17.220 7.068 14.912 C 8.492 13.488,9.392 12.616,9.418 12.636 C 9.441 12.654,10.014 13.050,10.690 13.516 " stroke="none" fill-rule="evenodd"></path>';

const EnvelopeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-envelope';
  const symbolId = 'snack-uikit-web-icons-' + 'envelope';
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
export default EnvelopeSpriteSVG;
