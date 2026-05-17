// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BlockCodeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-block-code';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M14 4v.76h3.701l.769.77.77.771v11.4l-.77.769-.771.77H6.301l-.771-.77-.77-.769V12H3.24v6.3l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H14zM4.2 5.74 2.94 7l1.27 1.27 1.27 1.27.53-.53.529-.53-.739-.74L5.061 7l.739-.74.739-.74L6.02 5a10 10 0 0 0-.54-.52c-.011 0-.587.567-1.28 1.26m4.81-.73-.53.529.73.731.729.73-.729.73-.73.731.53.529.531.53L10.8 8.26 12.06 7 10.8 5.74 9.54 4.48z'
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
export default BlockCodeSVG;
