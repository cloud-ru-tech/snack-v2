// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const NotifierCriticalFilledSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-notifier-critical-filled';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M5.97 5.97 3.24 8.7v6.6l2.73 2.73 2.73 2.73h6.6l2.73-2.73 2.73-2.73V8.7l-2.73-2.73-2.73-2.73H8.7zm7.78 2.34 1.75-1.75.97.97.97.97-1.75 1.75L13.94 12l1.75 1.75 1.75 1.75-.97.97-.97.97-1.75-1.75L12 13.94l-1.75 1.75-1.75 1.75-.97-.97-.97-.97 1.75-1.75L10.06 12l-1.75-1.75L6.56 8.5l.97-.97.97-.97 1.75 1.75L12 10.06z' />
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
export default NotifierCriticalFilledSVG;
