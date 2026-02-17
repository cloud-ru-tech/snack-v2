// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.700 5.240 L 6.701 6.240 4.970 6.240 L 3.240 6.240 3.240 13.000 L 3.240 19.760 12.000 19.760 L 20.760 19.760 20.760 13.000 L 20.760 6.240 19.030 6.240 L 17.299 6.240 16.300 5.240 L 15.301 4.240 12.000 4.240 L 8.699 4.240 7.700 5.240 M15.700 6.760 L 16.699 7.760 17.970 7.760 L 19.240 7.760 19.240 13.000 L 19.240 18.240 12.000 18.240 L 4.760 18.240 4.760 13.000 L 4.760 7.760 6.030 7.760 L 7.301 7.760 8.300 6.760 L 9.299 5.760 12.000 5.760 L 14.701 5.760 15.700 6.760 M11.595 9.282 C 11.135 9.332,10.822 9.424,10.380 9.639 C 9.320 10.153,8.640 10.999,8.350 12.160 C 8.232 12.634,8.232 13.366,8.350 13.840 C 8.533 14.573,8.843 15.127,9.358 15.642 C 10.088 16.372,10.964 16.734,12.000 16.734 C 13.036 16.734,13.912 16.372,14.642 15.642 C 15.372 14.912,15.734 14.036,15.734 13.000 C 15.734 11.411,14.808 10.076,13.293 9.485 C 12.852 9.312,12.122 9.225,11.595 9.282 M12.556 10.822 C 12.934 10.911,13.263 11.103,13.580 11.420 C 14.034 11.874,14.239 12.365,14.239 13.000 C 14.239 13.635,14.034 14.126,13.580 14.580 C 13.124 15.036,12.636 15.240,12.000 15.240 C 11.364 15.240,10.876 15.036,10.420 14.580 C 9.966 14.126,9.761 13.635,9.761 13.000 C 9.761 12.365,9.966 11.874,10.420 11.420 C 10.730 11.110,11.066 10.911,11.425 10.823 C 11.737 10.748,12.240 10.747,12.556 10.822 " stroke="none" fill-rule="evenodd"></path>';

const PhotoSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-photo';
  const symbolId = 'snack-uikit-product-icons-' + 'photo';
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
export default PhotoSpriteSVG;
