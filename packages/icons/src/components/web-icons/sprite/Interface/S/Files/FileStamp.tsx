// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 20.760 7.620 20.760 L 11.000 20.760 11.000 20.000 L 11.000 19.240 8.380 19.240 L 5.760 19.240 5.760 12.000 L 5.760 4.760 10.230 4.760 L 14.700 4.760 16.470 6.530 L 18.240 8.300 18.240 8.650 L 18.240 9.000 19.000 9.000 L 19.760 9.000 19.760 8.350 L 19.760 7.700 17.530 5.470 L 15.300 3.240 9.770 3.240 L 4.240 3.240 4.240 12.000 M8.000 8.000 L 8.000 8.760 11.000 8.760 L 14.000 8.760 14.000 8.000 L 14.000 7.240 11.000 7.240 L 8.000 7.240 8.000 8.000 M14.873 11.574 L 14.206 12.907 14.622 14.564 C 14.851 15.475,15.038 16.224,15.039 16.230 C 15.039 16.235,14.963 16.240,14.870 16.240 C 14.702 16.240,14.688 16.252,13.970 16.970 L 13.240 17.701 13.240 19.230 L 13.240 20.760 17.000 20.760 L 20.760 20.760 20.760 19.230 L 20.760 17.699 20.030 16.970 C 19.312 16.253,19.296 16.240,19.130 16.240 C 19.036 16.240,18.961 16.235,18.961 16.230 C 18.962 16.224,19.149 15.475,19.378 14.564 L 19.794 12.907 19.127 11.574 L 18.461 10.240 17.000 10.240 L 15.539 10.240 14.873 11.574 M8.000 12.000 L 8.000 12.761 9.750 12.750 L 11.500 12.740 11.500 12.000 L 11.500 11.260 9.750 11.250 L 8.000 11.239 8.000 12.000 M17.874 12.426 L 18.206 13.093 17.814 14.666 L 17.421 16.240 17.000 16.240 L 16.579 16.240 16.186 14.666 L 15.794 13.093 16.126 12.426 L 16.459 11.760 17.000 11.760 L 17.541 11.760 17.874 12.426 M8.000 16.000 L 8.000 16.760 9.000 16.760 L 10.000 16.760 10.000 16.000 L 10.000 15.240 9.000 15.240 L 8.000 15.240 8.000 16.000 M18.969 18.029 L 19.240 18.298 19.240 18.769 L 19.240 19.240 17.000 19.240 L 14.760 19.240 14.760 18.771 L 14.760 18.302 15.029 18.031 L 15.298 17.760 16.998 17.760 L 18.698 17.760 18.969 18.029 " stroke="none" fill-rule="evenodd"></path>';

const FileStampSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-file-stamp';
  const symbolId = 'snack-uikit-web-icons-' + 'file-stamp';
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
export default FileStampSpriteSVG;
