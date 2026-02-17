// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M11.240 12.000 L 11.240 19.240 9.500 19.240 L 7.760 19.240 7.760 14.880 L 7.760 10.520 7.000 10.520 L 6.240 10.520 6.240 14.880 L 6.240 19.240 5.500 19.240 L 4.760 19.240 4.760 12.000 L 4.760 4.760 8.000 4.760 L 11.240 4.760 11.240 12.000 M19.240 12.000 L 19.240 19.240 17.500 19.240 L 15.760 19.240 15.760 14.880 L 15.760 10.520 15.000 10.520 L 14.240 10.520 14.240 14.880 L 14.240 19.240 13.500 19.240 L 12.760 19.240 12.760 12.000 L 12.760 4.760 16.000 4.760 L 19.240 4.760 19.240 12.000 M6.249 7.750 L 6.260 8.500 7.000 8.500 L 7.740 8.500 7.751 7.750 L 7.762 7.000 7.000 7.000 L 6.238 7.000 6.249 7.750 M14.249 7.750 L 14.260 8.500 15.000 8.500 L 15.740 8.500 15.751 7.750 L 15.762 7.000 15.000 7.000 L 14.238 7.000 14.249 7.750 " stroke="none" fill-rule="evenodd"></path>';

const TwoSupercomputersSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-two-supercomputers';
  const symbolId = 'snack-uikit-web-icons-' + 'two-supercomputers';
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
export default TwoSupercomputersSpriteSVG;
