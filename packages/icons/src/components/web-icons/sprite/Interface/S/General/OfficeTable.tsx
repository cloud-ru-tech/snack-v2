// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.240 8.040 L 6.240 11.840 8.740 11.840 L 11.240 11.840 11.240 12.540 L 11.240 13.240 7.620 13.240 L 4.000 13.240 4.000 14.000 L 4.000 14.760 4.620 14.760 L 5.240 14.760 5.240 17.260 L 5.240 19.760 8.000 19.760 L 10.760 19.760 10.760 18.160 L 10.760 16.560 10.000 16.560 L 9.240 16.560 9.240 17.400 L 9.240 18.240 8.000 18.240 L 6.760 18.240 6.760 16.500 L 6.760 14.760 12.000 14.760 L 17.240 14.760 17.240 17.260 L 17.240 19.760 18.000 19.760 L 18.760 19.760 18.760 17.260 L 18.760 14.760 19.380 14.760 L 20.000 14.760 20.000 14.000 L 20.000 13.240 16.380 13.240 L 12.760 13.240 12.760 12.540 L 12.760 11.840 15.260 11.840 L 17.760 11.840 17.760 8.040 L 17.760 4.240 12.000 4.240 L 6.240 4.240 6.240 8.040 M16.240 8.040 L 16.240 10.320 12.000 10.320 L 7.760 10.320 7.760 8.040 L 7.760 5.760 12.000 5.760 L 16.240 5.760 16.240 8.040 " stroke="none" fill-rule="evenodd"></path>';

const OfficeTableSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-office-table';
  const symbolId = 'snack-uikit-web-icons-' + 'office-table';
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
export default OfficeTableSpriteSVG;
