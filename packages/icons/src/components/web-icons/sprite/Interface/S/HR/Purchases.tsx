// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 6.709 L 19.240 8.657 19.017 8.439 C 18.744 8.171,18.438 7.723,18.316 7.412 C 18.238 7.215,18.224 7.104,18.222 6.670 C 18.221 6.390,18.219 6.160,18.217 6.160 C 18.213 6.160,17.004 5.894,16.854 5.860 C 16.776 5.842,16.764 5.865,16.724 6.094 C 16.556 7.059,16.823 8.079,17.470 8.940 L 17.680 9.220 12.194 9.230 C 9.176 9.236,6.699 9.232,6.689 9.222 C 6.679 9.213,6.707 9.154,6.751 9.092 C 7.100 8.598,7.321 7.747,7.319 6.905 C 7.319 6.537,7.264 5.926,7.229 5.897 C 7.221 5.890,6.173 6.049,5.900 6.098 L 5.780 6.120 5.780 6.850 C 5.780 7.506,5.771 7.607,5.689 7.844 C 5.535 8.289,5.240 8.674,4.898 8.876 L 4.760 8.957 4.760 6.859 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 6.709 M19.240 15.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 15.000 L 4.760 10.760 12.000 10.760 L 19.240 10.760 19.240 15.000 M9.240 13.090 C 9.241 14.248,9.268 14.537,9.419 14.973 C 9.559 15.375,9.743 15.661,10.080 15.999 C 10.607 16.529,11.148 16.736,12.000 16.735 C 12.850 16.734,13.405 16.522,13.918 16.004 C 14.258 15.660,14.441 15.374,14.581 14.973 C 14.732 14.537,14.759 14.248,14.760 13.090 L 14.760 12.000 14.000 12.000 L 13.240 12.000 13.240 13.115 C 13.240 14.022,13.228 14.267,13.177 14.425 C 13.003 14.963,12.603 15.240,12.000 15.240 C 11.397 15.240,10.997 14.963,10.823 14.425 C 10.772 14.267,10.760 14.022,10.760 13.115 L 10.760 12.000 10.000 12.000 L 9.240 12.000 9.240 13.090 " stroke="none" fill-rule="evenodd"></path>';

const PurchasesSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-purchases';
  const symbolId = 'snack-uikit-web-icons-' + 'purchases';
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
export default PurchasesSpriteSVG;
