// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.000 8.000 L 6.000 8.760 12.000 8.760 L 18.000 8.760 18.000 8.000 L 18.000 7.240 12.000 7.240 L 6.000 7.240 6.000 8.000 M6.000 12.000 L 6.000 12.760 12.000 12.760 L 18.000 12.760 18.000 12.000 L 18.000 11.240 12.000 11.240 L 6.000 11.240 6.000 12.000 M6.000 16.000 L 6.000 16.760 12.000 16.760 L 18.000 16.760 18.000 16.000 L 18.000 15.240 12.000 15.240 L 6.000 15.240 6.000 16.000 " stroke="none" fill-rule="evenodd"></path>';

const BurgerSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-burger';
  const symbolId = 'snack-uikit-product-icons-' + 'burger';
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
export default BurgerSpriteSVG;
