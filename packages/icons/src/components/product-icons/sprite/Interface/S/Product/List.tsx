// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.000 6.000 L 4.000 6.760 5.000 6.760 L 6.000 6.760 6.000 6.000 L 6.000 5.240 5.000 5.240 L 4.000 5.240 4.000 6.000 M8.000 6.000 L 8.000 6.760 14.000 6.760 L 20.000 6.760 20.000 6.000 L 20.000 5.240 14.000 5.240 L 8.000 5.240 8.000 6.000 M4.000 12.000 L 4.000 12.760 5.000 12.760 L 6.000 12.760 6.000 12.000 L 6.000 11.240 5.000 11.240 L 4.000 11.240 4.000 12.000 M8.000 12.000 L 8.000 12.760 14.000 12.760 L 20.000 12.760 20.000 12.000 L 20.000 11.240 14.000 11.240 L 8.000 11.240 8.000 12.000 M4.000 18.000 L 4.000 18.760 5.000 18.760 L 6.000 18.760 6.000 18.000 L 6.000 17.240 5.000 17.240 L 4.000 17.240 4.000 18.000 M8.000 18.000 L 8.000 18.760 14.000 18.760 L 20.000 18.760 20.000 18.000 L 20.000 17.240 14.000 17.240 L 8.000 17.240 8.000 18.000 " stroke="none" fill-rule="evenodd"></path>';

const ListSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-list';
  const symbolId = 'snack-uikit-product-icons-' + 'list';
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
export default ListSpriteSVG;
