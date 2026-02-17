// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M17.820 3.242 C 17.444 3.291,16.740 3.464,16.280 3.619 L 15.860 3.761 14.620 4.997 L 13.380 6.233 9.340 5.482 L 5.300 4.731 4.062 5.964 C 3.381 6.642,2.832 7.203,2.842 7.211 C 2.852 7.220,4.197 8.005,5.830 8.957 C 7.464 9.908,8.800 10.701,8.800 10.719 C 8.800 10.769,7.036 12.600,6.985 12.602 C 6.960 12.603,5.977 12.716,4.800 12.853 L 2.660 13.102 2.649 14.024 L 2.639 14.947 4.623 15.902 C 5.715 16.428,6.630 16.890,6.658 16.929 C 6.685 16.968,7.128 17.873,7.641 18.940 L 8.575 20.880 9.507 20.880 C 10.020 20.880,10.440 20.867,10.439 20.850 C 10.439 20.834,10.549 19.848,10.684 18.660 L 10.930 16.500 11.894 15.531 C 12.635 14.785,12.869 14.573,12.903 14.611 C 12.928 14.638,13.708 16.019,14.637 17.680 C 15.567 19.341,16.339 20.713,16.355 20.729 C 16.370 20.745,16.938 20.203,17.616 19.524 L 18.850 18.289 18.101 14.179 L 17.351 10.069 18.571 8.845 L 19.791 7.620 19.934 7.180 C 20.397 5.751,20.442 4.725,20.073 4.033 C 19.722 3.374,18.929 3.095,17.820 3.242 M18.759 4.758 C 18.803 4.787,18.816 4.878,18.813 5.148 C 18.808 5.564,18.757 5.859,18.599 6.412 L 18.482 6.818 17.105 8.199 L 15.729 9.580 16.480 13.680 L 17.232 17.780 16.987 18.030 C 16.852 18.167,16.732 18.280,16.719 18.280 C 16.706 18.280,15.914 16.885,14.958 15.180 L 13.220 12.081 11.358 13.943 L 9.495 15.804 9.342 17.172 C 9.257 17.924,9.177 18.552,9.164 18.567 C 9.151 18.581,8.834 17.955,8.460 17.175 L 7.779 15.756 6.348 15.068 C 5.344 14.586,4.939 14.372,4.989 14.353 C 5.028 14.339,5.663 14.260,6.400 14.179 C 7.449 14.063,7.754 14.017,7.803 13.965 C 7.838 13.929,8.494 13.243,9.260 12.440 C 10.026 11.637,10.786 10.844,10.948 10.677 L 11.243 10.375 8.272 8.643 C 6.637 7.690,5.292 6.903,5.282 6.894 C 5.272 6.885,5.382 6.759,5.527 6.614 L 5.789 6.351 9.840 7.100 L 13.891 7.849 15.295 6.449 C 16.863 4.886,16.686 5.016,17.522 4.822 C 17.958 4.722,18.644 4.686,18.759 4.758 " stroke="none" fill-rule="evenodd"></path>';

const PlaneSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-plane';
  const symbolId = 'snack-uikit-web-icons-' + 'plane';
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
export default PlaneSpriteSVG;
