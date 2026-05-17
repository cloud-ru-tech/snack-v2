// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.240 12.000 L 7.240 19.000 8.000 19.000 L 8.760 19.000 8.760 15.880 L 8.760 12.760 12.000 12.760 L 15.240 12.760 15.240 15.880 L 15.240 19.000 16.000 19.000 L 16.760 19.000 16.760 12.000 L 16.760 5.000 16.000 5.000 L 15.240 5.000 15.240 8.120 L 15.240 11.240 12.000 11.240 L 8.760 11.240 8.760 8.120 L 8.760 5.000 8.000 5.000 L 7.240 5.000 7.240 12.000 " stroke="none" fill-rule="evenodd"></path>';

const HeadingSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-heading';
  const symbolId = 'snack-uikit-snack-icons-' + 'heading';
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
export default HeadingSpriteSVG;
