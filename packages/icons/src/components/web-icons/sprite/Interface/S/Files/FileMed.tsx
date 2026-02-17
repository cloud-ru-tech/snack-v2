// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 20.760 12.000 20.760 L 19.760 20.760 19.760 12.000 L 19.760 3.240 12.000 3.240 L 4.240 3.240 4.240 12.000 M18.240 12.000 L 18.240 19.240 12.000 19.240 L 5.760 19.240 5.760 12.000 L 5.760 4.760 12.000 4.760 L 18.240 4.760 18.240 12.000 M9.240 7.620 L 9.240 8.240 8.620 8.240 L 8.000 8.240 8.000 9.000 L 8.000 9.760 8.620 9.760 L 9.240 9.760 9.240 10.380 L 9.240 11.000 10.000 11.000 L 10.760 11.000 10.760 10.380 L 10.760 9.760 11.380 9.760 L 12.000 9.760 12.000 9.000 L 12.000 8.240 11.380 8.240 L 10.760 8.240 10.760 7.620 L 10.760 7.000 10.000 7.000 L 9.240 7.000 9.240 7.620 M8.000 13.000 L 8.000 13.760 12.000 13.760 L 16.000 13.760 16.000 13.000 L 16.000 12.240 12.000 12.240 L 8.000 12.240 8.000 13.000 M8.000 16.000 L 8.000 16.760 12.000 16.760 L 16.000 16.760 16.000 16.000 L 16.000 15.240 12.000 15.240 L 8.000 15.240 8.000 16.000 " stroke="none" fill-rule="evenodd"></path>';

const FileMedSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-file-med';
  const symbolId = 'snack-uikit-web-icons-' + 'file-med';
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
export default FileMedSpriteSVG;
