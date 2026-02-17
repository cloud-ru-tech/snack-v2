// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.240 12.000 L 4.240 20.760 7.620 20.760 L 11.000 20.760 11.000 20.000 L 11.000 19.240 8.380 19.240 L 5.760 19.240 5.760 12.000 L 5.760 4.760 10.230 4.760 L 14.700 4.760 16.470 6.530 L 18.240 8.300 18.240 10.150 L 18.240 12.000 19.000 12.000 L 19.760 12.000 19.760 9.850 L 19.760 7.700 17.530 5.470 L 15.300 3.240 9.770 3.240 L 4.240 3.240 4.240 12.000 M8.000 8.000 L 8.000 8.760 11.000 8.760 L 14.000 8.760 14.000 8.000 L 14.000 7.240 11.000 7.240 L 8.000 7.240 8.000 8.000 M8.000 12.000 L 8.000 12.761 9.750 12.750 L 11.500 12.740 11.500 12.000 L 11.500 11.260 9.750 11.250 L 8.000 11.239 8.000 12.000 M14.779 12.282 C 13.514 12.406,12.364 13.174,11.728 14.320 C 11.193 15.282,11.109 16.532,11.507 17.596 C 11.909 18.674,12.831 19.565,13.929 19.937 C 14.255 20.047,14.896 20.160,15.200 20.160 C 15.784 20.160,16.630 19.932,17.138 19.638 L 17.416 19.477 18.438 20.496 L 19.460 21.515 20.000 20.999 L 20.540 20.484 19.508 19.450 L 18.477 18.416 18.638 18.138 C 18.854 17.764,19.028 17.250,19.100 16.773 C 19.174 16.282,19.174 16.118,19.101 15.629 C 18.783 13.523,16.910 12.072,14.779 12.282 M15.703 13.803 C 16.378 13.924,17.081 14.473,17.393 15.123 C 17.730 15.825,17.730 16.575,17.393 17.277 C 17.166 17.750,16.749 18.167,16.277 18.392 C 15.878 18.582,15.628 18.640,15.200 18.640 C 14.772 18.640,14.522 18.582,14.123 18.392 C 13.858 18.265,13.720 18.165,13.478 17.922 C 12.992 17.437,12.760 16.879,12.760 16.200 C 12.760 15.796,12.829 15.494,13.007 15.123 C 13.233 14.652,13.651 14.234,14.123 14.007 C 14.308 13.917,14.550 13.827,14.660 13.807 C 14.940 13.754,15.422 13.752,15.703 13.803 M8.000 16.000 L 8.000 16.760 9.000 16.760 L 10.000 16.760 10.000 16.000 L 10.000 15.240 9.000 15.240 L 8.000 15.240 8.000 16.000 " stroke="none" fill-rule="evenodd"></path>';

const FileSearchSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-file-search';
  const symbolId = 'snack-uikit-web-icons-' + 'file-search';
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
export default FileSearchSpriteSVG;
