// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.760 12.000 19.760 L 18.760 19.760 18.760 13.980 L 18.760 8.199 16.816 6.220 L 14.872 4.240 10.056 4.240 L 5.240 4.240 5.240 12.000 M13.760 10.700 L 15.500 12.440 14.970 12.970 L 14.440 13.499 13.600 12.660 L 12.760 11.821 12.760 14.030 L 12.760 16.240 12.000 16.240 L 11.240 16.240 11.240 14.030 L 11.240 11.821 10.400 12.660 L 9.560 13.499 9.030 12.970 L 8.500 12.440 10.240 10.700 C 11.197 9.743,11.989 8.960,12.000 8.960 C 12.011 8.960,12.803 9.743,13.760 10.700 " stroke="none" fill-rule="evenodd"></path>';

const FileUploadFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-file-upload-filled';
  const symbolId = 'snack-uikit-product-icons-' + 'file-upload-filled';
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
export default FileUploadFilledSpriteSVG;
