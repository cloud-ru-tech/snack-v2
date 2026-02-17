// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 18.760 12.000 18.760 L 19.760 18.760 19.760 12.860 L 19.760 6.960 15.987 6.960 L 12.215 6.960 10.897 6.100 L 9.580 5.240 6.910 5.240 L 4.240 5.240 4.240 12.000 M13.380 10.727 C 14.128 11.501,14.915 12.318,15.130 12.543 L 15.519 12.951 14.976 13.463 L 14.433 13.975 13.598 13.118 L 12.764 12.260 12.762 13.950 L 12.760 15.640 12.000 15.640 L 11.240 15.640 11.238 13.950 L 11.236 12.260 10.402 13.118 L 9.567 13.975 9.024 13.463 L 8.481 12.951 8.850 12.562 C 9.791 11.574,11.980 9.320,11.999 9.320 C 12.011 9.320,12.633 9.953,13.380 10.727 " stroke="none" fill-rule="evenodd"></path>';

const FolderUploadFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-folder-upload-filled';
  const symbolId = 'snack-uikit-product-icons-' + 'folder-upload-filled';
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
export default FolderUploadFilledSpriteSVG;
