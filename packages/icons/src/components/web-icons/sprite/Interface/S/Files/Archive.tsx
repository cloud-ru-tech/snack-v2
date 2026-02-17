// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 6.000 L 3.240 8.760 3.740 8.760 L 4.240 8.760 4.240 14.760 L 4.240 20.760 12.000 20.760 L 19.760 20.760 19.760 14.760 L 19.760 8.760 20.260 8.760 L 20.760 8.760 20.760 6.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 6.000 M19.240 6.000 L 19.240 7.240 12.000 7.240 L 4.760 7.240 4.760 6.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 6.000 M18.240 14.000 L 18.240 19.240 12.000 19.240 L 5.760 19.240 5.760 14.000 L 5.760 8.760 12.000 8.760 L 18.240 8.760 18.240 14.000 M8.498 13.291 C 8.487 13.320,8.483 13.657,8.489 14.041 L 8.500 14.740 12.000 14.740 L 15.500 14.740 15.500 14.000 L 15.500 13.260 12.009 13.250 C 9.187 13.242,8.514 13.249,8.498 13.291 " stroke="none" fill-rule="evenodd"></path>';

const ArchiveSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-archive';
  const symbolId = 'snack-uikit-web-icons-' + 'archive';
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
export default ArchiveSpriteSVG;
