// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 17.760 12.000 17.760 L 18.760 17.760 18.760 12.000 L 18.760 6.240 12.000 6.240 L 5.240 6.240 5.240 12.000 M9.240 12.000 L 9.240 16.240 8.000 16.240 L 6.760 16.240 6.760 12.000 L 6.760 7.760 8.000 7.760 L 9.240 7.760 9.240 12.000 M13.240 12.000 L 13.240 16.240 12.000 16.240 L 10.760 16.240 10.760 12.000 L 10.760 7.760 12.000 7.760 L 13.240 7.760 13.240 12.000 M17.240 12.000 L 17.240 16.240 16.000 16.240 L 14.760 16.240 14.760 12.000 L 14.760 7.760 16.000 7.760 L 17.240 7.760 17.240 12.000 " stroke="none" fill-rule="evenodd"></path>';

const TableSettingsSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-table-settings';
  const symbolId = 'snack-uikit-product-icons-' + 'table-settings';
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
export default TableSettingsSpriteSVG;
