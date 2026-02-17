// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.281 C 9.259 3.432,7.316 4.326,5.819 5.820 C 4.475 7.163,3.627 8.847,3.334 10.760 C 3.238 11.390,3.238 12.610,3.334 13.240 C 3.732 15.834,5.204 18.079,7.404 19.445 C 8.922 20.388,10.860 20.865,12.610 20.727 C 14.766 20.557,16.679 19.683,18.181 18.181 C 19.683 16.679,20.557 14.766,20.727 12.610 C 20.941 9.896,19.751 7.077,17.654 5.329 C 15.859 3.834,13.640 3.114,11.340 3.281 M13.232 4.856 C 14.742 5.135,16.048 5.818,17.115 6.885 C 18.203 7.973,18.891 9.313,19.167 10.880 C 19.199 11.063,19.219 11.500,19.219 12.000 C 19.219 12.500,19.199 12.937,19.167 13.120 C 18.892 14.684,18.207 16.020,17.120 17.112 C 16.083 18.154,14.839 18.820,13.360 19.125 C 12.956 19.209,12.791 19.220,12.000 19.220 C 11.209 19.220,11.044 19.209,10.640 19.125 C 9.179 18.824,7.920 18.155,6.909 17.144 C 5.787 16.022,5.119 14.726,4.834 13.120 C 4.763 12.720,4.763 11.280,4.834 10.880 C 4.921 10.392,5.077 9.804,5.218 9.439 C 5.965 7.504,7.504 5.965,9.439 5.218 C 9.961 5.017,10.468 4.898,11.300 4.783 C 11.566 4.746,12.915 4.797,13.232 4.856 M10.240 12.000 C 10.240 14.512,10.255 16.481,10.275 16.473 C 10.333 16.451,16.237 12.021,16.237 12.000 C 16.237 11.979,10.333 7.549,10.275 7.527 C 10.255 7.519,10.240 9.488,10.240 12.000 " stroke="none" fill-rule="evenodd"></path>';

const PlaySpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-play';
  const symbolId = 'snack-uikit-snack-icons-' + 'play';
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
export default PlaySpriteSVG;
