// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.760 12.000 19.760 L 18.760 19.760 18.760 12.000 L 18.760 4.240 12.000 4.240 L 5.240 4.240 5.240 12.000 M17.240 12.000 L 17.240 18.240 12.000 18.240 L 6.760 18.240 6.760 12.000 L 6.760 5.760 12.000 5.760 L 17.240 5.760 17.240 12.000 M9.000 8.500 L 9.000 9.240 12.000 9.240 L 15.000 9.240 15.000 8.500 L 15.000 7.760 12.000 7.760 L 9.000 7.760 9.000 8.500 M9.000 12.000 L 9.000 12.760 12.000 12.760 L 15.000 12.760 15.000 12.000 L 15.000 11.240 12.000 11.240 L 9.000 11.240 9.000 12.000 M9.000 15.500 L 9.000 16.240 12.000 16.240 L 15.000 16.240 15.000 15.500 L 15.000 14.760 12.000 14.760 L 9.000 14.760 9.000 15.500 " stroke="none" fill-rule="evenodd"></path>';

const DetalisationSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-detalisation';
  const symbolId = 'snack-uikit-product-icons-' + 'detalisation';
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
export default DetalisationSpriteSVG;
