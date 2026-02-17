// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.240 5.120 L 11.240 6.240 8.240 6.240 L 5.240 6.240 5.240 8.470 L 5.240 10.700 3.710 12.230 L 2.180 13.760 6.000 13.760 L 9.820 13.760 8.290 12.230 L 6.760 10.700 6.760 9.230 L 6.760 7.760 9.000 7.760 L 11.240 7.760 11.240 13.300 L 11.240 18.840 9.620 18.840 L 8.000 18.840 8.000 19.600 L 8.000 20.360 12.000 20.360 L 16.000 20.360 16.000 19.600 L 16.000 18.840 14.380 18.840 L 12.760 18.840 12.760 13.300 L 12.760 7.760 15.000 7.760 L 17.240 7.760 17.240 9.230 L 17.240 10.700 15.710 12.230 L 14.180 13.760 18.000 13.760 L 21.820 13.760 20.290 12.230 L 18.760 10.700 18.760 8.470 L 18.760 6.240 15.760 6.240 L 12.760 6.240 12.760 5.120 L 12.760 4.000 12.000 4.000 L 11.240 4.000 11.240 5.120 " stroke="none" fill-rule="evenodd"></path>';

const WeigherSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-weigher';
  const symbolId = 'snack-uikit-web-icons-' + 'weigher';
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
export default WeigherSpriteSVG;
