// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.701 10.285 C 4.367 10.333,4.062 10.498,3.769 10.787 C 3.359 11.192,3.184 11.720,3.278 12.270 C 3.347 12.671,3.482 12.930,3.776 13.224 C 4.070 13.518,4.329 13.653,4.730 13.722 C 5.056 13.778,5.429 13.726,5.753 13.579 C 6.032 13.452,6.452 13.032,6.579 12.753 C 6.874 12.102,6.768 11.365,6.304 10.851 C 5.887 10.391,5.329 10.193,4.701 10.285 M11.701 10.285 C 11.367 10.333,11.062 10.498,10.769 10.787 C 10.359 11.192,10.184 11.720,10.278 12.270 C 10.347 12.671,10.482 12.930,10.776 13.224 C 11.070 13.518,11.329 13.653,11.730 13.722 C 12.056 13.778,12.429 13.726,12.753 13.579 C 13.032 13.452,13.452 13.032,13.579 12.753 C 13.874 12.102,13.768 11.365,13.304 10.851 C 12.887 10.391,12.329 10.193,11.701 10.285 M18.701 10.285 C 18.367 10.333,18.062 10.498,17.769 10.787 C 17.359 11.192,17.184 11.720,17.278 12.270 C 17.347 12.671,17.482 12.930,17.776 13.224 C 18.070 13.518,18.329 13.653,18.730 13.722 C 19.056 13.778,19.429 13.726,19.753 13.579 C 20.032 13.452,20.452 13.032,20.579 12.753 C 20.874 12.102,20.768 11.365,20.304 10.851 C 19.887 10.391,19.329 10.193,18.701 10.285 " stroke="none" fill-rule="evenodd"></path>';

const MoreSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-more';
  const symbolId = 'snack-uikit-snack-icons-' + 'more';
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
export default MoreSpriteSVG;
