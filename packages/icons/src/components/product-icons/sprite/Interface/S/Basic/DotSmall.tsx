// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.617 9.283 C 11.032 9.352,10.519 9.611,10.065 10.064 C 9.729 10.399,9.518 10.739,9.372 11.180 C 9.281 11.457,9.267 11.567,9.267 12.000 C 9.267 12.433,9.281 12.543,9.372 12.820 C 9.518 13.260,9.729 13.601,10.064 13.936 C 10.399 14.271,10.740 14.482,11.180 14.628 C 11.457 14.719,11.567 14.733,12.000 14.733 C 12.433 14.733,12.543 14.719,12.820 14.628 C 13.260 14.482,13.601 14.271,13.936 13.936 C 14.271 13.601,14.482 13.260,14.628 12.820 C 14.719 12.543,14.733 12.433,14.733 12.000 C 14.733 11.568,14.719 11.457,14.628 11.180 C 14.203 9.886,12.986 9.120,11.617 9.283 " stroke="none" fill-rule="evenodd"></path>';

const DotSmallSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-dot-small';
  const symbolId = 'snack-uikit-product-icons-' + 'dot-small';
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
export default DotSmallSpriteSVG;
