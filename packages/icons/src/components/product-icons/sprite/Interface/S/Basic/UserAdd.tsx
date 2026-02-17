// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.542 3.285 C 10.899 3.347,10.187 3.606,9.613 3.986 C 8.818 4.513,8.164 5.438,7.892 6.420 C 7.791 6.785,7.781 6.880,7.781 7.500 C 7.781 8.117,7.791 8.216,7.890 8.571 C 8.266 9.922,9.181 10.948,10.460 11.452 C 10.998 11.664,11.372 11.732,12.000 11.732 C 12.751 11.732,13.249 11.616,13.915 11.286 C 14.816 10.839,15.573 10.013,15.942 9.075 C 16.171 8.493,16.217 8.229,16.217 7.500 C 16.217 6.771,16.171 6.507,15.942 5.925 C 15.650 5.182,15.035 4.415,14.388 3.986 C 14.064 3.773,13.476 3.503,13.120 3.405 C 12.880 3.339,12.005 3.223,11.920 3.245 C 11.909 3.248,11.739 3.266,11.542 3.285 M12.620 4.820 C 13.546 5.012,14.412 5.853,14.662 6.800 C 14.753 7.150,14.753 7.850,14.662 8.200 C 14.540 8.661,14.301 9.062,13.921 9.441 C 13.364 9.998,12.782 10.240,12.000 10.240 C 11.218 10.240,10.636 9.998,10.079 9.441 C 9.504 8.867,9.270 8.306,9.270 7.500 C 9.270 6.694,9.504 6.133,10.079 5.559 C 10.466 5.172,10.905 4.919,11.360 4.822 C 11.704 4.748,12.273 4.747,12.620 4.820 M4.544 16.870 C 3.387 18.317,2.440 19.512,2.440 19.526 C 2.440 19.540,2.698 19.758,3.012 20.011 L 3.585 20.470 5.462 18.117 L 7.340 15.764 12.170 15.762 L 17.000 15.760 17.000 15.000 L 17.000 14.240 11.824 14.240 L 6.648 14.240 4.544 16.870 M18.240 16.120 L 18.240 17.240 17.120 17.240 L 16.000 17.240 16.000 18.000 L 16.000 18.760 17.120 18.760 L 18.240 18.760 18.240 19.880 L 18.240 21.000 19.000 21.000 L 19.760 21.000 19.760 19.880 L 19.760 18.760 20.880 18.760 L 22.000 18.760 22.000 18.000 L 22.000 17.240 20.880 17.240 L 19.760 17.240 19.760 16.120 L 19.760 15.000 19.000 15.000 L 18.240 15.000 18.240 16.120 " stroke="none" fill-rule="evenodd"></path>';

const UserAddSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-user-add';
  const symbolId = 'snack-uikit-product-icons-' + 'user-add';
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
export default UserAddSpriteSVG;
