// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 7.122 L 3.240 11.003 3.080 11.170 C 2.634 11.634,2.655 12.403,3.126 12.874 C 3.907 13.655,5.240 13.104,5.240 12.000 C 5.240 11.688,5.121 11.379,4.920 11.170 L 4.760 11.003 4.760 7.882 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 6.380 L 19.240 8.000 20.000 8.000 L 20.760 8.000 20.760 5.620 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 7.122 M7.240 12.000 L 7.240 16.760 12.000 16.760 L 16.760 16.760 16.760 12.000 L 16.760 7.240 12.000 7.240 L 7.240 7.240 7.240 12.000 M12.240 10.000 L 12.240 11.240 10.500 11.240 L 8.760 11.240 8.760 10.000 L 8.760 8.760 10.500 8.760 L 12.240 8.760 12.240 10.000 M15.240 10.000 L 15.240 11.240 14.500 11.240 L 13.760 11.240 13.760 10.000 L 13.760 8.760 14.500 8.760 L 15.240 8.760 15.240 10.000 M19.586 10.820 C 19.395 10.893,19.166 11.060,19.022 11.231 C 18.654 11.668,18.681 12.415,19.080 12.830 L 19.240 12.997 19.240 16.118 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 17.620 L 4.760 16.000 4.000 16.000 L 3.240 16.000 3.240 18.380 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 16.878 L 20.760 12.997 20.920 12.830 C 21.355 12.378,21.345 11.602,20.899 11.149 C 20.639 10.886,20.406 10.783,20.040 10.771 C 19.851 10.765,19.683 10.783,19.586 10.820 M10.240 14.000 L 10.240 15.240 9.500 15.240 L 8.760 15.240 8.760 14.000 L 8.760 12.760 9.500 12.760 L 10.240 12.760 10.240 14.000 M15.240 14.000 L 15.240 15.240 13.500 15.240 L 11.760 15.240 11.760 14.000 L 11.760 12.760 13.500 12.760 L 15.240 12.760 15.240 14.000 " stroke="none" fill-rule="evenodd"></path>';

const GatewaySpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-gateway';
  const symbolId = 'snack-uikit-web-icons-' + 'gateway';
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
export default GatewaySpriteSVG;
