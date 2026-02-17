// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.240 5.740 L 8.240 8.240 5.740 8.240 L 3.240 8.240 3.240 12.000 L 3.240 15.760 5.740 15.760 L 8.240 15.760 8.240 18.260 L 8.240 20.760 12.000 20.760 L 15.760 20.760 15.760 19.240 L 15.760 17.720 15.000 17.720 L 14.240 17.720 14.240 18.480 L 14.240 19.240 12.000 19.240 L 9.760 19.240 9.760 16.740 L 9.760 14.240 7.260 14.240 L 4.760 14.240 4.760 12.000 L 4.760 9.760 7.260 9.760 L 9.760 9.760 9.760 7.260 L 9.760 4.760 12.000 4.760 L 14.240 4.760 14.240 7.260 L 14.240 9.760 16.740 9.760 L 19.240 9.760 19.240 12.000 L 19.240 14.240 17.867 14.240 L 16.495 14.240 16.377 14.116 C 16.313 14.048,16.179 13.945,16.080 13.886 C 15.917 13.790,15.861 13.780,15.500 13.780 C 15.048 13.780,14.952 13.815,14.652 14.092 C 14.086 14.613,14.134 15.511,14.752 15.983 C 15.215 16.336,15.833 16.319,16.300 15.938 L 16.519 15.760 18.639 15.760 L 20.760 15.760 20.760 12.000 L 20.760 8.240 18.260 8.240 L 15.760 8.240 15.760 5.740 L 15.760 3.240 12.000 3.240 L 8.240 3.240 8.240 5.740 " stroke="none" fill-rule="evenodd"></path>';

const MedicalSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-medical';
  const symbolId = 'snack-uikit-web-icons-' + 'medical';
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
export default MedicalSpriteSVG;
