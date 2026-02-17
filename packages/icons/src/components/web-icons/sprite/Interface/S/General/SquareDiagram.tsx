// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 8.001 L 19.240 11.241 17.831 11.231 L 16.423 11.220 15.221 9.111 C 14.561 7.952,14.011 7.003,14.000 7.003 C 13.989 7.003,13.179 8.408,12.200 10.125 C 11.221 11.842,10.338 13.390,10.237 13.565 L 10.054 13.883 9.417 12.562 L 8.780 11.241 6.770 11.241 L 4.760 11.240 4.760 8.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 8.001 M14.793 11.401 L 15.565 12.760 17.403 12.760 L 19.240 12.760 19.240 16.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 16.000 L 4.760 12.759 6.305 12.770 L 7.850 12.780 8.881 14.912 C 9.448 16.085,9.927 17.046,9.946 17.048 C 9.965 17.051,10.880 15.475,11.980 13.548 C 13.080 11.620,13.989 10.043,14.000 10.043 C 14.011 10.043,14.368 10.654,14.793 11.401 " stroke="none" fill-rule="evenodd"></path>';

const SquareDiagramSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-square-diagram';
  const symbolId = 'snack-uikit-web-icons-' + 'square-diagram';
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
export default SquareDiagramSpriteSVG;
