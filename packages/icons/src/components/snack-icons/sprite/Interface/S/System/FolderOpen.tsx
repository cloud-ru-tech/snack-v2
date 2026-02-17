// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 19.760 11.906 19.750 L 20.571 19.740 21.784 15.500 C 22.451 13.168,22.998 11.255,22.999 11.250 C 22.999 11.245,22.496 11.240,21.880 11.240 L 20.760 11.240 20.760 8.740 L 20.760 6.240 16.480 6.240 L 12.199 6.240 10.700 5.240 L 9.201 4.240 6.220 4.240 L 3.240 4.240 3.240 12.000 M10.280 6.760 L 11.780 7.760 15.510 7.760 L 19.240 7.760 19.240 9.500 L 19.240 11.240 13.334 11.250 L 7.429 11.260 6.853 13.275 C 6.536 14.383,6.282 15.294,6.288 15.298 C 6.295 15.303,6.619 15.397,7.010 15.508 L 7.720 15.709 7.798 15.445 C 7.840 15.299,8.021 14.667,8.200 14.040 C 8.378 13.413,8.533 12.868,8.545 12.830 C 8.564 12.764,8.896 12.760,14.785 12.760 L 21.005 12.760 20.978 12.845 C 20.942 12.959,19.440 18.217,19.440 18.230 C 19.440 18.235,16.137 18.240,12.100 18.240 L 4.760 18.240 4.760 12.000 L 4.760 5.760 6.770 5.760 L 8.780 5.760 10.280 6.760 " stroke="none" fill-rule="evenodd"></path>';

const FolderOpenSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-folder-open';
  const symbolId = 'snack-uikit-snack-icons-' + 'folder-open';
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
export default FolderOpenSpriteSVG;
