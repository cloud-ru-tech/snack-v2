// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.240 8.120 L 11.240 11.240 9.210 11.240 L 7.180 11.240 9.590 13.650 L 12.000 16.060 14.410 13.650 L 16.820 11.240 14.790 11.240 L 12.760 11.240 12.760 8.120 L 12.760 5.000 12.000 5.000 L 11.240 5.000 11.240 8.120 M3.000 19.000 L 3.000 19.760 12.000 19.760 L 21.000 19.760 21.000 19.000 L 21.000 18.240 12.000 18.240 L 3.000 18.240 3.000 19.000 " stroke="none" fill-rule="evenodd"></path>';

const DownloadSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-download';
  const symbolId = 'snack-uikit-snack-icons-' + 'download';
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
export default DownloadSpriteSVG;
