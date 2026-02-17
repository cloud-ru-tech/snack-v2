// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M4.470 4.470 L 3.240 5.700 3.240 12.000 L 3.240 18.300 4.470 19.530 L 5.700 20.760 12.000 20.760 L 18.300 20.760 19.530 19.530 L 20.760 18.300 20.760 12.000 L 20.760 5.700 19.530 4.470 L 18.300 3.240 12.000 3.240 L 5.700 3.240 4.470 4.470 M18.470 5.530 L 19.240 6.299 19.240 11.999 L 19.240 17.699 18.470 18.470 L 17.701 19.240 12.000 19.240 L 6.299 19.240 5.530 18.470 L 4.760 17.699 4.760 12.000 L 4.760 6.301 5.530 5.530 L 6.299 4.760 11.999 4.760 L 17.699 4.760 18.470 5.530 M8.880 11.997 L 8.880 16.760 10.890 16.759 C 13.036 16.758,13.465 16.731,14.020 16.558 C 14.947 16.269,15.544 15.661,15.788 14.755 C 15.874 14.433,15.884 13.597,15.805 13.280 C 15.675 12.762,15.341 12.219,14.987 11.952 L 14.814 11.822 14.965 11.581 C 15.218 11.174,15.328 10.780,15.351 10.195 C 15.369 9.734,15.361 9.657,15.264 9.318 C 15.025 8.486,14.533 7.860,13.852 7.523 C 13.350 7.274,13.306 7.270,10.990 7.251 L 8.880 7.233 8.880 11.997 M13.183 8.867 C 13.359 8.961,13.601 9.208,13.694 9.388 C 13.726 9.450,13.783 9.606,13.820 9.735 C 13.943 10.157,13.801 10.737,13.517 10.976 C 13.234 11.214,13.218 11.217,11.750 11.231 L 10.400 11.245 10.400 10.000 L 10.400 8.756 11.710 8.768 C 12.967 8.780,13.027 8.784,13.183 8.867 M13.352 12.823 C 14.100 12.975,14.396 13.359,14.352 14.121 C 14.320 14.665,14.118 14.929,13.580 15.129 C 13.350 15.215,13.276 15.219,11.870 15.232 L 10.400 15.245 10.400 14.003 L 10.400 12.760 11.722 12.760 C 12.766 12.760,13.108 12.773,13.352 12.823 " stroke="none" fill-rule="evenodd"></path>';

const BoldTextSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-bold-text';
  const symbolId = 'snack-uikit-web-icons-' + 'bold-text';
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
export default BoldTextSpriteSVG;
