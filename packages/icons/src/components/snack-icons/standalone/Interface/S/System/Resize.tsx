// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ResizeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-resize';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='m15.97 15.97-4.49 4.491.53.529.531.53 4.499-4.5 4.499-4.499L21.02 12c-.285-.286-.528-.52-.539-.52-.012 0-2.042 2.021-4.511 4.49m2 2-2.49 2.491.53.529.531.53 2.499-2.5 2.499-2.5-.519-.52a9.5 9.5 0 0 0-.54-.52c-.011 0-1.141 1.121-2.51 2.49m1.999 2.001-.489.49.531.53.53.529.499-.5.499-.5-.519-.52a9.5 9.5 0 0 0-.54-.52c-.012 0-.241.221-.511.491'
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
export default ResizeSVG;
