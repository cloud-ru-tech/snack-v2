// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const WarningSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-warning';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M5.97 5.97 3.24 8.7v6.6l2.73 2.73 2.73 2.73h6.6l2.73-2.73 2.73-2.73V8.7l-2.73-2.73-2.73-2.73H8.7zm11 1.06 2.27 2.27v5.4l-2.27 2.27-2.27 2.27H9.3l-2.27-2.27-2.27-2.27V9.3l2.27-2.27L9.3 4.76h5.4zm-5.73 3.47V14h1.52V7h-1.52zm0 5.76V17h1.52v-1.48h-1.52z'
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
export default WarningSVG;
