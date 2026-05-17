// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.000 6.000 19.000 L 6.760 19.000 6.760 15.880 L 6.760 12.760 10.000 12.760 L 13.240 12.760 13.240 15.880 L 13.240 19.000 14.000 19.000 L 14.760 19.000 14.760 12.000 L 14.760 5.000 14.000 5.000 L 13.240 5.000 13.240 8.120 L 13.240 11.240 10.000 11.240 L 6.760 11.240 6.760 8.120 L 6.760 5.000 6.000 5.000 L 5.240 5.000 5.240 12.000 M19.000 12.287 C 18.923 12.309,18.801 12.371,18.730 12.426 C 18.562 12.553,16.800 14.156,16.800 14.181 C 16.800 14.197,17.483 14.964,17.720 15.214 C 17.787 15.285,17.802 15.276,18.145 14.965 L 18.500 14.642 18.510 16.321 L 18.521 18.000 19.280 18.000 L 20.040 18.000 20.040 15.495 C 20.040 13.628,20.027 12.947,19.991 12.825 C 19.917 12.576,19.659 12.339,19.404 12.285 C 19.168 12.234,19.187 12.234,19.000 12.287 " stroke="none" fill-rule="evenodd"></path>';

const Heading1SpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-heading1';
  const symbolId = 'snack-uikit-snack-icons-' + 'heading1';
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
export default Heading1SpriteSVG;
