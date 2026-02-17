// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M8.040 9.122 C 4.707 12.510,1.980 15.297,1.980 15.315 C 1.980 15.332,3.177 16.564,4.640 18.052 L 7.300 20.757 14.150 20.759 L 21.000 20.760 21.000 20.000 L 21.000 19.240 16.967 19.230 L 12.934 19.220 17.246 14.840 L 21.558 10.460 20.605 9.500 C 20.081 8.972,18.422 7.289,16.918 5.760 C 15.414 4.231,14.165 2.976,14.142 2.970 C 14.119 2.965,11.373 5.733,8.040 9.122 M18.401 9.406 L 19.442 10.472 16.404 13.559 C 14.733 15.256,13.355 16.645,13.342 16.644 C 13.304 16.641,8.060 11.311,8.060 11.276 C 8.060 11.258,9.428 9.855,11.099 8.156 L 14.139 5.068 15.750 6.704 C 16.636 7.604,17.829 8.820,18.401 9.406 M9.636 15.044 L 12.279 17.729 11.554 18.484 L 10.828 19.240 9.364 19.237 L 7.900 19.233 6.000 17.296 C 4.955 16.231,4.094 15.343,4.087 15.322 C 4.077 15.291,6.943 12.360,6.982 12.360 C 6.988 12.360,8.182 13.568,9.636 15.044 " stroke="none" fill-rule="evenodd"></path>';

const EraserSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-eraser';
  const symbolId = 'snack-uikit-web-icons-' + 'eraser';
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
export default EraserSpriteSVG;
