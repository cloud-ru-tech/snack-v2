// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.000 6.000 19.000 L 6.760 19.000 6.760 15.880 L 6.760 12.760 10.000 12.760 L 13.240 12.760 13.240 15.880 L 13.240 19.000 14.000 19.000 L 14.760 19.000 14.760 12.000 L 14.760 5.000 14.000 5.000 L 13.240 5.000 13.240 8.120 L 13.240 11.240 10.000 11.240 L 6.760 11.240 6.760 8.120 L 6.760 5.000 6.000 5.000 L 5.240 5.000 5.240 12.000 M16.240 13.530 C 16.240 14.085,16.258 14.645,16.279 14.773 C 16.382 15.402,16.818 15.926,17.423 16.146 C 17.663 16.233,17.744 16.240,18.462 16.240 L 19.240 16.240 19.240 17.120 L 19.240 18.000 20.000 18.000 L 20.760 18.000 20.760 15.260 L 20.760 12.520 20.000 12.520 L 19.240 12.520 19.240 13.643 L 19.240 14.765 18.557 14.753 C 17.935 14.741,17.868 14.733,17.817 14.662 C 17.771 14.600,17.760 14.380,17.760 13.552 L 17.760 12.520 17.000 12.520 L 16.240 12.520 16.240 13.530 " stroke="none" fill-rule="evenodd"></path>';

const Heading4SpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-heading4';
  const symbolId = 'snack-uikit-snack-icons-' + 'heading4';
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
export default Heading4SpriteSVG;
