// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const BrouserGeerSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-brouser-geer';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path d='M4.47 4.47 3.24 5.7v4.06h16v7.941l-.77.769-.77.769-2.1.011-2.1.01v1.48l2.399.01 2.4.011 1.23-1.23L20.76 18.3V5.7l-1.23-1.23-1.23-1.23H5.7zm14 1.06.77.769V8.24H4.76V6.301l.77-.771.769-.77h11.4zM4.945 11.97c-1.046 1.643-2.824 4.533-2.809 4.567.011.023.674 1.087 1.473 2.363l1.454 2.32h4.874l1.473-2.356c.811-1.297 1.465-2.377 1.454-2.4s-.674-1.088-1.473-2.364l-1.454-2.32-2.429-.01-2.429-.011zm5.138 2.88c.554.886 1.008 1.628 1.008 1.65s-.454.765-1.008 1.65l-1.009 1.61H5.926l-1.009-1.61c-.554-.885-1.008-1.628-1.008-1.65s.454-.764 1.008-1.65l1.009-1.61h3.148zm-2.841.435c-.39.065-.765.354-.962.74-.086.167-.1.249-.1.575 0 .446.083.656.375.948.215.216.395.31.71.372.432.085.858-.049 1.18-.372.243-.243.362-.501.386-.832.037-.521-.168-.947-.593-1.231-.214-.143-.302-.172-.678-.223a1.5 1.5 0 0 0-.318.023' />
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
export default BrouserGeerSVG;
