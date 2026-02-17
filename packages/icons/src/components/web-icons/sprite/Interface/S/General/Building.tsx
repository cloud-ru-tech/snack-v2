// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.240 6.740 L 11.240 10.240 7.240 10.240 L 3.240 10.240 3.240 15.500 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 16.000 3.240 L 11.240 3.240 11.240 6.740 M19.240 12.000 L 19.240 19.240 16.000 19.240 L 12.760 19.240 12.760 17.240 L 12.760 15.240 10.000 15.240 L 7.240 15.240 7.240 17.240 L 7.240 19.240 6.000 19.240 L 4.760 19.240 4.760 15.500 L 4.760 11.760 8.760 11.760 L 12.760 11.760 12.760 8.260 L 12.760 4.760 16.000 4.760 L 19.240 4.760 19.240 12.000 M15.249 7.750 L 15.260 8.500 16.000 8.500 L 16.740 8.500 16.751 7.750 L 16.762 7.000 16.000 7.000 L 15.238 7.000 15.249 7.750 M15.249 11.750 L 15.260 12.500 16.000 12.500 L 16.740 12.500 16.751 11.750 L 16.762 11.000 16.000 11.000 L 15.238 11.000 15.249 11.750 M15.249 15.750 L 15.260 16.500 16.000 16.500 L 16.740 16.500 16.751 15.750 L 16.762 15.000 16.000 15.000 L 15.238 15.000 15.249 15.750 M11.240 18.000 L 11.240 19.240 10.000 19.240 L 8.760 19.240 8.760 18.000 L 8.760 16.760 10.000 16.760 L 11.240 16.760 11.240 18.000 " stroke="none" fill-rule="evenodd"></path>';

const BuildingSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-building';
  const symbolId = 'snack-uikit-web-icons-' + 'building';
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
export default BuildingSpriteSVG;
