// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SwitchSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-switch';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M4.47 4.47 3.24 5.7v12.6l1.23 1.23 1.23 1.23h12.6l1.23-1.23 1.23-1.23V5.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769v7.36l-.451-.45-.45-.449H5.661l-.45.449-.451.45V6.301l.77-.771.769-.77h11.4zm-.02 9.5.79.789v1.882l-.77.769-.771.77H6.301l-.771-.77-.77-.769v-1.88l.79-.791.789-.79h11.32zM6.498 16.291c-.011.029-.015.366-.009.75l.011.699.75.011.75.011V16.24h-.741c-.567 0-.746.012-.761.051m3 0c-.011.029-.015.366-.009.75l.011.699.75.011.75.011V16.24h-.741c-.567 0-.746.012-.761.051M13 17v.762l.75-.011.75-.011v-1.48l-.75-.011-.75-.011zm3 0v.762l.75-.011.75-.011v-1.48l-.75-.011-.75-.011z'
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
export default SwitchSVG;
