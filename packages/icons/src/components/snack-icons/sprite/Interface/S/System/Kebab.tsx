// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.701 3.285 C 11.367 3.333,11.062 3.498,10.769 3.787 C 10.359 4.192,10.184 4.720,10.278 5.270 C 10.347 5.671,10.482 5.930,10.776 6.224 C 11.070 6.518,11.329 6.653,11.730 6.722 C 12.056 6.778,12.429 6.726,12.753 6.579 C 13.032 6.452,13.452 6.032,13.579 5.753 C 13.874 5.102,13.768 4.365,13.304 3.851 C 12.887 3.391,12.329 3.193,11.701 3.285 M11.701 10.285 C 11.367 10.333,11.062 10.498,10.769 10.787 C 10.359 11.192,10.184 11.720,10.278 12.270 C 10.347 12.671,10.482 12.930,10.776 13.224 C 11.070 13.518,11.329 13.653,11.730 13.722 C 12.056 13.778,12.429 13.726,12.753 13.579 C 13.032 13.452,13.452 13.032,13.579 12.753 C 13.874 12.102,13.768 11.365,13.304 10.851 C 12.887 10.391,12.329 10.193,11.701 10.285 M11.701 17.285 C 11.367 17.333,11.062 17.498,10.769 17.787 C 10.359 18.192,10.184 18.720,10.278 19.270 C 10.347 19.671,10.482 19.930,10.776 20.224 C 11.070 20.518,11.329 20.653,11.730 20.722 C 12.056 20.778,12.429 20.726,12.753 20.579 C 13.032 20.452,13.452 20.032,13.579 19.753 C 13.874 19.102,13.768 18.365,13.304 17.851 C 12.887 17.391,12.329 17.193,11.701 17.285 " stroke="none" fill-rule="evenodd"></path>';

const KebabSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-kebab';
  const symbolId = 'snack-uikit-snack-icons-' + 'kebab';
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
export default KebabSpriteSVG;
