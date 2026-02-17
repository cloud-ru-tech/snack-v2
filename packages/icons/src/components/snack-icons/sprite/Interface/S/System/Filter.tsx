// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.000 7.000 L 4.000 7.760 12.000 7.760 L 20.000 7.760 20.000 7.000 L 20.000 6.240 12.000 6.240 L 4.000 6.240 4.000 7.000 M7.000 12.000 L 7.000 12.760 12.000 12.760 L 17.000 12.760 17.000 12.000 L 17.000 11.240 12.000 11.240 L 7.000 11.240 7.000 12.000 M10.000 17.000 L 10.000 17.760 12.000 17.760 L 14.000 17.760 14.000 17.000 L 14.000 16.240 12.000 16.240 L 10.000 16.240 10.000 17.000 " stroke="none" fill-rule="evenodd"></path>';

const FilterSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-filter';
  const symbolId = 'snack-uikit-snack-icons-' + 'filter';
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
export default FilterSpriteSVG;
