// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CursorSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cursor';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m15.249 3.25.011 1.25h1.48l.011-1.25.01-1.25h-1.522zm3.221.22-.99.991.53.529.531.53.999-1 .999-1L20.02 3a9.5 9.5 0 0 0-.54-.52c-.011 0-.466.446-1.01.99M9.7 7.87C5.52 8.874 2.093 9.7 2.085 9.706c-.014.01 2.702 9.735 2.726 9.758.019.02 9.799 2.459 9.81 2.447.005-.006.617-3.53 1.358-7.831.742-4.301 1.358-7.87 1.37-7.93.011-.06.005-.109-.014-.107-.019.001-3.455.824-7.635 1.827m8.798-1.579c-.011.029-.015.366-.009.75l.011.699 1.25.011 1.25.01V6.24h-1.241c-.974 0-1.246.011-1.261.051m-4.605 2.365c-2.774 3.002-8.117 8.687-8.13 8.652-.01-.027-.425-1.501-.923-3.276l-.906-3.229.923-.222a1580.51 1580.51 0 0 1 9.256-2.218c.03-.002-.069.13-.22.293m.447 6.087c-.497 2.88-.91 5.257-.918 5.281-.01.029-1.164-.241-3.283-.767a278.28 278.28 0 0 1-3.282-.827c-.008-.008 1.87-2.035 4.173-4.504 2.304-2.47 4.194-4.474 4.2-4.455.007.02-.394 2.392-.89 5.272'
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
export default CursorSVG;
