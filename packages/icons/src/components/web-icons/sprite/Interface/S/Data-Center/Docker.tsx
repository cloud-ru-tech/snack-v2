// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.240 6.240 L 7.240 8.240 5.237 8.240 L 3.234 8.240 3.251 11.110 C 3.268 14.148,3.272 14.222,3.474 15.142 C 4.154 18.238,6.478 20.349,9.620 20.722 C 10.080 20.776,11.141 20.746,11.800 20.659 C 13.529 20.430,15.006 19.830,16.388 18.794 C 16.859 18.441,17.721 17.590,18.083 17.120 C 18.835 16.147,19.341 15.157,19.590 14.175 L 19.695 13.760 20.847 13.760 L 22.000 13.760 22.000 13.000 L 22.000 12.240 20.880 12.240 L 19.760 12.240 19.760 11.120 L 19.760 10.000 19.000 10.000 L 18.240 10.000 18.240 11.120 L 18.240 12.240 17.500 12.240 L 16.760 12.240 16.760 8.240 L 16.760 4.240 12.000 4.240 L 7.240 4.240 7.240 6.240 M11.240 7.000 L 11.240 8.240 10.000 8.240 L 8.760 8.240 8.760 7.000 L 8.760 5.760 10.000 5.760 L 11.240 5.760 11.240 7.000 M15.240 7.000 L 15.240 8.240 14.000 8.240 L 12.760 8.240 12.760 7.000 L 12.760 5.760 14.000 5.760 L 15.240 5.760 15.240 7.000 M7.240 11.000 L 7.240 12.240 6.000 12.240 L 4.760 12.240 4.760 11.000 L 4.760 9.760 6.000 9.760 L 7.240 9.760 7.240 11.000 M11.240 11.000 L 11.240 12.240 10.000 12.240 L 8.760 12.240 8.760 11.000 L 8.760 9.760 10.000 9.760 L 11.240 9.760 11.240 11.000 M15.240 11.000 L 15.240 12.240 14.000 12.240 L 12.760 12.240 12.760 11.000 L 12.760 9.760 14.000 9.760 L 15.240 9.760 15.240 11.000 M18.094 13.970 C 17.782 15.032,16.981 16.263,16.054 17.106 C 14.871 18.181,13.520 18.846,11.960 19.120 C 11.241 19.246,10.004 19.276,9.435 19.181 C 7.407 18.844,5.780 17.466,5.140 15.546 C 4.987 15.088,4.855 14.480,4.815 14.049 L 4.789 13.760 11.472 13.760 L 18.156 13.760 18.094 13.970 " stroke="none" fill-rule="evenodd"></path>';

const DockerSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-docker';
  const symbolId = 'snack-uikit-web-icons-' + 'docker';
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
export default DockerSpriteSVG;
