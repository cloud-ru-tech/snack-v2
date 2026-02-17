// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.240 4.740 L 7.240 6.240 5.240 6.240 L 3.240 6.240 3.240 13.500 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 13.500 L 20.760 6.240 18.760 6.240 L 16.760 6.240 16.760 4.740 L 16.760 3.240 12.000 3.240 L 7.240 3.240 7.240 4.740 M15.240 5.500 L 15.240 6.240 12.000 6.240 L 8.760 6.240 8.760 5.500 L 8.760 4.760 12.000 4.760 L 15.240 4.760 15.240 5.500 M19.240 10.000 L 19.240 12.240 12.000 12.240 L 4.760 12.240 4.760 10.000 L 4.760 7.760 12.000 7.760 L 19.240 7.760 19.240 10.000 M11.000 9.680 L 11.000 10.440 12.000 10.440 L 13.000 10.440 13.000 9.680 L 13.000 8.920 12.000 8.920 L 11.000 8.920 11.000 9.680 M19.240 16.500 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 16.500 L 4.760 13.760 12.000 13.760 L 19.240 13.760 19.240 16.500 " stroke="none" fill-rule="evenodd"></path>';

const CaseSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-case';
  const symbolId = 'snack-uikit-web-icons-' + 'case';
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
export default CaseSpriteSVG;
