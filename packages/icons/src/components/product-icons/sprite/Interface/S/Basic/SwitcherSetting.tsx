// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M14.617 4.283 C 14.052 4.350,13.531 4.606,13.095 5.030 C 12.796 5.321,12.554 5.678,12.434 6.007 L 12.349 6.240 8.175 6.240 L 4.000 6.240 4.000 7.000 L 4.000 7.760 8.175 7.760 L 12.349 7.760 12.434 7.993 C 12.620 8.503,13.107 9.075,13.605 9.371 C 13.745 9.454,14.004 9.570,14.180 9.628 C 14.457 9.719,14.567 9.733,15.000 9.733 C 15.433 9.733,15.543 9.719,15.820 9.628 C 15.996 9.570,16.255 9.454,16.395 9.371 C 16.893 9.075,17.380 8.503,17.566 7.993 L 17.651 7.760 18.825 7.760 L 20.000 7.760 20.000 7.000 L 20.000 6.240 18.825 6.240 L 17.651 6.240 17.566 6.007 C 17.327 5.351,16.666 4.685,16.013 4.441 C 15.589 4.282,15.093 4.226,14.617 4.283 M15.528 5.873 C 15.767 5.990,16.009 6.232,16.127 6.472 C 16.260 6.742,16.260 7.259,16.127 7.529 C 15.663 8.472,14.332 8.472,13.875 7.529 C 13.764 7.300,13.730 6.909,13.801 6.658 C 13.898 6.310,14.231 5.955,14.586 5.820 C 14.818 5.732,15.294 5.759,15.528 5.873 M8.617 14.283 C 8.052 14.350,7.531 14.606,7.095 15.030 C 6.796 15.321,6.554 15.678,6.434 16.007 L 6.349 16.240 5.175 16.240 L 4.000 16.240 4.000 17.000 L 4.000 17.760 5.175 17.760 L 6.349 17.760 6.434 17.993 C 6.620 18.503,7.107 19.075,7.605 19.371 C 7.745 19.454,8.004 19.570,8.180 19.628 C 8.457 19.719,8.567 19.733,9.000 19.733 C 9.433 19.733,9.543 19.719,9.820 19.628 C 9.996 19.570,10.255 19.454,10.395 19.371 C 10.893 19.075,11.380 18.503,11.566 17.993 L 11.651 17.760 15.825 17.760 L 20.000 17.760 20.000 17.000 L 20.000 16.240 15.825 16.240 L 11.651 16.240 11.566 16.007 C 11.327 15.351,10.666 14.685,10.013 14.441 C 9.589 14.282,9.093 14.226,8.617 14.283 M9.528 15.873 C 9.767 15.990,10.009 16.232,10.127 16.472 C 10.260 16.742,10.260 17.259,10.127 17.529 C 9.663 18.472,8.332 18.472,7.875 17.529 C 7.764 17.300,7.730 16.909,7.801 16.658 C 7.898 16.310,8.231 15.955,8.586 15.820 C 8.818 15.732,9.294 15.759,9.528 15.873 " stroke="none" fill-rule="evenodd"></path>';

const SwitcherSettingSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-switcher-setting';
  const symbolId = 'snack-uikit-product-icons-' + 'switcher-setting';
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
export default SwitcherSettingSpriteSVG;
