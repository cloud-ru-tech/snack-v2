// DO NOT EDIT IT MANUALLY

import { forwardRef, useEffect, useState } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const FALLBACK_SVG_INNER =
  '<path d="M3.240 5.620 L 3.240 8.000 4.000 8.000 L 4.760 8.000 4.760 6.380 L 4.760 4.760 6.380 4.760 L 8.000 4.760 8.000 4.000 L 8.000 3.240 5.620 3.240 L 3.240 3.240 3.240 5.620 M16.000 4.000 L 16.000 4.760 17.620 4.760 L 19.240 4.760 19.240 6.380 L 19.240 8.000 20.000 8.000 L 20.760 8.000 20.760 5.620 L 20.760 3.240 18.380 3.240 L 16.000 3.240 16.000 4.000 M7.240 9.000 L 7.240 10.760 9.000 10.760 L 10.760 10.760 10.760 9.000 L 10.760 7.240 9.000 7.240 L 7.240 7.240 7.240 9.000 M13.240 9.000 L 13.240 10.760 15.000 10.760 L 16.760 10.760 16.760 9.000 L 16.760 7.240 15.000 7.240 L 13.240 7.240 13.240 9.000 M7.240 15.000 L 7.240 16.760 9.000 16.760 L 10.760 16.760 10.760 15.000 L 10.760 13.240 9.000 13.240 L 7.240 13.240 7.240 15.000 M13.240 15.000 L 13.240 16.760 15.000 16.760 L 16.760 16.760 16.760 15.000 L 16.760 13.240 15.000 13.240 L 13.240 13.240 13.240 15.000 M3.240 18.380 L 3.240 20.760 5.620 20.760 L 8.000 20.760 8.000 20.000 L 8.000 19.240 6.380 19.240 L 4.760 19.240 4.760 17.620 L 4.760 16.000 4.000 16.000 L 3.240 16.000 3.240 18.380 M19.240 17.620 L 19.240 19.240 17.620 19.240 L 16.000 19.240 16.000 20.000 L 16.000 20.760 18.380 20.760 L 20.760 20.760 20.760 18.380 L 20.760 16.000 20.000 16.000 L 19.240 16.000 19.240 17.620 " stroke="none" fill-rule="evenodd"></path>';

const QrCodeSpriteSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  props.width = undefined;
  props.height = undefined;
  const testId = '-qr-code';
  const symbolId = 'snack-uikit-product-icons-' + 'qr-code';
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
export default QrCodeSpriteSVG;
