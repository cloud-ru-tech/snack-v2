// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.916 3.282 C 10.385 3.418,9.012 4.378,8.361 5.768 C 7.621 7.349,7.959 9.197,9.218 10.454 C 10.353 11.587,12.038 12.020,13.589 11.578 C 15.591 11.007,16.952 9.056,16.723 7.087 C 16.607 6.091,16.213 5.265,15.520 4.567 C 14.772 3.815,13.828 3.378,12.740 3.280 C 12.498 3.258,12.291 3.243,12.280 3.246 C 12.269 3.249,12.105 3.265,11.916 3.282 M13.175 4.857 C 14.151 5.125,14.984 5.982,15.185 6.925 C 15.270 7.324,15.241 7.965,15.122 8.320 C 14.875 9.055,14.235 9.733,13.508 10.028 C 12.807 10.313,11.913 10.313,11.212 10.028 C 10.485 9.733,9.845 9.055,9.598 8.320 C 9.479 7.966,9.450 7.324,9.534 6.928 C 9.764 5.850,10.676 5.017,11.880 4.785 C 12.082 4.746,12.945 4.794,13.175 4.857 M4.638 16.857 C 3.440 18.297,2.460 19.491,2.460 19.512 C 2.460 19.533,2.712 19.760,3.019 20.016 C 3.557 20.463,3.581 20.478,3.639 20.403 C 3.673 20.360,4.555 19.298,5.600 18.043 L 7.500 15.762 8.890 15.761 L 10.280 15.760 10.280 15.000 L 10.280 14.240 8.548 14.240 L 6.816 14.240 4.638 16.857 M12.240 18.000 L 12.240 21.760 17.000 21.760 L 21.760 21.760 21.760 18.000 L 21.760 14.240 17.000 14.240 L 12.240 14.240 12.240 18.000 M18.799 15.875 C 18.723 15.938,18.291 16.298,17.840 16.674 C 17.389 17.051,17.011 17.359,17.000 17.359 C 16.989 17.359,16.551 16.999,16.027 16.559 L 15.075 15.760 17.006 15.760 L 18.938 15.760 18.799 15.875 M15.450 18.034 L 16.999 19.328 18.550 18.038 C 19.402 17.329,20.132 16.721,20.170 16.688 C 20.237 16.631,20.240 16.717,20.240 18.434 L 20.240 20.240 17.000 20.240 L 13.760 20.240 13.760 18.435 C 13.760 16.722,13.764 16.633,13.830 16.685 C 13.868 16.715,14.597 17.322,15.450 18.034 " stroke="none" fill-rule="evenodd"></path>';

const UserInvitationSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-user-invitation';
  const symbolId = 'snack-uikit-web-icons-' + 'user-invitation';
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
export default UserInvitationSpriteSVG;
