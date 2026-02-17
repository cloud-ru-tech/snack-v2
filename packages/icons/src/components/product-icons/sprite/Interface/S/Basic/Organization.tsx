// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.240 4.120 L 11.240 5.240 9.240 5.240 L 7.240 5.240 7.240 6.740 L 7.240 8.240 5.240 8.240 L 3.240 8.240 3.240 14.500 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 14.500 L 20.760 8.240 18.760 8.240 L 16.760 8.240 16.760 6.740 L 16.760 5.240 14.760 5.240 L 12.760 5.240 12.760 4.120 L 12.760 3.000 12.000 3.000 L 11.240 3.000 11.240 4.120 M15.240 7.500 L 15.240 8.240 12.000 8.240 L 8.760 8.240 8.760 7.500 L 8.760 6.760 12.000 6.760 L 15.240 6.760 15.240 7.500 M19.240 14.500 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 14.500 L 4.760 9.760 12.000 9.760 L 19.240 9.760 19.240 14.500 M7.249 12.510 L 7.260 13.500 8.000 13.500 L 8.740 13.500 8.751 12.510 L 8.761 11.520 8.000 11.520 L 7.239 11.520 7.249 12.510 M11.249 12.510 L 11.260 13.500 12.000 13.500 L 12.740 13.500 12.751 12.510 L 12.761 11.520 12.000 11.520 L 11.239 11.520 11.249 12.510 M15.249 12.510 L 15.260 13.500 16.000 13.500 L 16.740 13.500 16.751 12.510 L 16.761 11.520 16.000 11.520 L 15.239 11.520 15.249 12.510 M7.249 16.510 L 7.260 17.500 8.000 17.500 L 8.740 17.500 8.751 16.510 L 8.761 15.520 8.000 15.520 L 7.239 15.520 7.249 16.510 M11.249 16.510 L 11.260 17.500 12.000 17.500 L 12.740 17.500 12.751 16.510 L 12.761 15.520 12.000 15.520 L 11.239 15.520 11.249 16.510 M15.249 16.510 L 15.260 17.500 16.000 17.500 L 16.740 17.500 16.751 16.510 L 16.761 15.520 16.000 15.520 L 15.239 15.520 15.249 16.510 " stroke="none" fill-rule="evenodd"></path>';

const OrganizationSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-organization';
  const symbolId = 'snack-uikit-product-icons-' + 'organization';
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
export default OrganizationSpriteSVG;
