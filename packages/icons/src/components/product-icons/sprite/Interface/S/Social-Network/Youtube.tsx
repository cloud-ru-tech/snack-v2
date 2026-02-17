// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M7.991 7.263 C 7.747 7.395,7.760 7.088,7.760 12.508 C 7.760 17.341,7.762 17.463,7.838 17.587 C 7.934 17.745,8.052 17.811,8.238 17.811 C 8.451 17.810,18.196 12.933,18.300 12.775 C 18.394 12.631,18.394 12.369,18.300 12.225 C 18.242 12.137,17.192 11.596,13.313 9.657 C 8.114 7.057,8.254 7.120,7.991 7.263 " stroke="none" fill-rule="evenodd"></path>';

const YoutubeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-youtube';
  const symbolId = 'snack-uikit-product-icons-' + 'youtube';
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
export default YoutubeSpriteSVG;
