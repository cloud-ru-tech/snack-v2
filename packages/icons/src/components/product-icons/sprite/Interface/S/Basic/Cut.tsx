// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M6.096 3.280 C 5.698 3.323,5.397 3.418,4.980 3.632 C 4.689 3.781,4.546 3.890,4.236 4.198 C 3.803 4.629,3.581 4.970,3.418 5.458 C 3.123 6.344,3.224 7.348,3.689 8.140 C 3.903 8.507,4.493 9.097,4.860 9.311 C 5.785 9.853,6.995 9.894,7.945 9.416 L 8.218 9.279 9.579 10.639 L 10.940 12.000 9.576 13.364 L 8.213 14.727 7.922 14.581 C 7.465 14.351,7.108 14.274,6.500 14.274 C 5.863 14.274,5.520 14.354,4.989 14.627 C 4.689 14.781,4.548 14.888,4.236 15.198 C 3.804 15.628,3.581 15.970,3.420 16.455 C 3.123 17.344,3.224 18.346,3.689 19.140 C 3.903 19.507,4.493 20.097,4.860 20.311 C 5.853 20.893,7.147 20.893,8.140 20.311 C 8.507 20.097,9.097 19.507,9.311 19.140 C 9.853 18.215,9.894 17.005,9.416 16.055 L 9.279 15.782 10.639 14.421 L 12.000 13.060 15.730 16.790 L 19.460 20.520 19.990 19.990 L 20.520 19.460 14.899 13.839 L 9.279 8.218 9.416 7.945 C 9.793 7.196,9.853 6.273,9.578 5.447 C 9.418 4.969,9.195 4.626,8.764 4.200 C 8.457 3.897,8.306 3.782,8.014 3.629 C 7.432 3.326,6.777 3.207,6.096 3.280 M16.470 6.470 L 13.480 9.461 14.010 9.990 L 14.541 10.520 17.540 7.520 L 20.539 4.520 20.020 4.000 C 19.735 3.714,19.492 3.480,19.480 3.480 C 19.469 3.480,18.114 4.826,16.470 6.470 M6.946 4.816 C 7.707 5.018,8.239 5.712,8.239 6.500 C 8.239 6.960,8.078 7.360,7.756 7.700 C 7.073 8.423,5.927 8.423,5.244 7.700 C 4.196 6.592,4.957 4.782,6.480 4.764 C 6.623 4.762,6.833 4.786,6.946 4.816 M6.946 15.816 C 7.707 16.018,8.239 16.712,8.239 17.500 C 8.239 17.960,8.078 18.360,7.756 18.700 C 7.073 19.423,5.927 19.423,5.244 18.700 C 4.196 17.592,4.957 15.782,6.480 15.764 C 6.623 15.762,6.833 15.786,6.946 15.816 " stroke="none" fill-rule="evenodd"></path>';

const CutSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cut';
  const symbolId = 'snack-uikit-product-icons-' + 'cut';
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
export default CutSpriteSVG;
