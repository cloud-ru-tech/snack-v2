// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M2.520 4.260 C 2.520 4.271,4.032 6.296,5.880 8.760 L 9.240 13.240 9.240 17.720 C 9.240 20.184,9.249 22.200,9.260 22.200 C 9.271 22.200,10.513 21.584,12.020 20.830 L 14.760 19.460 14.760 16.350 L 14.760 13.240 18.120 8.760 C 19.968 6.296,21.480 4.271,21.480 4.260 C 21.480 4.249,17.214 4.240,12.000 4.240 C 6.786 4.240,2.520 4.249,2.520 4.260 M18.451 5.810 C 18.429 5.838,17.248 7.412,15.826 9.310 L 13.240 12.760 13.240 15.650 L 13.240 18.541 12.020 19.150 C 11.349 19.486,10.791 19.760,10.780 19.760 C 10.769 19.760,10.760 18.185,10.760 16.260 L 10.760 12.760 8.174 9.310 C 6.752 7.412,5.571 5.838,5.549 5.810 C 5.518 5.770,6.814 5.760,12.000 5.760 C 17.186 5.760,18.482 5.770,18.451 5.810 " stroke="none" fill-rule="evenodd"></path>';

const FilterFunnelSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-filter-funnel';
  const symbolId = 'snack-uikit-web-icons-' + 'filter-funnel';
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
export default FilterFunnelSpriteSVG;
