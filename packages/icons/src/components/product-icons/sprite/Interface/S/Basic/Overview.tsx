// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 8.000 L 3.240 12.760 7.000 12.760 L 10.760 12.760 10.760 8.000 L 10.760 3.240 7.000 3.240 L 3.240 3.240 3.240 8.000 M13.240 6.000 L 13.240 8.760 17.000 8.760 L 20.760 8.760 20.760 6.000 L 20.760 3.240 17.000 3.240 L 13.240 3.240 13.240 6.000 M9.240 8.000 L 9.240 11.240 7.000 11.240 L 4.760 11.240 4.760 8.000 L 4.760 4.760 7.000 4.760 L 9.240 4.760 9.240 8.000 M19.240 6.000 L 19.240 7.240 17.000 7.240 L 14.760 7.240 14.760 6.000 L 14.760 4.760 17.000 4.760 L 19.240 4.760 19.240 6.000 M13.240 16.000 L 13.240 20.760 17.000 20.760 L 20.760 20.760 20.760 16.000 L 20.760 11.240 17.000 11.240 L 13.240 11.240 13.240 16.000 M19.240 16.000 L 19.240 19.240 17.000 19.240 L 14.760 19.240 14.760 16.000 L 14.760 12.760 17.000 12.760 L 19.240 12.760 19.240 16.000 M3.240 18.000 L 3.240 20.760 7.000 20.760 L 10.760 20.760 10.760 18.000 L 10.760 15.240 7.000 15.240 L 3.240 15.240 3.240 18.000 M9.240 18.000 L 9.240 19.240 7.000 19.240 L 4.760 19.240 4.760 18.000 L 4.760 16.760 7.000 16.760 L 9.240 16.760 9.240 18.000 " stroke="none" fill-rule="evenodd"></path>';

const OverviewSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-overview';
  const symbolId = 'snack-uikit-product-icons-' + 'overview';
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
export default OverviewSpriteSVG;
