// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 18.760 12.000 18.760 L 19.760 18.760 19.760 12.860 L 19.760 6.960 15.987 6.960 L 12.215 6.960 10.897 6.100 L 9.580 5.240 6.910 5.240 L 4.240 5.240 4.240 12.000 M10.482 7.620 L 11.799 8.480 15.020 8.480 L 18.240 8.480 18.240 12.860 L 18.240 17.240 12.000 17.240 L 5.760 17.240 5.760 12.000 L 5.760 6.760 7.462 6.760 L 9.164 6.760 10.482 7.620 M11.240 11.060 L 11.240 12.120 10.120 12.120 L 9.000 12.120 9.000 12.860 L 9.000 13.600 10.120 13.600 L 11.240 13.600 11.240 14.800 L 11.240 16.000 12.000 16.000 L 12.760 16.000 12.760 14.800 L 12.760 13.600 13.880 13.600 L 15.000 13.600 15.000 12.860 L 15.000 12.120 13.880 12.120 L 12.760 12.120 12.760 11.060 L 12.760 10.000 12.000 10.000 L 11.240 10.000 11.240 11.060 " stroke="none" fill-rule="evenodd"></path>';

const FolderAddOutlineSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-folder-add-outline';
  const symbolId = 'snack-uikit-product-icons-' + 'folder-add-outline';
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
export default FolderAddOutlineSpriteSVG;
