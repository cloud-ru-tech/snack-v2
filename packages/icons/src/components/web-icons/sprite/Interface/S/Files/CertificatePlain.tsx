// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.250 11.970 L 3.260 19.700 11.500 19.700 L 19.740 19.700 19.750 11.970 L 19.760 4.240 11.500 4.240 L 3.240 4.240 3.250 11.970 M18.240 11.980 L 18.240 18.200 11.500 18.200 L 4.760 18.200 4.760 11.980 L 4.760 5.760 11.500 5.760 L 18.240 5.760 18.240 11.980 M7.498 8.291 C 7.487 8.320,7.483 8.657,7.489 9.041 L 7.500 9.740 11.530 9.750 L 15.560 9.760 15.560 9.000 L 15.560 8.240 11.539 8.240 C 8.300 8.240,7.514 8.250,7.498 8.291 M7.498 11.291 C 7.487 11.320,7.483 11.657,7.489 12.041 L 7.500 12.740 11.500 12.740 L 15.500 12.740 15.500 12.000 L 15.500 11.260 11.509 11.250 C 8.280 11.242,7.514 11.249,7.498 11.291 " stroke="none" fill-rule="evenodd"></path>';

const CertificatePlainSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-certificate-plain';
  const symbolId = 'snack-uikit-web-icons-' + 'certificate-plain';
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
export default CertificatePlainSpriteSVG;
