// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ImageSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-image';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769v6.881l-1.62-1.62L16 9.94l-1.5 1.5-1.5 1.5-2.5-2.5L8 7.94 6.38 9.56l-1.62 1.62V6.301l.77-.771.769-.77h11.4zm-7.22 7.78 3.23 3.23.53-.53.529-.53-.739-.74-.739-.74.969-.97.97-.97 1.62 1.62 1.62 1.62v2.401l-.77.769-.771.77H6.301l-.771-.77-.77-.769V13.3l1.61-1.61A94 94 0 0 1 8 10.08c.011 0 1.473 1.453 3.25 3.23'
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
export default ImageSVG;
