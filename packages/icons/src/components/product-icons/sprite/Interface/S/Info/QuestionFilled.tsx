// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.393 4.282 C 9.868 4.392,8.294 5.022,7.100 6.000 C 6.718 6.314,6.062 6.996,5.793 7.361 C 4.675 8.873,4.124 10.764,4.273 12.570 C 4.333 13.297,4.437 13.803,4.666 14.480 C 5.217 16.116,6.312 17.532,7.767 18.490 C 8.507 18.977,9.579 19.418,10.460 19.598 C 11.428 19.795,12.572 19.795,13.540 19.598 C 14.702 19.361,15.969 18.762,16.881 18.019 C 17.248 17.719,17.945 16.995,18.208 16.639 C 19.324 15.127,19.880 13.222,19.726 11.430 C 19.663 10.693,19.560 10.188,19.334 9.520 C 18.929 8.316,18.302 7.334,17.355 6.419 C 16.027 5.137,14.398 4.415,12.527 4.280 C 12.226 4.258,11.944 4.243,11.900 4.246 C 11.856 4.249,11.628 4.265,11.393 4.282 M12.640 7.326 C 13.380 7.469,14.130 8.034,14.455 8.693 C 14.651 9.091,14.728 9.452,14.728 9.980 C 14.727 10.716,14.567 11.240,14.174 11.791 C 14.071 11.935,13.685 12.364,13.318 12.744 C 12.684 13.398,12.536 13.594,12.426 13.930 C 12.405 13.993,12.332 14.000,11.657 14.000 L 10.911 14.000 10.938 13.810 C 10.986 13.476,11.181 12.979,11.383 12.675 C 11.491 12.513,11.888 12.062,12.266 11.673 C 13.079 10.835,13.202 10.638,13.232 10.124 C 13.265 9.540,13.052 9.135,12.582 8.887 C 12.404 8.793,12.334 8.780,12.000 8.780 C 11.666 8.780,11.596 8.793,11.418 8.887 C 11.032 9.090,10.760 9.504,10.760 9.887 L 10.760 10.000 9.999 10.000 L 9.237 10.000 9.262 9.790 C 9.331 9.187,9.454 8.833,9.745 8.393 C 10.347 7.485,11.418 7.090,12.640 7.326 M12.360 16.500 L 12.360 17.240 11.620 17.240 L 10.880 17.240 10.880 16.500 L 10.880 15.760 11.620 15.760 L 12.360 15.760 12.360 16.500 " stroke="none" fill-rule="evenodd"></path>';

const QuestionFilledSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-question-filled';
  const symbolId = 'snack-uikit-product-icons-' + 'question-filled';
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
export default QuestionFilledSpriteSVG;
