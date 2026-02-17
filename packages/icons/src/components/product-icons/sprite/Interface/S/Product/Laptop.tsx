// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 10.500 L 4.240 16.760 12.000 16.760 L 19.760 16.760 19.760 10.500 L 19.760 4.240 12.000 4.240 L 4.240 4.240 4.240 10.500 M18.240 10.500 L 18.240 15.240 12.000 15.240 L 5.760 15.240 5.760 10.500 L 5.760 5.760 12.000 5.760 L 18.240 5.760 18.240 10.500 M3.000 19.000 L 3.000 19.760 12.000 19.760 L 21.000 19.760 21.000 19.000 L 21.000 18.240 12.000 18.240 L 3.000 18.240 3.000 19.000 " stroke="none" fill-rule="evenodd"></path>';

const LaptopSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-laptop';
  const symbolId = 'snack-uikit-product-icons-' + 'laptop';
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
export default LaptopSpriteSVG;
