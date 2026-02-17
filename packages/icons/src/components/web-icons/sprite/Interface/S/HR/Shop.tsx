// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 6.129 L 3.240 9.018 4.240 14.863 C 4.790 18.078,5.240 20.720,5.240 20.734 C 5.240 20.748,8.282 20.760,12.000 20.760 C 15.718 20.760,18.760 20.748,18.760 20.734 C 18.760 20.719,19.210 18.077,19.760 14.862 L 20.760 9.018 20.760 6.129 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 6.129 M19.240 6.869 L 19.240 8.979 18.380 14.019 C 17.906 16.792,17.510 19.101,17.499 19.150 L 17.478 19.240 12.000 19.240 L 6.522 19.240 6.501 19.150 C 6.490 19.101,6.093 16.792,5.620 14.020 L 4.760 8.980 4.760 6.870 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 6.869 M7.000 9.000 L 7.000 9.760 12.000 9.760 L 17.000 9.760 17.000 9.000 L 17.000 8.240 12.000 8.240 L 7.000 8.240 7.000 9.000 M8.240 14.500 L 8.240 17.000 9.000 17.000 L 9.760 17.000 9.760 14.500 L 9.760 12.000 9.000 12.000 L 8.240 12.000 8.240 14.500 M11.240 14.500 L 11.240 17.000 12.000 17.000 L 12.760 17.000 12.760 14.500 L 12.760 12.000 12.000 12.000 L 11.240 12.000 11.240 14.500 M14.240 14.500 L 14.240 17.000 15.000 17.000 L 15.760 17.000 15.760 14.500 L 15.760 12.000 15.000 12.000 L 14.240 12.000 14.240 14.500 " stroke="none" fill-rule="evenodd"></path>';

const ShopSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-shop';
  const symbolId = 'snack-uikit-web-icons-' + 'shop';
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
export default ShopSpriteSVG;
