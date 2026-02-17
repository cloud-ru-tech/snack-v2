// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M10.267 5.415 L 8.555 8.267 5.387 8.999 C 3.645 9.402,2.186 9.744,2.145 9.758 C 2.083 9.781,2.429 10.199,4.201 12.243 C 5.373 13.594,6.354 14.727,6.381 14.760 C 6.420 14.808,6.372 15.484,6.141 18.120 C 5.982 19.935,5.857 21.427,5.864 21.435 C 5.871 21.443,7.241 20.871,8.910 20.165 C 10.578 19.458,11.969 18.880,12.000 18.880 C 12.031 18.880,13.422 19.458,15.090 20.165 C 16.759 20.871,18.129 21.443,18.136 21.435 C 18.143 21.427,18.018 19.935,17.859 18.120 C 17.628 15.484,17.580 14.808,17.619 14.760 C 17.646 14.727,18.627 13.594,19.799 12.243 C 21.571 10.199,21.917 9.781,21.855 9.758 C 21.814 9.744,20.355 9.402,18.613 8.999 L 15.445 8.267 13.733 5.415 C 12.791 3.847,12.011 2.563,12.000 2.563 C 11.989 2.563,11.209 3.847,10.267 5.415 M13.252 7.533 L 14.484 9.584 16.792 10.117 C 18.061 10.410,19.112 10.661,19.126 10.675 C 19.140 10.689,18.446 11.511,17.585 12.503 L 16.018 14.305 16.034 14.503 C 16.042 14.611,16.135 15.681,16.239 16.880 C 16.344 18.079,16.424 19.067,16.416 19.076 C 16.408 19.085,15.411 18.672,14.201 18.160 L 12.000 17.227 9.799 18.159 C 8.588 18.672,7.592 19.084,7.584 19.076 C 7.576 19.067,7.656 18.079,7.761 16.880 C 7.865 15.681,7.958 14.611,7.966 14.503 L 7.982 14.305 6.415 12.503 C 5.553 11.511,4.860 10.689,4.874 10.675 C 4.888 10.661,5.939 10.410,7.208 10.117 L 9.516 9.584 10.748 7.533 C 11.426 6.405,11.989 5.483,12.000 5.483 C 12.011 5.483,12.574 6.406,13.252 7.533 " stroke="none" fill-rule="evenodd"></path>';

const StarSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-star';
  const symbolId = 'snack-uikit-snack-icons-' + 'star';
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
export default StarSpriteSVG;
