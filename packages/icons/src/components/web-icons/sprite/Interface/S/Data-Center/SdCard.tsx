// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.466 5.509 L 3.240 7.777 3.240 14.269 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 14.226 3.240 L 7.691 3.240 5.466 5.509 M10.240 5.880 L 10.240 7.000 11.000 7.000 L 11.760 7.000 11.760 5.880 L 11.760 4.760 12.500 4.760 L 13.240 4.760 13.240 5.880 L 13.240 7.000 14.000 7.000 L 14.760 7.000 14.760 5.880 L 14.760 4.760 15.500 4.760 L 16.240 4.760 16.240 5.880 L 16.240 7.000 17.000 7.000 L 17.760 7.000 17.760 5.880 L 17.760 4.760 18.500 4.760 L 19.240 4.760 19.240 12.000 L 19.240 19.240 18.500 19.240 L 17.760 19.240 17.760 16.740 L 17.760 14.240 12.000 14.240 L 6.240 14.240 6.240 16.740 L 6.240 19.240 5.500 19.240 L 4.760 19.240 4.760 13.804 L 4.760 8.367 6.530 6.564 L 8.300 4.760 9.270 4.760 L 10.240 4.760 10.240 5.880 M16.240 17.500 L 16.240 19.240 12.000 19.240 L 7.760 19.240 7.760 17.500 L 7.760 15.760 12.000 15.760 L 16.240 15.760 16.240 17.500 " stroke="none" fill-rule="evenodd"></path>';

const SdCardSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-sd-card';
  const symbolId = 'snack-uikit-web-icons-' + 'sd-card';
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
export default SdCardSpriteSVG;
