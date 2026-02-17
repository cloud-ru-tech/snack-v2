// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 12.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 12.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 12.000 M7.240 12.000 L 7.240 12.760 8.000 12.760 L 8.760 12.760 8.760 12.000 L 8.760 11.240 8.000 11.240 L 7.240 11.240 7.240 12.000 M11.240 12.000 L 11.240 12.760 12.000 12.760 L 12.760 12.760 12.760 12.000 L 12.760 11.240 12.000 11.240 L 11.240 11.240 11.240 12.000 M15.240 12.000 L 15.240 12.760 16.000 12.760 L 16.760 12.760 16.760 12.000 L 16.760 11.240 16.000 11.240 L 15.240 11.240 15.240 12.000 " stroke="none" fill-rule="evenodd"></path>';

const SquarePointsSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-square-points';
  const symbolId = 'snack-uikit-web-icons-' + 'square-points';
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
export default SquarePointsSpriteSVG;
