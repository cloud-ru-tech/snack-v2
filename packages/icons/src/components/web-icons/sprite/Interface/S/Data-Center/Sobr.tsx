// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 6.500 L 3.240 9.760 6.500 9.760 L 9.760 9.760 9.760 8.500 L 9.760 7.240 10.500 7.240 L 11.240 7.240 11.240 12.000 L 11.240 16.760 10.500 16.760 L 9.760 16.760 9.760 15.500 L 9.760 14.240 6.500 14.240 L 3.240 14.240 3.240 17.500 L 3.240 20.760 6.500 20.760 L 9.760 20.760 9.760 19.500 L 9.760 18.240 11.260 18.240 L 12.760 18.240 12.760 12.740 L 12.760 7.240 13.500 7.240 L 14.240 7.240 14.240 8.500 L 14.240 9.760 17.500 9.760 L 20.760 9.760 20.760 6.500 L 20.760 3.240 17.500 3.240 L 14.240 3.240 14.240 4.500 L 14.240 5.760 12.000 5.760 L 9.760 5.760 9.760 4.500 L 9.760 3.240 6.500 3.240 L 3.240 3.240 3.240 6.500 M8.240 6.500 L 8.240 8.240 6.500 8.240 L 4.760 8.240 4.760 6.500 L 4.760 4.760 6.500 4.760 L 8.240 4.760 8.240 6.500 M19.240 6.500 L 19.240 8.240 17.500 8.240 L 15.760 8.240 15.760 6.500 L 15.760 4.760 17.500 4.760 L 19.240 4.760 19.240 6.500 M8.240 17.500 L 8.240 19.240 6.500 19.240 L 4.760 19.240 4.760 17.500 L 4.760 15.760 6.500 15.760 L 8.240 15.760 8.240 17.500 " stroke="none" fill-rule="evenodd"></path>';

const SobrSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-sobr';
  const symbolId = 'snack-uikit-web-icons-' + 'sobr';
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
export default SobrSpriteSVG;
