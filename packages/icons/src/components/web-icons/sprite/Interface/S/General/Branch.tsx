// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M9.240 6.000 L 9.240 8.760 10.240 8.760 L 11.240 8.760 11.240 10.000 L 11.240 11.240 7.740 11.240 L 4.240 11.240 4.240 13.240 L 4.240 15.240 3.240 15.240 L 2.240 15.240 2.240 18.000 L 2.240 20.760 5.000 20.760 L 7.760 20.760 7.760 18.000 L 7.760 15.240 6.760 15.240 L 5.760 15.240 5.760 14.000 L 5.760 12.760 8.500 12.760 L 11.240 12.760 11.240 14.000 L 11.240 15.240 10.240 15.240 L 9.240 15.240 9.240 18.000 L 9.240 20.760 12.000 20.760 L 14.760 20.760 14.760 18.000 L 14.760 15.240 13.760 15.240 L 12.760 15.240 12.760 14.000 L 12.760 12.760 15.500 12.760 L 18.240 12.760 18.240 14.000 L 18.240 15.240 17.240 15.240 L 16.240 15.240 16.240 18.000 L 16.240 20.760 19.000 20.760 L 21.760 20.760 21.760 18.000 L 21.760 15.240 20.760 15.240 L 19.760 15.240 19.760 13.240 L 19.760 11.240 16.260 11.240 L 12.760 11.240 12.760 10.000 L 12.760 8.760 13.760 8.760 L 14.760 8.760 14.760 6.000 L 14.760 3.240 12.000 3.240 L 9.240 3.240 9.240 6.000 M13.240 6.000 L 13.240 7.240 12.000 7.240 L 10.760 7.240 10.760 6.000 L 10.760 4.760 12.000 4.760 L 13.240 4.760 13.240 6.000 M6.240 18.000 L 6.240 19.240 5.000 19.240 L 3.760 19.240 3.760 18.000 L 3.760 16.760 5.000 16.760 L 6.240 16.760 6.240 18.000 M13.240 18.000 L 13.240 19.240 12.000 19.240 L 10.760 19.240 10.760 18.000 L 10.760 16.760 12.000 16.760 L 13.240 16.760 13.240 18.000 M20.240 18.000 L 20.240 19.240 19.000 19.240 L 17.760 19.240 17.760 18.000 L 17.760 16.760 19.000 16.760 L 20.240 16.760 20.240 18.000 " stroke="none" fill-rule="evenodd"></path>';

const BranchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-branch';
  const symbolId = 'snack-uikit-web-icons-' + 'branch';
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
export default BranchSpriteSVG;
