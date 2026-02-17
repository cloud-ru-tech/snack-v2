// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.760 12.000 19.760 L 18.760 19.760 18.760 13.980 L 18.760 8.199 16.816 6.220 L 14.872 4.240 10.056 4.240 L 5.240 4.240 5.240 12.000 M12.760 11.000 L 12.760 12.240 14.000 12.240 L 15.240 12.240 15.240 13.000 L 15.240 13.760 14.000 13.760 L 12.760 13.760 12.760 15.000 L 12.760 16.240 12.000 16.240 L 11.240 16.240 11.240 15.000 L 11.240 13.760 10.000 13.760 L 8.760 13.760 8.760 13.000 L 8.760 12.240 10.000 12.240 L 11.240 12.240 11.240 11.000 L 11.240 9.760 12.000 9.760 L 12.760 9.760 12.760 11.000 " stroke="none" fill-rule="evenodd"></path>';

const FileAddFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-file-add-filled';
  const symbolId = 'snack-uikit-product-icons-' + 'file-add-filled';
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
export default FileAddFilledSpriteSVG;
