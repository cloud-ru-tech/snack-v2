// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LikeFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-like-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M10.868 3.625 9.482 7.457 8.24 10.894v9.866h4.491c2.925 0 4.609-.015 4.83-.042a3.008 3.008 0 0 0 1.758-.84c.442-.443.651-.941.721-1.718.023-.253.195-2.059.383-4.013.337-3.51.34-3.557.281-3.87-.15-.797-.746-1.436-1.508-1.615-.212-.051-.643-.061-2.526-.061L14.4 8.6V7.184c0-1.498-.025-1.782-.196-2.214-.221-.559-.738-1.135-1.249-1.393-.399-.2-.783-.288-1.406-.32l-.536-.028zM3.24 16v4.76h3.52v-9.52H3.24z' />
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
export default LikeFilledSVG;
