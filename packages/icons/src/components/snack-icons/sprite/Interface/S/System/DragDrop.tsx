// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.701 4.285 C 8.367 4.333,8.062 4.498,7.769 4.787 C 7.359 5.192,7.184 5.720,7.278 6.270 C 7.347 6.671,7.482 6.930,7.776 7.224 C 8.070 7.518,8.329 7.653,8.730 7.722 C 9.056 7.778,9.429 7.726,9.753 7.579 C 10.032 7.452,10.452 7.032,10.579 6.753 C 10.874 6.102,10.768 5.365,10.304 4.851 C 9.887 4.391,9.329 4.193,8.701 4.285 M14.701 4.285 C 14.367 4.333,14.062 4.498,13.769 4.787 C 13.359 5.192,13.184 5.720,13.278 6.270 C 13.347 6.671,13.482 6.930,13.776 7.224 C 14.070 7.518,14.329 7.653,14.730 7.722 C 15.056 7.778,15.429 7.726,15.753 7.579 C 16.032 7.452,16.452 7.032,16.579 6.753 C 16.874 6.102,16.768 5.365,16.304 4.851 C 15.887 4.391,15.329 4.193,14.701 4.285 M8.701 10.285 C 8.367 10.333,8.062 10.498,7.769 10.787 C 7.359 11.192,7.184 11.720,7.278 12.270 C 7.347 12.671,7.482 12.930,7.776 13.224 C 8.070 13.518,8.329 13.653,8.730 13.722 C 9.056 13.778,9.429 13.726,9.753 13.579 C 10.032 13.452,10.452 13.032,10.579 12.753 C 10.874 12.102,10.768 11.365,10.304 10.851 C 9.887 10.391,9.329 10.193,8.701 10.285 M14.701 10.285 C 14.367 10.333,14.062 10.498,13.769 10.787 C 13.359 11.192,13.184 11.720,13.278 12.270 C 13.347 12.671,13.482 12.930,13.776 13.224 C 14.070 13.518,14.329 13.653,14.730 13.722 C 15.056 13.778,15.429 13.726,15.753 13.579 C 16.032 13.452,16.452 13.032,16.579 12.753 C 16.874 12.102,16.768 11.365,16.304 10.851 C 15.887 10.391,15.329 10.193,14.701 10.285 M8.701 16.285 C 8.367 16.333,8.062 16.498,7.769 16.787 C 7.359 17.192,7.184 17.720,7.278 18.270 C 7.347 18.671,7.482 18.930,7.776 19.224 C 8.070 19.518,8.329 19.653,8.730 19.722 C 9.056 19.778,9.429 19.726,9.753 19.579 C 10.032 19.452,10.452 19.032,10.579 18.753 C 10.874 18.102,10.768 17.365,10.304 16.851 C 9.887 16.391,9.329 16.193,8.701 16.285 M14.701 16.285 C 14.367 16.333,14.062 16.498,13.769 16.787 C 13.359 17.192,13.184 17.720,13.278 18.270 C 13.347 18.671,13.482 18.930,13.776 19.224 C 14.070 19.518,14.329 19.653,14.730 19.722 C 15.056 19.778,15.429 19.726,15.753 19.579 C 16.032 19.452,16.452 19.032,16.579 18.753 C 16.874 18.102,16.768 17.365,16.304 16.851 C 15.887 16.391,15.329 16.193,14.701 16.285 " stroke="none" fill-rule="evenodd"></path>';

const DragDropSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-drag-drop';
  const symbolId = 'snack-uikit-snack-icons-' + 'drag-drop';
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
export default DragDropSpriteSVG;
