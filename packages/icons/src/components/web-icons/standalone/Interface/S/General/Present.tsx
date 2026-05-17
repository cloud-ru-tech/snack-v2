// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PresentSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-present';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='m8.98 4-.519.52.859.86.859.86H3.24v6.52h1v8h15.52v-8h1V6.24h-6.939l.849-.85.85-.851-.53-.529-.53-.53-1.23 1.23L12 5.94l-1.23-1.23a54 54 0 0 0-1.251-1.23c-.011 0-.254.234-.539.52m2.26 5.5v1.74H4.76V7.76h6.48zm8 0v1.74h-6.48V7.76h6.48zm-8 6.5v3.24H5.76v-6.48h5.48zm7 0v3.24h-5.48v-6.48h5.48z' />
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
export default PresentSVG;
