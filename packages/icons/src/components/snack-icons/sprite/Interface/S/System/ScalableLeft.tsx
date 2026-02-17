// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.000 3.620 L 4.000 4.000 3.620 4.000 L 3.240 4.000 3.240 7.000 L 3.240 10.000 4.000 10.000 L 4.760 10.000 4.760 7.910 L 4.760 5.820 8.110 9.170 L 11.460 12.520 11.990 11.990 L 12.520 11.460 9.170 8.110 L 5.820 4.760 7.910 4.760 L 10.000 4.760 10.000 4.000 L 10.000 3.240 7.000 3.240 L 4.000 3.240 4.000 3.620 M12.000 4.000 L 12.000 4.760 14.850 4.760 L 17.699 4.760 18.470 5.530 L 19.240 6.299 19.240 12.000 L 19.240 17.701 18.470 18.470 L 17.699 19.240 12.000 19.240 L 6.301 19.240 5.530 18.470 L 4.760 17.701 4.760 14.850 L 4.760 12.000 4.000 12.000 L 3.240 12.000 3.240 15.150 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 15.150 3.240 L 12.000 3.240 12.000 4.000 " stroke="none" fill-rule="evenodd"></path>';

const ScalableLeftSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-scalable-left';
  const symbolId = 'snack-uikit-snack-icons-' + 'scalable-left';
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
export default ScalableLeftSpriteSVG;
