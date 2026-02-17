// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 10.500 L 4.240 16.760 8.370 16.750 L 12.500 16.740 12.500 16.000 L 12.500 15.260 9.130 15.250 L 5.760 15.240 5.760 10.500 L 5.760 5.760 11.999 5.760 L 18.239 5.760 18.249 7.130 L 18.260 8.500 19.000 8.500 L 19.740 8.500 19.750 6.370 L 19.761 4.240 12.000 4.240 L 4.240 4.240 4.240 10.500 M14.240 15.500 L 14.240 20.760 17.500 20.760 L 20.760 20.760 20.760 15.500 L 20.760 10.240 17.500 10.240 L 14.240 10.240 14.240 15.500 M19.240 15.500 L 19.240 19.240 17.500 19.240 L 15.760 19.240 15.760 15.500 L 15.760 11.760 17.500 11.760 L 19.240 11.760 19.240 15.500 M3.000 19.000 L 3.000 19.760 7.750 19.750 L 12.500 19.740 12.500 19.000 L 12.500 18.260 7.750 18.250 L 3.000 18.240 3.000 19.000 " stroke="none" fill-rule="evenodd"></path>';

const LaptopPhoneSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-laptop-phone';
  const symbolId = 'snack-uikit-snack-icons-' + 'laptop-phone';
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
export default LaptopPhoneSpriteSVG;
