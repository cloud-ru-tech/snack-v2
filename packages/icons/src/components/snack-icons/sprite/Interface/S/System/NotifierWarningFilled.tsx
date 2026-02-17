// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.970 5.970 L 3.240 8.700 3.240 12.000 L 3.240 15.300 5.970 18.030 L 8.700 20.760 12.000 20.760 L 15.300 20.760 18.030 18.030 L 20.760 15.300 20.760 12.000 L 20.760 8.700 18.030 5.970 L 15.300 3.240 12.000 3.240 L 8.700 3.240 5.970 5.970 M13.480 9.500 L 13.480 13.760 12.000 13.760 L 10.520 13.760 10.520 9.500 L 10.520 5.240 12.000 5.240 L 13.480 5.240 13.480 9.500 M13.480 17.260 L 13.480 18.760 12.000 18.760 L 10.520 18.760 10.520 17.260 L 10.520 15.760 12.000 15.760 L 13.480 15.760 13.480 17.260 " stroke="none" fill-rule="evenodd"></path>';

const NotifierWarningFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-notifier-warning-filled';
  const symbolId = 'snack-uikit-snack-icons-' + 'notifier-warning-filled';
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
export default NotifierWarningFilledSpriteSVG;
