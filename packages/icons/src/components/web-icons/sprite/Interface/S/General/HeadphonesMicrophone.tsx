// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.880 2.279 C 9.732 2.430,7.684 3.431,6.270 5.020 C 5.127 6.305,4.442 7.875,4.282 9.580 C 4.256 9.849,4.240 11.533,4.240 13.910 L 4.240 17.800 6.950 17.777 C 8.441 17.764,9.683 17.746,9.710 17.738 C 9.749 17.726,9.760 17.039,9.760 14.481 L 9.760 11.240 7.760 11.240 L 5.760 11.240 5.761 10.550 C 5.762 9.809,5.825 9.210,5.956 8.697 C 6.542 6.400,8.450 4.544,10.820 3.965 C 11.443 3.813,11.733 3.781,12.500 3.781 C 13.267 3.781,13.557 3.813,14.180 3.965 C 16.151 4.446,17.828 5.818,18.653 7.622 C 19.087 8.572,19.240 9.338,19.240 10.569 L 19.240 11.240 17.240 11.240 L 15.240 11.240 15.240 13.994 L 15.240 16.748 13.850 18.494 L 12.460 20.240 11.550 20.240 L 10.640 20.240 10.640 21.000 L 10.640 21.760 11.910 21.758 L 13.180 21.756 14.760 19.756 L 16.340 17.756 18.160 17.768 L 19.980 17.780 19.992 17.410 L 20.003 17.040 20.384 17.040 L 20.764 17.040 20.750 13.250 C 20.734 9.115,20.741 9.253,20.493 8.300 C 19.513 4.535,15.884 1.998,11.880 2.279 M8.240 14.520 L 8.240 16.280 7.000 16.280 L 5.760 16.280 5.760 14.520 L 5.760 12.760 7.000 12.760 L 8.240 12.760 8.240 14.520 M19.240 14.520 L 19.240 16.280 18.000 16.280 L 16.760 16.280 16.760 14.520 L 16.760 12.760 18.000 12.760 L 19.240 12.760 19.240 14.520 " stroke="none" fill-rule="evenodd"></path>';

const HeadphonesMicrophoneSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-headphones-microphone';
  const symbolId = 'snack-uikit-web-icons-' + 'headphones-microphone';
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
export default HeadphonesMicrophoneSpriteSVG;
