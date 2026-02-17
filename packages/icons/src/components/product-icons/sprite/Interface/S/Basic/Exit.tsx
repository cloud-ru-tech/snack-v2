// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 20.760 8.620 20.760 L 13.000 20.760 13.000 20.000 L 13.000 19.240 9.380 19.240 L 5.760 19.240 5.760 12.000 L 5.760 4.760 9.380 4.760 L 13.000 4.760 13.000 4.000 L 13.000 3.240 8.620 3.240 L 4.240 3.240 4.240 12.000 M15.240 9.210 L 15.240 11.240 12.120 11.240 L 9.000 11.240 9.000 12.000 L 9.000 12.760 12.120 12.760 L 15.240 12.760 15.240 14.790 L 15.240 16.820 17.650 14.410 L 20.060 12.000 17.650 9.590 L 15.240 7.180 15.240 9.210 " stroke="none" fill-rule="evenodd"></path>';

const ExitSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-exit';
  const symbolId = 'snack-uikit-product-icons-' + 'exit';
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
export default ExitSpriteSVG;
