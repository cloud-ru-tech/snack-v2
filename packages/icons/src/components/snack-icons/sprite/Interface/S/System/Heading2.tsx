// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M5.240 12.000 L 5.240 19.000 6.000 19.000 L 6.760 19.000 6.760 15.880 L 6.760 12.760 10.000 12.760 L 13.240 12.760 13.240 15.880 L 13.240 19.000 14.000 19.000 L 14.760 19.000 14.760 12.000 L 14.760 5.000 14.000 5.000 L 13.240 5.000 13.240 8.120 L 13.240 11.240 10.000 11.240 L 6.760 11.240 6.760 8.120 L 6.760 5.000 6.000 5.000 L 5.240 5.000 5.240 12.000 M17.800 12.282 C 17.490 12.324,17.130 12.443,16.898 12.579 C 16.644 12.728,16.371 13.053,16.300 13.291 C 16.202 13.622,16.152 13.600,16.997 13.600 L 17.754 13.600 17.720 13.720 C 17.687 13.836,17.689 13.839,17.793 13.810 C 17.852 13.794,18.053 13.780,18.240 13.780 C 18.522 13.780,18.604 13.795,18.723 13.869 C 18.976 14.026,19.040 14.348,18.864 14.579 C 18.811 14.648,18.482 14.902,18.134 15.142 C 17.285 15.728,16.800 16.204,16.567 16.680 C 16.361 17.101,16.270 17.450,16.264 17.840 C 16.259 18.224,16.367 18.439,16.657 18.618 L 16.854 18.740 18.427 18.752 L 20.000 18.763 20.000 18.002 L 20.000 17.240 19.000 17.240 C 18.440 17.240,18.000 17.224,18.000 17.204 C 18.000 17.134,18.473 16.732,18.892 16.447 C 19.823 15.814,20.179 15.455,20.361 14.969 C 20.541 14.487,20.503 13.884,20.259 13.375 C 19.883 12.592,18.859 12.136,17.800 12.282 " stroke="none" fill-rule="evenodd"></path>';

const Heading2SpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-heading2';
  const symbolId = 'snack-uikit-snack-icons-' + 'heading2';
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
export default Heading2SpriteSVG;
