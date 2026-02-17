// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BrouserCodeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-brouser-code';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769V9.24H4.76V6.301l.77-.771.769-.77h11.4zM6.24 7v.76h1.52V6.24H6.24zm13 7.23v3.471l-.77.769-.771.77H6.301l-.771-.77-.77-.769V10.76h14.48zM8.2 13.74 6.94 15l1.26 1.26 1.259 1.26.531-.53.53-.529-.73-.731-.729-.73.739-.74.739-.74-.519-.52a9.5 9.5 0 0 0-.54-.52c-.011 0-.587.567-1.28 1.26m5.78-.74-.519.52.739.74.739.74-.729.73-.73.731.53.529.531.53 1.259-1.26L17.06 15l-1.26-1.26a58.197 58.197 0 0 0-1.28-1.26 9.5 9.5 0 0 0-.54.52'
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
export default BrouserCodeSVG;
