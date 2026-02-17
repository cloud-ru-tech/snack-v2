// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 12.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 12.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 12.000 M6.240 12.000 L 6.240 17.000 6.997 17.000 L 7.754 17.000 7.770 15.670 C 7.785 14.468,7.795 14.308,7.873 14.010 C 8.270 12.488,9.511 11.254,11.030 10.870 C 11.532 10.743,12.468 10.743,12.970 10.870 C 14.486 11.253,15.733 12.493,16.127 14.010 C 16.204 14.307,16.214 14.473,16.230 15.670 L 16.247 17.000 17.003 17.000 L 17.760 17.000 17.760 12.000 L 17.760 7.000 17.000 7.000 L 16.240 7.000 16.240 9.063 L 16.240 11.125 15.918 10.833 C 15.034 10.031,13.993 9.510,12.926 9.336 C 12.430 9.255,11.570 9.255,11.074 9.336 C 10.007 9.510,8.966 10.031,8.082 10.833 L 7.760 11.125 7.760 9.063 L 7.760 7.000 7.000 7.000 L 6.240 7.000 6.240 12.000 " stroke="none" fill-rule="evenodd"></path>';

const BridgeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bridge';
  const symbolId = 'snack-uikit-web-icons-' + 'bridge';
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
export default BridgeSpriteSVG;
