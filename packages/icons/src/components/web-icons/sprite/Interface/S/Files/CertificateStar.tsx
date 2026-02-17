// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 11.961 C 3.240 18.103,3.250 19.686,3.290 19.698 C 3.317 19.707,5.064 19.723,7.170 19.734 L 11.000 19.755 11.000 18.998 L 11.000 18.240 8.810 18.240 C 7.605 18.240,6.202 18.228,5.690 18.214 L 4.760 18.187 4.760 11.974 L 4.760 5.760 11.500 5.760 L 18.240 5.760 18.240 8.880 L 18.240 12.000 19.000 12.000 L 19.760 12.000 19.760 8.120 L 19.760 4.240 11.500 4.240 L 3.240 4.240 3.240 11.961 M7.498 8.291 C 7.487 8.320,7.483 8.657,7.489 9.041 L 7.500 9.740 11.530 9.750 L 15.560 9.760 15.560 9.000 L 15.560 8.240 11.539 8.240 C 8.300 8.240,7.514 8.250,7.498 8.291 M7.498 11.291 C 7.487 11.320,7.483 11.657,7.489 12.041 L 7.500 12.740 11.500 12.740 L 15.500 12.740 15.500 12.000 L 15.500 11.260 11.509 11.250 C 8.280 11.242,7.514 11.249,7.498 11.291 M16.009 13.594 L 15.078 15.104 13.329 15.497 C 12.367 15.713,11.568 15.901,11.554 15.915 C 11.540 15.929,12.066 16.543,12.722 17.280 L 13.916 18.620 13.897 18.780 C 13.850 19.179,13.598 22.132,13.610 22.144 C 13.618 22.151,14.361 21.852,15.262 21.479 C 16.163 21.106,16.924 20.800,16.953 20.800 C 16.982 20.800,17.746 21.106,18.650 21.480 C 19.554 21.854,20.298 22.156,20.303 22.150 C 20.309 22.145,20.243 21.349,20.157 20.383 C 20.025 18.909,20.009 18.616,20.053 18.563 C 20.083 18.528,20.614 17.929,21.233 17.231 C 21.853 16.534,22.360 15.948,22.360 15.931 C 22.360 15.913,21.566 15.719,20.595 15.499 L 18.829 15.100 17.924 13.631 C 17.426 12.824,17.001 12.145,16.979 12.123 C 16.953 12.097,16.621 12.601,16.009 13.594 M17.429 15.692 L 17.878 16.425 18.706 16.612 C 19.161 16.715,19.542 16.809,19.553 16.819 C 19.563 16.830,19.444 16.983,19.286 17.159 C 19.129 17.336,18.874 17.621,18.720 17.794 L 18.440 18.108 18.517 18.964 C 18.559 19.435,18.591 19.822,18.587 19.824 C 18.583 19.827,18.214 19.677,17.766 19.492 L 16.952 19.155 16.146 19.491 C 15.703 19.675,15.335 19.816,15.330 19.802 C 15.324 19.789,15.353 19.401,15.394 18.940 L 15.469 18.102 14.987 17.561 C 14.722 17.263,14.463 16.973,14.411 16.916 L 14.317 16.813 15.174 16.619 L 16.031 16.425 16.481 15.693 C 16.729 15.290,16.942 14.960,16.956 14.960 C 16.969 14.960,17.182 15.290,17.429 15.692 " stroke="none" fill-rule="evenodd"></path>';

const CertificateStarSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-certificate-star';
  const symbolId = 'snack-uikit-web-icons-' + 'certificate-star';
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
export default CertificateStarSpriteSVG;
