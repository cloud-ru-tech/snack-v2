// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CloudCursorSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cloud-cursor';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.08 3.303c-2.101.38-3.817 2.12-4.226 4.285l-.069.363-.211.024c-.323.038-1.021.282-1.452.508a5.33 5.33 0 0 0-2.468 2.749 5.554 5.554 0 0 0 .025 4.19c.579 1.418 1.766 2.542 3.181 3.013.785.261.738.257 3.31.274l2.35.016V17.24l-1.93-.001c-2.662-.002-2.896-.029-3.69-.419a3.447 3.447 0 0 1-1.193-.921c-.67-.795-.98-1.718-.935-2.779.065-1.504.879-2.758 2.193-3.377.573-.27.756-.309 1.565-.332l.71-.02v-.345c0-.551.073-1.173.182-1.548.402-1.388 1.498-2.418 2.876-2.702 1.86-.384 3.728.795 4.28 2.702.109.375.182.997.182 1.548v.345l.71.02c.822.023 1.003.063 1.59.348.673.326 1.122.722 1.542 1.358a4.02 4.02 0 0 1 .628 1.843l.03.34.717.011c.394.006.733-.005.753-.025.022-.022.018-.219-.009-.491-.187-1.876-1.24-3.474-2.843-4.312-.431-.226-1.129-.47-1.452-.508l-.211-.024-.069-.363c-.412-2.18-2.134-3.915-4.252-4.286-.435-.076-1.392-.075-1.814.001m.4 8.727c0 .038 3.125 9.864 3.151 9.907.012.02.532-.983 1.156-2.23l1.133-2.267 2.268-1.134c2.245-1.123 2.267-1.135 2.13-1.178l-4.878-1.547-4.85-1.54c-.06-.02-.11-.025-.11-.011m4.16 2.869c.957.303 1.753.563 1.769.577.016.014-.345.213-.803.441l-.833.415-.409.818c-.224.451-.415.812-.423.804-.024-.023-1.141-3.546-1.141-3.597 0-.025.022-.037.05-.027.027.01.833.266 1.79.569'
      />
    </svg>
  ).props.children;
  const style = isCustomSize
    ? {
        ...(props.style || {}),
        width: sizePx,
        height: sizePx,
      }
    : props.style;
  return (
    <svg
      ref={ref}
      xmlns='http://www.w3.org/2000/svg'
      width={sizePx}
      height={sizePx}
      fill='currentColor'
      viewBox='0 0 24 24'
      data-test-id={'icon' + testId}
      style={style}
      {...props}
    >
      {children}
    </svg>
  );
});
export default CloudCursorSVG;
