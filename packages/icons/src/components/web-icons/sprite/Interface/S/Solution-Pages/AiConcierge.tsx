// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.090 4.430 L 3.240 6.697 3.240 12.228 L 3.240 17.760 6.620 17.760 L 10.000 17.760 10.000 17.000 L 10.000 16.240 7.380 16.240 L 4.760 16.240 4.761 11.890 L 4.761 7.540 7.881 5.706 L 11.000 3.873 14.119 5.706 L 17.239 7.540 17.239 8.270 L 17.240 9.000 18.000 9.000 L 18.760 9.000 18.760 7.848 L 18.760 6.696 14.904 4.428 C 12.783 3.181,11.024 2.161,10.994 2.161 C 10.964 2.162,9.207 3.183,7.090 4.430 M7.249 8.750 L 7.260 9.500 8.000 9.500 L 8.740 9.500 8.751 8.750 L 8.762 8.000 8.000 8.000 L 7.238 8.000 7.249 8.750 M10.249 8.750 L 10.260 9.500 11.000 9.500 L 11.740 9.500 11.751 8.750 L 11.762 8.000 11.000 8.000 L 10.238 8.000 10.249 8.750 M13.249 8.750 L 13.260 9.500 14.000 9.500 L 14.740 9.500 14.751 8.750 L 14.762 8.000 14.000 8.000 L 13.238 8.000 13.249 8.750 M15.739 10.280 C 14.606 10.379,13.627 10.844,12.799 11.677 C 12.201 12.278,11.841 12.871,11.559 13.715 C 11.344 14.358,11.269 14.822,11.267 15.520 C 11.266 16.190,11.336 16.577,11.603 17.379 L 11.767 17.874 10.631 19.267 C 10.006 20.033,9.481 20.683,9.464 20.712 C 9.423 20.781,16.696 20.757,17.039 20.687 C 17.952 20.500,18.972 20.061,19.600 19.586 C 21.145 18.418,21.889 16.818,21.722 15.022 C 21.644 14.189,21.494 13.622,21.195 13.025 C 20.951 12.541,20.742 12.255,20.323 11.835 C 19.403 10.911,18.176 10.390,16.658 10.281 C 16.351 10.259,16.091 10.243,16.080 10.246 C 16.069 10.249,15.916 10.264,15.739 10.280 M7.249 11.750 L 7.260 12.500 8.000 12.500 L 8.740 12.500 8.751 11.750 L 8.762 11.000 8.000 11.000 L 7.238 11.000 7.249 11.750 M17.011 11.819 C 17.482 11.890,17.767 11.969,18.140 12.130 C 19.200 12.587,19.907 13.443,20.147 14.560 C 20.248 15.029,20.248 15.993,20.148 16.360 C 19.796 17.651,18.648 18.704,17.127 19.131 C 16.833 19.214,16.728 19.218,14.705 19.231 L 12.590 19.244 12.765 19.025 C 12.861 18.905,13.087 18.628,13.267 18.409 L 13.594 18.011 13.451 17.776 C 13.212 17.383,13.010 16.919,12.895 16.499 C 12.797 16.140,12.786 16.035,12.787 15.460 C 12.788 14.933,12.803 14.763,12.874 14.500 C 13.257 13.077,14.217 12.091,15.480 11.822 C 15.827 11.748,16.529 11.747,17.011 11.819 M17.240 15.620 L 17.240 16.240 16.620 16.240 L 16.000 16.240 16.000 17.000 L 16.000 17.760 17.380 17.760 L 18.760 17.760 18.760 16.380 L 18.760 15.000 18.000 15.000 L 17.240 15.000 17.240 15.620 " stroke="none" fill-rule="evenodd"></path>';

const AiConciergeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-ai-concierge';
  const symbolId = 'snack-uikit-web-icons-' + 'ai-concierge';
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
export default AiConciergeSpriteSVG;
