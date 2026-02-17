// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.590 5.108 L 3.240 7.015 3.240 8.387 L 3.240 9.760 6.240 9.760 L 9.240 9.760 9.240 13.020 L 9.240 16.280 8.000 16.280 L 6.760 16.280 6.760 13.900 L 6.760 11.520 6.000 11.520 L 5.240 11.520 5.240 13.900 L 5.240 16.280 4.240 16.280 L 3.240 16.280 3.240 18.520 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 18.520 L 20.760 16.280 17.760 16.280 L 14.760 16.280 14.760 13.020 L 14.760 9.760 16.000 9.760 L 17.239 9.760 17.250 12.130 L 17.260 14.500 18.000 14.500 L 18.740 14.500 18.750 12.130 L 18.761 9.760 19.760 9.760 L 20.760 9.760 20.760 8.387 L 20.760 7.015 16.430 5.120 C 14.048 4.078,12.064 3.220,12.020 3.213 C 11.976 3.207,9.983 4.059,7.590 5.108 M15.672 6.423 L 19.238 7.980 19.239 8.110 L 19.240 8.240 12.000 8.240 L 4.760 8.240 4.761 8.110 L 4.762 7.980 8.351 6.410 C 10.325 5.546,11.977 4.846,12.023 4.853 C 12.068 4.860,13.710 5.567,15.672 6.423 M13.240 13.020 L 13.240 16.280 12.000 16.280 L 10.760 16.280 10.760 13.020 L 10.760 9.760 12.000 9.760 L 13.240 9.760 13.240 13.020 M19.240 18.520 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 18.520 L 4.760 17.800 12.000 17.800 L 19.240 17.800 19.240 18.520 " stroke="none" fill-rule="evenodd"></path>';

const BankSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bank';
  const symbolId = 'snack-uikit-web-icons-' + 'bank';
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
export default BankSpriteSVG;
