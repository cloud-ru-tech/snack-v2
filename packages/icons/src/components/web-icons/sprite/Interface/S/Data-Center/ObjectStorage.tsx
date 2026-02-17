// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 12.000 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 12.000 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 12.000 M10.240 9.000 L 10.240 10.760 12.000 10.760 L 13.760 10.760 13.760 9.000 L 13.760 7.240 12.000 7.240 L 10.240 7.240 10.240 9.000 M15.203 12.864 C 14.601 13.025,14.066 13.547,13.879 14.154 C 13.780 14.473,13.773 15.016,13.864 15.323 C 14.054 15.960,14.495 16.432,15.098 16.639 C 16.267 17.042,17.518 16.315,17.721 15.116 C 17.896 14.078,17.289 13.119,16.292 12.860 C 16.006 12.785,15.488 12.787,15.203 12.864 M7.808 14.917 C 7.165 15.905,6.640 16.724,6.640 16.737 C 6.640 16.750,7.702 16.760,9.000 16.760 C 10.298 16.760,11.360 16.750,11.360 16.737 C 11.360 16.697,9.026 13.120,9.000 13.120 C 8.986 13.120,8.450 13.929,7.808 14.917 " stroke="none" fill-rule="evenodd"></path>';

const ObjectStorageSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-object-storage';
  const symbolId = 'snack-uikit-web-icons-' + 'object-storage';
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
export default ObjectStorageSpriteSVG;
