// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const TapeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-tape';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm16 0v7.24H4.76V4.76h14.48zM7.969 9.019c-.764.172-1.569.82-1.926 1.55-.361.74-.38 1.713-.047 2.448a2.92 2.92 0 0 0 2.23 1.703c.183.029 1.503.039 3.994.03 3.26-.012 3.745-.021 3.92-.077.622-.197.943-.389 1.36-.814.332-.339.543-.681.688-1.119.095-.283.107-.384.109-.88.003-.479-.011-.604-.09-.86-.305-.979-1.174-1.783-2.145-1.984-.466-.096-1.135-.062-1.571.08-.423.137-.845.42-1.208.809-.806.863-.983 2.101-.466 3.265.03.065-.022.07-.773.07-.442 0-.804-.01-.804-.021s.044-.125.097-.252a2.9 2.9 0 0 0-.546-3.069 2.96 2.96 0 0 0-1.186-.792c-.304-.106-.407-.122-.865-.132-.344-.008-.605.007-.771.045m1.282 1.569c.299.134.592.449.71.762.119.319.1.778-.046 1.09a1.396 1.396 0 0 1-2.038.562c-.245-.168-.496-.498-.563-.74a2 2 0 0 1-.044-.45c.001-.236.022-.334.12-.54.343-.722 1.131-1.011 1.861-.684m6.451-.104c.431.079.787.362.986.784.097.204.118.3.119.547.001.355-.05.532-.236.814a1.386 1.386 0 0 1-2.124.209c-.273-.274-.378-.517-.398-.918-.014-.282-.001-.38.073-.578a1.44 1.44 0 0 1 1.012-.86c.238-.047.303-.047.568.002'
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
export default TapeSVG;
