// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const VmSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-vm';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='m3.25 4.85.01 1.61h1.48l.011-.85.011-.85h14.476l.011.85.011.85h1.48l.01-1.61.011-1.61H3.239zm1.022 2.992a1 1 0 0 0-.257.221c-.222.291-.24.199.802 4.119.519 1.957.974 3.625 1.009 3.706.157.362.349.432 1.174.432s1.017-.071 1.174-.432c.13-.3 2.106-7.253 2.106-7.411a.73.73 0 0 0-.74-.717.77.77 0 0 0-.594.29c-.072.096-.338.962-1.011 3.3-.501 1.743-.923 3.156-.937 3.14-.013-.017-.389-1.407-.835-3.09s-.837-3.122-.869-3.199a.6.6 0 0 0-.354-.366.8.8 0 0 0-.668.007m8.428-.025a.86.86 0 0 0-.398.432c-.055.131-.062.588-.061 3.8.001 3.468.004 3.659.075 3.811.137.295.381.46.684.46a.67.67 0 0 0 .494-.193c.257-.243.244-.106.266-2.824l.02-2.478.806 1.098c.841 1.143.96 1.284 1.147 1.354a.74.74 0 0 0 .76-.15c.062-.059.476-.592.92-1.184l.807-1.077.02 2.457c.018 2.191.027 2.47.086 2.577.323.582 1.081.56 1.358-.04.071-.152.074-.338.072-3.78-.002-2.676-.014-3.654-.049-3.75a.77.77 0 0 0-.713-.49c-.378 0-.399.022-1.735 1.803-.677.902-1.246 1.634-1.264 1.628s-.548-.713-1.178-1.571-1.202-1.621-1.271-1.695a1 1 0 0 0-.255-.19.86.86 0 0 0-.591.002M3.24 19.16v1.6h17.52v-3.2h-1.52v1.68H4.76v-1.68H3.24z' />
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
export default VmSVG;
