// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.980 6.440 L 6.461 6.960 8.700 9.200 L 10.940 11.440 8.710 13.670 L 6.480 15.901 7.010 16.430 L 7.541 16.960 10.300 14.200 L 13.060 11.440 10.300 8.680 C 8.782 7.162,7.531 5.920,7.520 5.920 C 7.508 5.920,7.265 6.154,6.980 6.440 M16.240 11.460 L 16.240 17.000 17.000 17.000 L 17.760 17.000 17.760 11.460 L 17.760 5.920 17.000 5.920 L 16.240 5.920 16.240 11.460 " stroke="none" fill-rule="evenodd"></path>';

const VerticalMenuRightCloseSpriteSVG = forwardRef(
  ({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
    props.width = undefined;
    props.height = undefined;
    const testId = '-vertical-menu-right-close';
    const symbolId = 'snack-uikit-product-icons-' + 'vertical-menu-right-close';
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
  },
);
export default VerticalMenuRightCloseSpriteSVG;
