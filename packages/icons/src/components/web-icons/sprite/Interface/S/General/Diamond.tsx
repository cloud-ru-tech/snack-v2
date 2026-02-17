// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.976 5.090 C 2.172 9.321,2.073 9.475,2.107 9.531 C 2.177 9.649,11.970 21.120,12.000 21.120 C 12.036 21.120,21.876 9.579,21.902 9.506 C 21.912 9.481,20.995 8.065,19.865 6.360 L 17.812 3.260 12.007 3.250 L 6.201 3.240 4.976 5.090 M8.816 5.790 C 8.632 6.356,8.340 7.243,8.168 7.760 L 7.853 8.700 6.127 8.710 C 5.177 8.716,4.400 8.712,4.400 8.702 C 4.400 8.691,4.984 7.800,5.698 6.721 L 6.996 4.760 8.074 4.760 L 9.151 4.760 8.816 5.790 M13.910 6.710 C 14.268 7.783,14.560 8.674,14.560 8.690 C 14.560 8.707,13.408 8.720,12.000 8.720 C 10.592 8.720,9.440 8.707,9.440 8.690 C 9.440 8.674,9.732 7.783,10.090 6.710 L 10.739 4.760 12.000 4.760 L 13.261 4.760 13.910 6.710 M18.302 6.722 C 19.016 7.801,19.600 8.692,19.600 8.702 C 19.600 8.712,18.823 8.716,17.873 8.710 L 16.147 8.700 15.792 7.640 C 15.598 7.057,15.306 6.170,15.143 5.670 L 14.849 4.760 15.926 4.760 L 17.003 4.760 18.302 6.722 M8.726 13.080 C 9.205 14.653,9.593 15.954,9.588 15.971 C 9.583 15.988,8.586 14.836,7.373 13.411 C 6.159 11.986,5.046 10.680,4.900 10.510 L 4.633 10.199 6.244 10.210 L 7.854 10.220 8.726 13.080 M14.560 10.237 C 14.560 10.299,12.053 18.521,12.025 18.548 C 12.011 18.562,11.989 18.562,11.975 18.548 C 11.948 18.521,9.440 10.302,9.440 10.239 C 9.440 10.214,10.350 10.200,12.000 10.200 C 13.542 10.200,14.560 10.215,14.560 10.237 M18.671 11.011 C 18.291 11.457,17.180 12.762,16.202 13.910 C 15.224 15.058,14.418 15.991,14.410 15.984 C 14.397 15.970,16.111 10.293,16.147 10.230 C 16.157 10.213,16.884 10.200,17.763 10.200 L 19.361 10.200 18.671 11.011 " stroke="none" fill-rule="evenodd"></path>';

const DiamondSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-diamond';
  const symbolId = 'snack-uikit-web-icons-' + 'diamond';
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
export default DiamondSpriteSVG;
