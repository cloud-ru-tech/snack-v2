// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.970 3.970 L 3.240 4.701 3.240 8.000 L 3.240 11.298 3.589 11.649 L 3.938 12.000 3.589 12.351 L 3.240 12.702 3.240 16.001 L 3.240 19.301 3.970 20.030 L 4.701 20.760 12.001 20.760 L 19.301 20.760 20.030 20.030 L 20.760 19.299 20.760 16.000 L 20.760 12.702 20.411 12.351 L 20.062 12.000 20.411 11.649 L 20.760 11.298 20.760 7.999 L 20.760 4.699 20.030 3.970 L 19.299 3.240 11.999 3.240 L 4.699 3.240 3.970 3.970 M18.969 5.029 L 19.240 5.298 19.240 7.998 L 19.240 10.698 18.971 10.969 L 18.702 11.240 12.002 11.240 L 5.302 11.240 5.031 10.971 L 4.760 10.702 4.760 8.002 L 4.760 5.302 5.029 5.031 L 5.298 4.760 11.998 4.760 L 18.698 4.760 18.969 5.029 M6.240 8.000 L 6.240 10.000 7.000 10.000 L 7.760 10.000 7.760 8.000 L 7.760 6.000 7.000 6.000 L 6.240 6.000 6.240 8.000 M9.240 8.000 L 9.240 10.000 10.000 10.000 L 10.760 10.000 10.760 8.000 L 10.760 6.000 10.000 6.000 L 9.240 6.000 9.240 8.000 M13.240 8.000 L 13.240 10.000 14.000 10.000 L 14.760 10.000 14.760 8.000 L 14.760 6.000 14.000 6.000 L 13.240 6.000 13.240 8.000 M16.240 8.000 L 16.240 10.000 17.000 10.000 L 17.760 10.000 17.760 8.000 L 17.760 6.000 17.000 6.000 L 16.240 6.000 16.240 8.000 M18.969 13.029 L 19.240 13.298 19.240 15.998 L 19.240 18.698 18.971 18.969 L 18.702 19.240 12.002 19.240 L 5.302 19.240 5.031 18.971 L 4.760 18.702 4.760 16.002 L 4.760 13.302 5.029 13.031 L 5.298 12.760 11.998 12.760 L 18.698 12.760 18.969 13.029 M6.240 16.000 L 6.240 18.000 7.000 18.000 L 7.760 18.000 7.760 16.000 L 7.760 14.000 7.000 14.000 L 6.240 14.000 6.240 16.000 M9.240 16.000 L 9.240 18.000 10.000 18.000 L 10.760 18.000 10.760 16.000 L 10.760 14.000 10.000 14.000 L 9.240 14.000 9.240 16.000 M13.240 16.000 L 13.240 18.000 14.000 18.000 L 14.760 18.000 14.760 16.000 L 14.760 14.000 14.000 14.000 L 13.240 14.000 13.240 16.000 M16.240 16.000 L 16.240 18.000 17.000 18.000 L 17.760 18.000 17.760 16.000 L 17.760 14.000 17.000 14.000 L 16.240 14.000 16.240 16.000 " stroke="none" fill-rule="evenodd"></path>';

const PhysicalStorageSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-physical-storage';
  const symbolId = 'snack-uikit-web-icons-' + 'physical-storage';
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
export default PhysicalStorageSpriteSVG;
