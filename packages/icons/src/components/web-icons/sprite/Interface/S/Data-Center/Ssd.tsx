// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M8.240 6.000 L 8.240 7.240 6.500 7.240 L 4.760 7.240 4.760 6.000 L 4.760 4.760 6.500 4.760 L 8.240 4.760 8.240 6.000 M14.240 6.000 L 14.240 7.240 12.000 7.240 L 9.760 7.240 9.760 6.000 L 9.760 4.760 12.000 4.760 L 14.240 4.760 14.240 6.000 M19.240 6.000 L 19.240 7.240 17.500 7.240 L 15.760 7.240 15.760 6.000 L 15.760 4.760 17.500 4.760 L 19.240 4.760 19.240 6.000 M19.240 14.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 14.000 L 4.760 8.760 12.000 8.760 L 19.240 8.760 19.240 14.000 M8.240 14.000 L 8.240 17.760 12.000 17.760 L 15.760 17.760 15.760 14.000 L 15.760 10.240 12.000 10.240 L 8.240 10.240 8.240 14.000 M14.240 14.000 L 14.240 16.240 12.000 16.240 L 9.760 16.240 9.760 14.000 L 9.760 11.760 12.000 11.760 L 14.240 11.760 14.240 14.000 " stroke="none" fill-rule="evenodd"></path>';

const SsdSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-ssd';
  const symbolId = 'snack-uikit-web-icons-' + 'ssd';
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
export default SsdSpriteSVG;
