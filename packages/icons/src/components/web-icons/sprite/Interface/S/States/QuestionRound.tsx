// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.220 3.785 C 8.681 4.049,6.462 5.292,4.984 7.277 C 2.437 10.700,2.725 15.448,5.666 18.521 C 8.052 21.014,11.568 21.878,14.840 20.776 C 15.402 20.586,16.285 20.152,16.800 19.812 C 18.177 18.902,19.318 17.568,19.974 16.100 C 21.278 13.183,20.916 9.831,19.024 7.289 C 17.681 5.484,15.696 4.267,13.460 3.877 C 12.995 3.796,11.646 3.740,11.220 3.785 M12.548 5.280 C 13.957 5.389,15.242 5.876,16.379 6.732 C 16.783 7.035,17.475 7.727,17.769 8.120 C 18.461 9.047,18.942 10.146,19.144 11.260 C 19.247 11.829,19.247 13.180,19.145 13.740 C 18.985 14.613,18.636 15.527,18.174 16.280 C 17.291 17.721,15.900 18.835,14.326 19.361 C 12.158 20.086,9.894 19.788,7.978 18.525 C 7.346 18.109,6.699 17.495,6.203 16.840 C 4.619 14.752,4.310 11.887,5.412 9.500 C 5.804 8.649,6.210 8.067,6.878 7.396 C 8.239 6.031,9.917 5.315,11.920 5.247 C 11.997 5.244,12.280 5.259,12.548 5.280 M11.620 8.345 C 10.677 8.492,9.866 9.182,9.626 10.042 C 9.593 10.162,9.553 10.354,9.539 10.470 L 9.512 10.680 10.271 10.680 L 11.030 10.680 11.054 10.529 C 11.143 9.971,11.920 9.655,12.480 9.950 C 12.730 10.082,12.917 10.323,12.948 10.554 C 12.993 10.886,12.923 11.006,12.058 12.084 L 11.243 13.100 11.242 13.550 L 11.240 14.000 12.000 14.000 L 12.760 14.000 12.760 13.806 C 12.760 13.615,12.771 13.598,13.436 12.764 C 14.314 11.662,14.453 11.371,14.453 10.640 C 14.452 9.624,13.756 8.734,12.720 8.423 C 12.499 8.357,11.844 8.310,11.620 8.345 M11.240 16.260 L 11.240 17.000 12.000 17.000 L 12.760 17.000 12.760 16.260 L 12.760 15.520 12.000 15.520 L 11.240 15.520 11.240 16.260 " stroke="none" fill-rule="evenodd"></path>';

const QuestionRoundSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-question-round';
  const symbolId = 'snack-uikit-web-icons-' + 'question-round';
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
export default QuestionRoundSpriteSVG;
