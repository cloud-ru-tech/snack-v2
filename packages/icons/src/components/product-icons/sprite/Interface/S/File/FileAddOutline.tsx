// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.760 12.000 19.760 L 18.760 19.760 18.760 13.980 L 18.760 8.199 16.816 6.220 L 14.872 4.240 10.056 4.240 L 5.240 4.240 5.240 12.000 M15.753 7.276 L 17.240 8.793 17.240 13.516 L 17.240 18.240 12.000 18.240 L 6.760 18.240 6.760 12.000 L 6.760 5.760 10.513 5.760 L 14.266 5.760 15.753 7.276 M11.240 11.060 L 11.240 12.120 10.120 12.120 L 9.000 12.120 9.000 12.880 L 9.000 13.640 10.120 13.640 L 11.240 13.640 11.240 14.820 L 11.240 16.000 12.000 16.000 L 12.760 16.000 12.760 14.820 L 12.760 13.640 13.880 13.640 L 15.000 13.640 15.000 12.880 L 15.000 12.120 13.880 12.120 L 12.760 12.120 12.760 11.060 L 12.760 10.000 12.000 10.000 L 11.240 10.000 11.240 11.060 " stroke="none" fill-rule="evenodd"></path>';

const FileAddOutlineSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-file-add-outline';
  const symbolId = 'snack-uikit-product-icons-' + 'file-add-outline';
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
export default FileAddOutlineSpriteSVG;
