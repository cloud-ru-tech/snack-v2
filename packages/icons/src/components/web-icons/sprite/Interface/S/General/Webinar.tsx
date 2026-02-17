// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 10.000 L 3.240 16.760 7.240 16.760 L 11.240 16.760 11.240 18.000 L 11.240 19.240 9.120 19.240 L 7.000 19.240 7.000 20.000 L 7.000 20.760 12.000 20.760 L 17.000 20.760 17.000 20.000 L 17.000 19.240 14.880 19.240 L 12.760 19.240 12.760 18.000 L 12.760 16.760 16.760 16.760 L 20.760 16.760 20.760 10.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 10.000 M19.240 10.000 L 19.240 15.240 12.000 15.240 L 4.760 15.240 4.760 10.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 10.000 M10.240 10.005 L 10.240 13.409 10.350 13.338 C 11.258 12.746,15.320 10.021,15.319 10.003 C 15.318 9.991,14.175 9.219,12.779 8.290 L 10.240 6.600 10.240 10.005 " stroke="none" fill-rule="evenodd"></path>';

const WebinarSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-webinar';
  const symbolId = 'snack-uikit-web-icons-' + 'webinar';
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
export default WebinarSpriteSVG;
