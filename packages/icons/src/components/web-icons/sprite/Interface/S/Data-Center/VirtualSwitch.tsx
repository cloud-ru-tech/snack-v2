// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 9.500 L 19.240 14.240 14.500 14.240 L 9.760 14.240 9.760 13.210 L 9.760 12.180 8.350 13.590 L 6.940 15.000 8.350 16.410 L 9.760 17.820 9.760 16.790 L 9.760 15.760 14.500 15.760 L 19.240 15.760 19.240 17.500 L 19.240 19.240 12.000 19.240 L 4.760 19.240 4.760 14.500 L 4.760 9.760 9.500 9.760 L 14.240 9.760 14.240 10.790 L 14.240 11.820 15.650 10.410 L 17.060 9.000 15.650 7.590 L 14.240 6.180 14.240 7.210 L 14.240 8.240 9.500 8.240 L 4.760 8.240 4.760 6.500 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 9.500 " stroke="none" fill-rule="evenodd"></path>';

const VirtualSwitchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-virtual-switch';
  const symbolId = 'snack-uikit-web-icons-' + 'virtual-switch';
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
export default VirtualSwitchSpriteSVG;
