// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 19.760 12.000 19.760 L 20.760 19.760 20.760 13.000 L 20.760 6.240 16.480 6.240 L 12.199 6.240 10.700 5.240 L 9.201 4.240 6.220 4.240 L 3.240 4.240 3.240 12.000 M10.280 6.760 L 11.780 7.760 15.510 7.760 L 19.240 7.760 19.240 13.000 L 19.240 18.240 12.000 18.240 L 4.760 18.240 4.760 12.000 L 4.760 5.760 6.770 5.760 L 8.780 5.760 10.280 6.760 " stroke="none" fill-rule="evenodd"></path>';

const FolderSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-folder';
  const symbolId = 'snack-uikit-snack-icons-' + 'folder';
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
export default FolderSpriteSVG;
