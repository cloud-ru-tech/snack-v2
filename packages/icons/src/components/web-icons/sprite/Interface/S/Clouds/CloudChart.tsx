// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M12.023 4.285 C 11.018 4.365,9.996 4.798,9.159 5.497 C 7.962 6.498,7.240 8.103,7.240 9.764 L 7.240 10.000 7.994 10.000 L 8.749 10.000 8.772 9.490 C 8.786 9.185,8.828 8.857,8.876 8.674 C 9.229 7.317,10.198 6.293,11.508 5.893 C 11.827 5.796,11.920 5.786,12.500 5.786 C 13.080 5.786,13.173 5.796,13.492 5.893 C 14.784 6.288,15.733 7.275,16.105 8.611 C 16.190 8.917,16.212 9.104,16.234 9.700 L 16.260 10.420 16.960 10.443 C 17.750 10.469,17.991 10.518,18.514 10.762 C 20.429 11.657,21.258 13.950,20.397 15.973 C 20.024 16.849,19.188 17.664,18.322 17.994 C 17.699 18.232,17.605 18.240,15.342 18.240 L 13.280 18.240 13.280 19.003 L 13.280 19.766 15.450 19.748 C 16.798 19.736,17.705 19.712,17.844 19.685 C 18.980 19.461,19.965 18.930,20.722 18.135 C 21.545 17.270,22.032 16.256,22.203 15.045 C 22.268 14.590,22.228 13.643,22.126 13.180 C 21.864 11.999,21.294 11.013,20.428 10.245 C 20.104 9.957,19.626 9.633,19.244 9.441 C 18.934 9.286,18.254 9.059,17.980 9.019 C 17.741 8.984,17.680 8.942,17.680 8.812 C 17.680 8.679,17.537 8.124,17.415 7.780 C 16.866 6.239,15.603 5.005,14.056 4.500 C 13.463 4.306,12.730 4.229,12.023 4.285 M4.240 14.880 L 4.240 19.760 5.000 19.760 L 5.760 19.760 5.760 14.880 L 5.760 10.000 5.000 10.000 L 4.240 10.000 4.240 14.880 M7.240 15.880 L 7.240 19.760 8.000 19.760 L 8.760 19.760 8.760 15.880 L 8.760 12.000 8.000 12.000 L 7.240 12.000 7.240 15.880 M10.240 16.880 L 10.240 19.760 11.000 19.760 L 11.760 19.760 11.760 16.880 L 11.760 14.000 11.000 14.000 L 10.240 14.000 10.240 16.880 " stroke="none" fill-rule="evenodd"></path>';

const CloudChartSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-cloud-chart';
  const symbolId = 'snack-uikit-web-icons-' + 'cloud-chart';
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
export default CloudChartSpriteSVG;
