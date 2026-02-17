// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BankCardSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-bank-card';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 5.47 3.24 6.7v10.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V6.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769V9.24H4.76V7.301l.77-.771.769-.77h11.4zm.77 7.2v2.971l-.77.769-.771.77h-11.4l-.769-.77-.77-.771V10.76h14.48zm-8.742 1.561c-.011.029-.015.366-.009.75l.011.699.75.011.75.011V15.24h-.741c-.567 0-.746.012-.761.051m3 0c-.011.029-.015.366-.009.75l.011.699.75.011.75.011V15.24h-.741c-.567 0-.746.012-.761.051m3 0c-.011.029-.015.366-.009.75l.011.699.75.011.75.011V15.24h-.741c-.567 0-.746.012-.761.051'
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
export default BankCardSVG;
