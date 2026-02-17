// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.090 6.430 L 4.240 8.697 4.240 14.228 L 4.240 19.760 12.000 19.760 L 19.760 19.760 19.760 14.228 L 19.760 8.696 15.904 6.428 C 13.783 5.181,12.024 4.161,11.994 4.161 C 11.964 4.162,10.207 5.183,8.090 6.430 M15.126 7.710 L 18.239 9.540 18.239 13.890 L 18.240 18.240 12.000 18.240 L 5.760 18.240 5.761 13.890 L 5.761 9.540 8.871 7.711 C 10.581 6.705,11.987 5.881,11.996 5.881 C 12.005 5.880,13.413 6.703,15.126 7.710 " stroke="none" fill-rule="evenodd"></path>';

const HomeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-home';
  const symbolId = 'snack-uikit-snack-icons-' + 'home';
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
export default HomeSpriteSVG;
