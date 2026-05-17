// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LinkSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-link';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M13.98 4.44 12.02 6.4l.53.53.53.53 1.7-1.7 1.7-1.7 1.72 1.72 1.72 1.72-3.41 3.408-3.41 3.407-.899-.858c-.495-.471-.911-.853-.925-.847a13 13 0 0 0-.528.532l-.502.523 1.182 1.127 1.183 1.128h1.009l3.95-3.95 3.95-3.95V6.94l-2.23-2.23-2.23-2.23h-1.12zm-3.666 3.668c-.078.012-1.128 1.052-3.96 3.922L2.5 15.934l-.011.562-.011.561 2.231 2.232L6.94 21.52h1.08l1.97-1.97 1.97-1.971-.51-.509c-.281-.281-.529-.51-.55-.51s-.796.756-1.72 1.68L7.5 19.92l-1.718-1.718-1.717-1.717 2.358-2.387a1793 1793 0 0 0 3.357-3.406l1-1.02.895.854c.492.47.907.859.923.865.015.006.256-.23.535-.525l.506-.537-1.176-1.124-1.177-1.125-.433.006a7 7 0 0 0-.539.022'
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
export default LinkSVG;
