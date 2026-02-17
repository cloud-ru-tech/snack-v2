// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.250 11.970 L 3.260 19.700 6.880 19.700 L 10.500 19.700 10.511 18.950 L 10.522 18.200 7.641 18.200 L 4.760 18.200 4.760 11.980 L 4.760 5.760 11.500 5.760 L 18.239 5.760 18.250 7.630 L 18.260 9.500 19.000 9.500 L 19.740 9.500 19.750 6.870 L 19.761 4.240 11.500 4.240 L 3.240 4.240 3.250 11.970 M7.498 8.291 C 7.487 8.320,7.483 8.657,7.489 9.041 L 7.500 9.740 11.530 9.750 L 15.560 9.760 15.560 9.000 L 15.560 8.240 11.539 8.240 C 8.300 8.240,7.514 8.250,7.498 8.291 M15.612 11.281 C 14.730 11.392,14.024 12.026,13.820 12.890 C 13.783 13.046,13.761 13.347,13.761 13.690 L 13.760 14.240 13.000 14.240 L 12.240 14.240 12.240 17.500 L 12.240 20.760 16.500 20.760 L 20.760 20.760 20.760 17.500 L 20.760 14.240 20.000 14.240 L 19.240 14.240 19.239 13.690 C 19.239 13.347,19.217 13.046,19.180 12.890 C 19.002 12.137,18.379 11.502,17.639 11.321 C 17.403 11.263,15.978 11.235,15.612 11.281 M17.324 12.806 C 17.653 12.916,17.728 13.079,17.752 13.730 L 17.771 14.240 16.500 14.240 L 15.229 14.240 15.248 13.730 C 15.272 13.089,15.348 12.918,15.660 12.808 C 15.826 12.750,17.152 12.748,17.324 12.806 M19.240 17.500 L 19.240 19.240 16.500 19.240 L 13.760 19.240 13.760 17.500 L 13.760 15.760 16.500 15.760 L 19.240 15.760 19.240 17.500 M15.760 17.500 L 15.760 18.240 16.500 18.240 L 17.240 18.240 17.240 17.500 L 17.240 16.760 16.500 16.760 L 15.760 16.760 15.760 17.500 " stroke="none" fill-rule="evenodd"></path>';

const DocumentLockSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-document-lock';
  const symbolId = 'snack-uikit-web-icons-' + 'document-lock';
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
export default DocumentLockSpriteSVG;
