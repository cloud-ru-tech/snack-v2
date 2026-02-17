// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const MobilePhoneSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-mobile-phone';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.47 4.47 5.24 5.7v12.6l1.23 1.23 1.23 1.23h8.6l1.23-1.23 1.23-1.23V5.714l-1.21-1.237-1.209-1.237H7.7zm10.012 1.06.754.77.002 5.7.002 5.699-.77.771-.769.77H8.299l-.769-.77-.77-.771V6.301l.77-.771.769-.77h7.429zM9 7v.76h6V6.24H9zm2 10v.76h2v-1.52h-2z'
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
export default MobilePhoneSVG;
