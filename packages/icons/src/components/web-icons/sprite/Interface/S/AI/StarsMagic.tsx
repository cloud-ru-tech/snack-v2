// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M17.260 3.868 C 16.907 4.675,16.707 5.088,16.589 5.254 C 16.463 5.434,16.167 5.598,15.208 6.021 C 14.669 6.259,14.337 6.426,14.368 6.444 C 14.397 6.460,14.798 6.639,15.260 6.842 C 15.722 7.045,16.195 7.271,16.310 7.345 C 16.590 7.524,16.712 7.724,17.158 8.740 C 17.361 9.202,17.541 9.604,17.558 9.634 C 17.577 9.669,17.707 9.417,17.919 8.934 C 18.353 7.946,18.543 7.582,18.691 7.457 C 18.847 7.326,19.176 7.161,20.039 6.782 C 20.421 6.614,20.760 6.462,20.791 6.444 C 20.829 6.423,20.598 6.303,20.094 6.081 C 19.082 5.636,18.827 5.505,18.671 5.348 C 18.504 5.181,18.333 4.852,17.939 3.940 C 17.768 3.544,17.615 3.206,17.600 3.188 C 17.585 3.171,17.432 3.477,17.260 3.868 M11.262 4.204 C 11.251 4.235,11.061 4.781,10.840 5.418 C 10.381 6.744,10.124 7.366,9.677 8.236 C 9.050 9.457,8.602 9.998,7.752 10.561 C 7.241 10.900,6.206 11.428,5.480 11.721 C 5.166 11.848,3.291 12.514,2.763 12.686 C 2.732 12.696,3.191 12.872,3.783 13.078 C 5.185 13.563,5.706 13.772,6.580 14.202 C 8.274 15.033,8.903 15.644,9.715 17.248 C 10.126 18.059,10.365 18.635,10.759 19.763 C 10.939 20.278,11.132 20.832,11.189 20.993 L 11.292 21.286 11.700 20.113 C 12.185 18.718,12.380 18.234,12.803 17.374 C 13.198 16.574,13.674 15.847,14.053 15.468 C 14.423 15.098,15.025 14.698,15.825 14.291 C 16.684 13.854,17.299 13.601,18.621 13.141 C 19.237 12.927,19.763 12.739,19.791 12.724 C 19.820 12.708,19.324 12.516,18.660 12.286 C 17.308 11.818,16.663 11.555,15.840 11.138 C 14.282 10.348,13.691 9.764,12.904 8.237 C 12.477 7.409,12.186 6.701,11.720 5.360 C 11.495 4.711,11.304 4.173,11.296 4.164 C 11.288 4.156,11.273 4.174,11.262 4.204 M12.229 10.060 C 12.880 11.041,13.682 11.713,15.037 12.414 L 15.613 12.713 15.206 12.917 C 13.329 13.859,12.529 14.643,11.562 16.488 L 11.290 17.007 11.032 16.513 C 10.284 15.083,9.643 14.310,8.670 13.666 C 8.205 13.358,7.551 12.985,7.173 12.811 L 6.956 12.712 7.204 12.595 C 7.877 12.277,8.703 11.763,9.253 11.321 C 9.842 10.847,10.455 10.018,10.995 8.965 L 11.289 8.391 11.587 8.965 C 11.750 9.281,12.039 9.774,12.229 10.060 " stroke="none" fill-rule="evenodd"></path>';

const StarsMagicSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-stars-magic';
  const symbolId = 'snack-uikit-web-icons-' + 'stars-magic';
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
export default StarsMagicSpriteSVG;
