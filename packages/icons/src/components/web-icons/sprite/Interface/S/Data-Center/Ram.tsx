// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 10.500 L 3.240 15.760 4.240 15.760 L 5.240 15.760 5.240 17.260 L 5.240 18.760 12.000 18.760 L 18.760 18.760 18.760 17.260 L 18.760 15.760 19.760 15.760 L 20.760 15.760 20.760 10.500 L 20.760 5.240 12.000 5.240 L 3.240 5.240 3.240 10.500 M19.240 10.500 L 19.240 14.240 12.000 14.240 L 4.760 14.240 4.760 10.500 L 4.760 6.760 12.000 6.760 L 19.240 6.760 19.240 10.500 M6.240 10.500 L 6.240 12.000 7.000 12.000 L 7.760 12.000 7.760 10.500 L 7.760 9.000 7.000 9.000 L 6.240 9.000 6.240 10.500 M9.240 10.500 L 9.240 12.000 10.000 12.000 L 10.760 12.000 10.760 10.500 L 10.760 9.000 10.000 9.000 L 9.240 9.000 9.240 10.500 M13.240 10.500 L 13.240 12.000 14.000 12.000 L 14.760 12.000 14.760 10.500 L 14.760 9.000 14.000 9.000 L 13.240 9.000 13.240 10.500 M16.240 10.500 L 16.240 12.000 17.000 12.000 L 17.760 12.000 17.760 10.500 L 17.760 9.000 17.000 9.000 L 16.240 9.000 16.240 10.500 M17.240 16.500 L 17.240 17.240 12.000 17.240 L 6.760 17.240 6.760 16.500 L 6.760 15.760 12.000 15.760 L 17.240 15.760 17.240 16.500 " stroke="none" fill-rule="evenodd"></path>';

const RamSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-ram';
  const symbolId = 'snack-uikit-web-icons-' + 'ram';
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
export default RamSpriteSVG;
