// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M11.000 6.000 L 11.000 6.760 11.800 6.760 C 12.240 6.760,12.600 6.774,12.601 6.790 C 12.601 6.806,11.976 9.165,11.213 12.030 L 9.824 17.240 8.912 17.240 L 8.000 17.240 8.000 18.000 L 8.000 18.760 10.500 18.760 L 13.000 18.760 13.000 18.000 L 13.000 17.240 12.195 17.240 L 11.391 17.240 11.408 17.150 C 11.418 17.101,12.044 14.742,12.800 11.910 L 14.173 6.760 15.087 6.760 L 16.000 6.760 16.000 6.000 L 16.000 5.240 13.500 5.240 L 11.000 5.240 11.000 6.000 " stroke="none" fill-rule="evenodd"></path>';

const ItalicSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-italic';
  const symbolId = 'snack-uikit-snack-icons-' + 'italic';
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
export default ItalicSpriteSVG;
