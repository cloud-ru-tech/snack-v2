// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 18.760 12.000 18.760 L 19.760 18.760 19.760 12.860 L 19.760 6.960 15.987 6.960 L 12.215 6.960 10.897 6.100 L 9.580 5.240 6.910 5.240 L 4.240 5.240 4.240 12.000 M10.482 7.620 L 11.799 8.480 15.020 8.480 L 18.240 8.480 18.240 12.860 L 18.240 17.240 12.000 17.240 L 5.760 17.240 5.760 12.000 L 5.760 6.760 7.462 6.760 L 9.164 6.760 10.482 7.620 M9.970 11.410 L 8.480 12.900 9.010 13.430 L 9.539 13.960 10.390 13.110 L 11.240 12.261 11.240 14.350 L 11.240 16.440 12.000 16.440 L 12.760 16.440 12.760 14.350 L 12.760 12.261 13.610 13.110 L 14.461 13.960 14.990 13.430 L 15.520 12.899 14.020 11.400 L 12.521 9.901 12.260 10.160 L 12.000 10.418 11.749 10.169 C 11.611 10.032,11.489 9.920,11.479 9.920 C 11.468 9.920,10.789 10.591,9.970 11.410 " stroke="none" fill-rule="evenodd"></path>';

const FolderUploadOutlineSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-folder-upload-outline';
  const symbolId = 'snack-uikit-product-icons-' + 'folder-upload-outline';
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
export default FolderUploadOutlineSpriteSVG;
