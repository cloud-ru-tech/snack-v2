// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M15.240 4.950 L 15.240 6.661 13.033 8.500 C 11.820 9.512,10.812 10.346,10.793 10.353 C 10.775 10.361,10.760 9.519,10.760 8.483 L 10.760 6.600 7.000 9.107 L 3.240 11.613 3.240 16.187 L 3.240 20.760 12.000 20.760 L 20.760 20.760 20.760 12.000 L 20.760 3.240 18.000 3.240 L 15.240 3.240 15.240 4.950 M19.240 12.000 L 19.240 19.240 18.000 19.240 L 16.760 19.240 16.760 12.000 L 16.760 4.760 18.000 4.760 L 19.240 4.760 19.240 12.000 M15.240 13.940 L 15.240 19.240 13.000 19.240 L 10.760 19.240 10.761 15.790 L 10.762 12.340 12.985 10.490 C 14.208 9.473,15.215 8.640,15.224 8.640 C 15.233 8.640,15.240 11.025,15.240 13.940 M9.240 14.340 L 9.240 19.240 7.000 19.240 L 4.760 19.240 4.760 15.820 L 4.760 12.400 6.970 10.923 C 8.185 10.110,9.194 9.444,9.210 9.443 C 9.226 9.441,9.240 11.645,9.240 14.340 M6.240 13.260 L 6.240 14.000 7.000 14.000 L 7.760 14.000 7.760 13.260 L 7.760 12.520 7.000 12.520 L 6.240 12.520 6.240 13.260 M12.240 13.260 L 12.240 14.000 13.000 14.000 L 13.760 14.000 13.760 13.260 L 13.760 12.520 13.000 12.520 L 12.240 12.520 12.240 13.260 M6.240 16.260 L 6.240 17.000 7.000 17.000 L 7.760 17.000 7.760 16.260 L 7.760 15.520 7.000 15.520 L 6.240 15.520 6.240 16.260 M12.240 16.260 L 12.240 17.000 13.000 17.000 L 13.760 17.000 13.760 16.260 L 13.760 15.520 13.000 15.520 L 12.240 15.520 12.240 16.260 " stroke="none" fill-rule="evenodd"></path>';

const IndustrialBuildingSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-industrial-building';
  const symbolId = 'snack-uikit-web-icons-' + 'industrial-building';
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
export default IndustrialBuildingSpriteSVG;
