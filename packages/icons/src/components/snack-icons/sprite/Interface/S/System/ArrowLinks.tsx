// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.000 8.000 L 10.000 8.760 12.090 8.760 L 14.180 8.760 10.830 12.110 L 7.480 15.460 8.010 15.990 L 8.540 16.520 11.890 13.170 L 15.240 9.820 15.240 11.910 L 15.240 14.000 16.000 14.000 L 16.760 14.000 16.760 11.000 L 16.760 8.000 16.380 8.000 L 16.000 8.000 16.000 7.620 L 16.000 7.240 13.000 7.240 L 10.000 7.240 10.000 8.000 " stroke="none" fill-rule="evenodd"></path>';

const ArrowLinksSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-arrow-links';
  const symbolId = 'snack-uikit-snack-icons-' + 'arrow-links';
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
export default ArrowLinksSpriteSVG;
