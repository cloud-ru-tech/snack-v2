// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 10.789 L 3.240 18.463 7.450 19.574 C 9.766 20.186,11.695 20.689,11.737 20.693 C 11.802 20.699,11.829 20.648,11.897 20.390 C 11.942 20.220,11.988 20.080,12.000 20.080 C 12.012 20.080,12.058 20.220,12.103 20.390 C 12.171 20.648,12.198 20.699,12.263 20.693 C 12.305 20.689,14.234 20.186,16.550 19.574 L 20.760 18.463 20.760 10.789 C 20.760 3.499,20.756 3.116,20.690 3.135 C 20.652 3.146,18.680 3.447,16.310 3.803 L 12.000 4.452 7.690 3.803 C 5.319 3.447,3.349 3.146,3.310 3.135 C 3.244 3.116,3.240 3.499,3.240 10.789 M7.965 5.360 C 9.711 5.624,11.162 5.840,11.190 5.840 C 11.230 5.840,11.240 7.183,11.240 12.420 C 11.240 17.506,11.229 19.000,11.192 19.000 C 11.150 19.000,5.308 17.466,4.910 17.351 L 4.760 17.307 4.760 11.094 C 4.760 7.676,4.767 4.880,4.775 4.880 C 4.783 4.880,6.218 5.096,7.965 5.360 M19.240 11.095 L 19.240 17.309 19.010 17.373 C 18.223 17.589,12.845 19.000,12.807 19.000 C 12.771 19.000,12.760 17.396,12.760 12.427 L 12.760 5.854 13.910 5.681 C 14.543 5.585,15.969 5.368,17.080 5.198 C 18.191 5.028,19.132 4.887,19.170 4.884 C 19.236 4.880,19.240 5.201,19.240 11.095 M6.000 8.199 C 5.903 8.594,5.832 8.924,5.842 8.933 C 5.874 8.960,9.802 9.931,9.816 9.915 C 9.849 9.875,10.167 8.514,10.148 8.494 C 10.135 8.482,9.237 8.249,8.152 7.977 C 7.068 7.705,6.179 7.482,6.178 7.481 C 6.178 7.481,6.097 7.803,6.000 8.199 M15.240 12.230 L 15.240 14.539 16.400 13.380 L 17.560 12.221 16.410 11.070 C 15.778 10.438,15.256 9.920,15.250 9.920 C 15.245 9.920,15.240 10.959,15.240 12.230 M6.004 11.703 C 5.906 12.096,5.845 12.420,5.865 12.437 C 5.902 12.470,9.804 13.451,9.820 13.431 C 9.846 13.398,10.174 12.001,10.158 11.988 C 10.138 11.970,6.259 11.000,6.209 11.000 C 6.192 11.000,6.099 11.316,6.004 11.703 M6.182 14.517 C 6.155 14.560,5.840 15.829,5.840 15.893 C 5.840 15.935,6.358 16.080,7.780 16.435 C 8.847 16.702,9.743 16.920,9.771 16.920 C 9.825 16.920,10.190 15.537,10.147 15.494 C 10.105 15.452,6.199 14.489,6.182 14.517 " stroke="none" fill-rule="evenodd"></path>';

const TextMediaSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-text-media';
  const symbolId = 'snack-uikit-web-icons-' + 'text-media';
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
export default TextMediaSpriteSVG;
