// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 7.000 L 3.240 10.760 7.000 10.760 L 10.760 10.760 10.760 9.260 L 10.760 7.760 13.500 7.760 L 16.239 7.760 16.250 9.630 L 16.260 11.500 17.000 11.500 L 17.740 11.500 17.750 8.870 L 17.761 6.240 14.260 6.240 L 10.760 6.240 10.760 4.740 L 10.760 3.240 7.000 3.240 L 3.240 3.240 3.240 7.000 M9.240 7.000 L 9.240 9.240 7.000 9.240 L 4.760 9.240 4.760 7.000 L 4.760 4.760 7.000 4.760 L 9.240 4.760 9.240 7.000 M6.240 15.140 L 6.240 17.760 9.740 17.760 L 13.240 17.760 13.240 19.260 L 13.240 20.760 17.000 20.760 L 20.760 20.760 20.760 17.000 L 20.760 13.240 17.000 13.240 L 13.240 13.240 13.240 14.740 L 13.240 16.240 10.500 16.240 L 7.760 16.240 7.760 14.380 L 7.760 12.520 7.000 12.520 L 6.240 12.520 6.240 15.140 M19.240 17.000 L 19.240 19.240 17.000 19.240 L 14.760 19.240 14.760 17.000 L 14.760 14.760 17.000 14.760 L 19.240 14.760 19.240 17.000 " stroke="none" fill-rule="evenodd"></path>';

const ReplacementSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-replacement';
  const symbolId = 'snack-uikit-web-icons-' + 'replacement';
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
export default ReplacementSpriteSVG;
