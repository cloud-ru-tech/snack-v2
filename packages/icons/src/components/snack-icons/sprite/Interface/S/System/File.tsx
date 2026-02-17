// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 20.760 12.000 20.760 L 19.760 20.760 19.760 14.230 L 19.760 7.700 17.530 5.470 L 15.300 3.240 9.770 3.240 L 4.240 3.240 4.240 12.000 M16.470 6.530 L 18.240 8.300 18.240 13.770 L 18.240 19.240 12.000 19.240 L 5.760 19.240 5.760 12.000 L 5.760 4.760 10.230 4.760 L 14.700 4.760 16.470 6.530 M8.000 8.000 L 8.000 8.760 9.000 8.760 L 10.000 8.760 10.000 8.000 L 10.000 7.240 9.000 7.240 L 8.000 7.240 8.000 8.000 M8.000 12.000 L 8.000 12.760 12.000 12.760 L 16.000 12.760 16.000 12.000 L 16.000 11.240 12.000 11.240 L 8.000 11.240 8.000 12.000 M8.000 16.000 L 8.000 16.760 12.000 16.760 L 16.000 16.760 16.000 16.000 L 16.000 15.240 12.000 15.240 L 8.000 15.240 8.000 16.000 " stroke="none" fill-rule="evenodd"></path>';

const FileSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-file';
  const symbolId = 'snack-uikit-snack-icons-' + 'file';
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
export default FileSpriteSVG;
