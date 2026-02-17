// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MessagePlaySVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-message-play';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M3.44 10.5v7.26h5v1.72c0 .946.009 1.72.02 1.72.011 0 1.568-.774 3.46-1.72l3.44-1.72h5.6V3.24H3.44zm16 0v5.74h-4.4l-2.52 1.26c-1.386.693-2.529 1.26-2.54 1.26-.011 0-.02-.567-.02-1.26v-1.26h-5V4.76h14.48zm-9.2 0c0 1.859.009 3.38.02 3.38.033 0 5.06-3.358 5.06-3.38 0-.022-5.027-3.38-5.06-3.38-.011 0-.02 1.521-.02 3.38' />
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
export default MessagePlaySVG;
