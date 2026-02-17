// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.400 6.382 C 5.123 8.020,3.216 9.393,3.162 9.433 L 3.063 9.506 3.272 9.792 C 3.386 9.950,3.480 10.087,3.480 10.097 C 3.480 10.107,3.327 10.165,3.140 10.226 C 2.953 10.287,2.800 10.347,2.800 10.359 C 2.800 10.378,5.961 20.032,6.018 20.188 C 6.031 20.223,6.135 20.203,6.386 20.118 C 6.578 20.053,6.741 20.000,6.748 20.000 C 6.754 20.000,6.760 20.171,6.760 20.380 L 6.760 20.760 12.000 20.760 L 17.240 20.760 17.240 20.380 C 17.240 20.171,17.246 20.000,17.252 20.000 C 17.259 20.000,17.422 20.053,17.614 20.118 C 17.865 20.203,17.969 20.223,17.981 20.188 C 18.044 20.014,21.200 10.377,21.200 10.359 C 21.200 10.347,21.047 10.287,20.860 10.226 C 20.673 10.165,20.520 10.107,20.520 10.097 C 20.520 10.087,20.610 9.955,20.720 9.804 C 20.830 9.653,20.920 9.520,20.920 9.510 C 20.920 9.489,12.496 3.425,12.448 3.412 C 12.433 3.407,12.332 3.529,12.224 3.682 C 12.116 3.835,12.015 3.960,12.000 3.960 C 11.985 3.960,11.884 3.835,11.776 3.682 C 11.668 3.529,11.571 3.403,11.560 3.403 C 11.549 3.403,9.677 4.744,7.400 6.382 M11.225 11.788 C 11.216 11.797,9.849 11.367,8.187 10.832 C 6.466 10.278,5.180 9.845,5.199 9.825 C 5.218 9.806,6.581 8.822,8.227 7.638 L 11.220 5.486 11.230 8.629 C 11.236 10.358,11.233 11.780,11.225 11.788 M15.880 7.713 C 17.453 8.843,18.762 9.789,18.788 9.814 C 18.825 9.849,18.124 10.089,15.854 10.820 C 14.213 11.348,12.846 11.786,12.816 11.793 C 12.768 11.804,12.760 11.324,12.760 8.640 L 12.760 5.475 12.890 5.567 C 12.962 5.617,14.307 6.583,15.880 7.713 M7.746 12.263 C 9.371 12.784,10.713 13.223,10.730 13.238 C 10.758 13.262,7.077 18.315,7.018 18.332 C 6.997 18.338,4.680 11.355,4.680 11.286 C 4.680 11.278,4.705 11.281,4.736 11.293 C 4.767 11.305,6.122 11.741,7.746 12.263 M19.320 11.290 C 19.319 11.360,17.006 18.325,16.984 18.324 C 16.950 18.324,13.285 13.341,13.270 13.275 C 13.264 13.249,14.533 12.819,16.260 12.260 C 19.200 11.308,19.320 11.270,19.320 11.290 M13.900 16.702 L 15.750 19.220 13.875 19.230 C 12.844 19.236,11.156 19.236,10.125 19.230 L 8.250 19.220 10.110 16.688 C 11.132 15.296,11.988 14.163,12.010 14.170 C 12.032 14.177,12.883 15.317,13.900 16.702 " stroke="none" fill-rule="evenodd"></path>';

const CompetenceMapSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-competence-map';
  const symbolId = 'snack-uikit-web-icons-' + 'competence-map';
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
export default CompetenceMapSpriteSVG;
