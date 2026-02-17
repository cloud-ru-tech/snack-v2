// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 12.000 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 12.000 3.240 L 3.240 3.240 3.240 12.000 M19.240 12.000 L 19.240 19.240 14.440 19.240 C 11.800 19.240,9.640 19.233,9.640 19.224 C 9.640 19.207,10.363 17.465,10.376 17.451 C 10.381 17.446,10.533 17.478,10.715 17.521 C 12.736 18.004,14.909 17.296,16.284 15.707 C 17.076 14.792,17.524 13.732,17.646 12.486 C 17.818 10.726,17.060 8.860,15.708 7.717 C 14.748 6.906,13.706 6.469,12.469 6.361 C 10.683 6.204,8.925 6.914,7.736 8.272 C 6.930 9.192,6.477 10.255,6.353 11.520 C 6.299 12.077,6.345 12.734,6.479 13.300 C 6.520 13.475,6.550 13.624,6.544 13.629 C 6.531 13.642,4.793 14.360,4.774 14.360 C 4.766 14.360,4.760 12.200,4.760 9.560 L 4.760 4.760 12.000 4.760 L 19.240 4.760 19.240 12.000 M13.010 7.954 C 14.667 8.394,15.879 9.734,16.122 11.397 C 16.187 11.841,16.150 12.607,16.045 13.010 C 15.731 14.207,14.937 15.193,13.860 15.722 C 13.259 16.018,12.849 16.123,12.200 16.149 C 11.697 16.168,11.148 16.122,11.017 16.049 C 10.978 16.027,11.215 15.417,11.946 13.660 C 12.485 12.362,12.960 11.215,13.002 11.111 L 13.078 10.923 12.989 10.958 C 12.940 10.977,11.794 11.453,10.441 12.015 C 8.770 12.710,7.974 13.022,7.954 12.991 C 7.885 12.879,7.831 12.233,7.852 11.781 C 7.885 11.073,8.045 10.525,8.399 9.907 C 8.985 8.882,10.062 8.124,11.253 7.897 C 11.671 7.817,12.608 7.848,13.010 7.954 M10.280 13.735 C 10.280 13.743,9.769 14.980,9.145 16.485 L 8.011 19.220 6.385 19.230 L 4.759 19.241 4.770 17.615 L 4.780 15.989 7.500 14.857 C 10.129 13.764,10.280 13.703,10.280 13.735 " stroke="none" fill-rule="evenodd"></path>';

const HardDriveSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-hard-drive';
  const symbolId = 'snack-uikit-web-icons-' + 'hard-drive';
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
export default HardDriveSpriteSVG;
