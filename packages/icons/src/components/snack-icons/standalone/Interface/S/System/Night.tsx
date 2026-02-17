// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const NightSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-night';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.74 4.267c-1.098.052-2.138.333-3.179.86a7.817 7.817 0 0 0-3.05 2.709 7.577 7.577 0 0 0 .044 8.428c1.006 1.496 2.377 2.529 4.105 3.094 1.77.578 3.666.51 5.432-.194 1.786-.713 3.324-2.171 4.147-3.933.138-.296.481-1.254.481-1.345 0-.032-1.09-.705-1.188-.734-.024-.006-.169.083-.322.198-.571.433-1.17.712-1.93.9-.464.115-1.461.124-1.96.017-1.467-.314-2.636-1.186-3.291-2.454-.327-.633-.442-1.024-.512-1.749-.104-1.07.177-2.129.813-3.057.266-.39.766-.891 1.14-1.145.16-.108.29-.221.29-.251 0-.077-.273-1.172-.32-1.281-.041-.096-.031-.095-.7-.063M9.967 6.345C9.6 6.897 9.253 7.737 9.1 8.44c-.089.411-.124 1.541-.063 2.011.323 2.467 2.119 4.509 4.563 5.187 1.046.29 2.451.275 3.44-.035.143-.045.275-.082.292-.082.067-.002-.361.512-.732.879a6.19 6.19 0 0 1-1.66 1.179 5.844 5.844 0 0 1-1.557.55c-.344.075-.53.088-1.263.088-.75.001-.914-.01-1.28-.09-1.283-.28-2.367-.86-3.236-1.731-1.127-1.129-1.759-2.544-1.833-4.1-.091-1.923.726-3.754 2.247-5.033a6.795 6.795 0 0 1 1.252-.82c.324-.164.819-.366.842-.344.006.006-.059.117-.145.246'
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
export default NightSVG;
