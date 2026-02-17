// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.240 5.620 L 7.240 7.240 5.620 7.240 L 4.000 7.240 4.000 8.000 L 4.000 8.760 6.380 8.760 L 8.760 8.760 8.760 6.380 L 8.760 4.000 8.000 4.000 L 7.240 4.000 7.240 5.620 M15.240 6.380 L 15.240 8.760 17.620 8.760 L 20.000 8.760 20.000 8.000 L 20.000 7.240 18.380 7.240 L 16.760 7.240 16.760 5.620 L 16.760 4.000 16.000 4.000 L 15.240 4.000 15.240 6.380 M4.000 16.000 L 4.000 16.760 5.620 16.760 L 7.240 16.760 7.240 18.380 L 7.240 20.000 8.000 20.000 L 8.760 20.000 8.760 17.620 L 8.760 15.240 6.380 15.240 L 4.000 15.240 4.000 16.000 M15.240 17.620 L 15.240 20.000 16.000 20.000 L 16.760 20.000 16.760 18.380 L 16.760 16.760 18.380 16.760 L 20.000 16.760 20.000 16.000 L 20.000 15.240 17.620 15.240 L 15.240 15.240 15.240 17.620 " stroke="none" fill-rule="evenodd"></path>';

const RollupSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-rollup';
  const symbolId = 'snack-uikit-product-icons-' + 'rollup';
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
export default RollupSpriteSVG;
