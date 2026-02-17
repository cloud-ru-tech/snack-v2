// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.340 3.280 C 8.582 3.478,6.030 5.029,4.555 7.404 C 4.273 7.857,3.916 8.609,3.741 9.117 C 3.410 10.079,3.287 10.795,3.252 11.950 L 3.228 12.760 7.234 12.760 L 11.240 12.760 11.240 15.470 C 11.240 17.169,11.256 18.277,11.283 18.440 C 11.384 19.068,11.628 19.546,12.080 19.999 C 12.607 20.529,13.148 20.736,14.000 20.735 C 14.349 20.734,14.579 20.713,14.760 20.664 C 15.869 20.365,16.609 19.464,16.743 18.250 L 16.770 18.000 16.011 18.000 L 15.251 18.000 15.227 18.201 C 15.202 18.418,15.046 18.764,14.907 18.914 C 14.720 19.116,14.379 19.239,14.005 19.239 C 13.398 19.241,12.998 18.965,12.823 18.425 C 12.768 18.256,12.760 17.876,12.760 15.495 L 12.760 12.760 16.760 12.760 L 20.760 12.760 20.760 12.230 C 20.759 9.086,19.352 6.394,16.827 4.708 C 15.255 3.657,13.273 3.142,11.340 3.280 M10.225 5.176 C 9.757 5.907,9.264 6.951,8.928 7.924 C 8.580 8.932,8.392 9.811,8.254 11.070 L 8.235 11.240 6.518 11.240 C 4.908 11.240,4.800 11.236,4.800 11.170 C 4.800 11.048,4.910 10.473,5.000 10.120 C 5.599 7.774,7.613 5.710,9.955 5.041 C 10.376 4.921,10.384 4.926,10.225 5.176 M14.100 5.061 C 14.527 5.185,15.198 5.481,15.645 5.743 C 17.564 6.867,18.901 8.866,19.183 11.030 L 19.210 11.240 17.490 11.240 L 15.769 11.240 15.745 11.150 C 15.732 11.101,15.721 10.988,15.720 10.900 C 15.719 10.603,15.559 9.644,15.416 9.074 C 15.078 7.730,14.513 6.380,13.807 5.230 C 13.699 5.054,13.660 4.960,13.696 4.960 C 13.726 4.960,13.908 5.005,14.100 5.061 M12.187 5.492 C 13.109 6.880,13.727 8.308,14.036 9.762 C 14.113 10.125,14.240 10.996,14.240 11.162 C 14.240 11.238,14.194 11.240,12.000 11.240 C 9.806 11.240,9.760 11.238,9.760 11.162 C 9.760 11.119,9.788 10.872,9.822 10.614 C 9.988 9.344,10.358 8.157,10.964 6.949 C 11.292 6.296,11.929 5.246,12.000 5.242 C 12.011 5.241,12.095 5.354,12.187 5.492 " stroke="none" fill-rule="evenodd"></path>';

const UmbrellaSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-umbrella';
  const symbolId = 'snack-uikit-web-icons-' + 'umbrella';
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
export default UmbrellaSpriteSVG;
