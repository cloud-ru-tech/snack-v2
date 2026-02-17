// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.130 9.810 L 3.760 16.180 3.760 18.210 L 3.760 20.240 5.790 20.240 L 7.820 20.240 14.190 13.870 L 20.560 7.500 18.530 5.470 L 16.500 3.440 10.130 9.810 M12.810 13.130 L 7.180 18.760 6.210 18.760 L 5.240 18.760 5.240 17.790 L 5.240 16.820 10.870 11.190 L 16.500 5.560 17.470 6.530 L 18.440 7.500 12.810 13.130 M11.480 19.500 L 11.480 20.240 15.500 20.240 L 19.520 20.240 19.520 19.500 L 19.520 18.760 15.500 18.760 L 11.480 18.760 11.480 19.500 " stroke="none" fill-rule="evenodd"></path>';

const EditSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-edit';
  const symbolId = 'snack-uikit-product-icons-' + 'edit';
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
export default EditSpriteSVG;
