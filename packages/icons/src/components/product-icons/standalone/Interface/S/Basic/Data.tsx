// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const DataSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-data';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.328 6.299a537.379 537.379 0 0 0-4.62 3.197c-.005.012.793.573 1.772 1.246s1.785 1.237 1.791 1.253c.006.017-.79.614-1.768 1.328-.979.713-1.776 1.31-1.771 1.327.011.04 9.219 6.23 9.268 6.23.05 0 9.257-6.191 9.267-6.23.004-.017-.792-.615-1.769-1.33-.976-.715-1.772-1.312-1.767-1.328.005-.015.803-.573 1.774-1.24.97-.666 1.763-1.23 1.761-1.252-.005-.052-9.21-6.381-9.276-6.377-.027.001-2.126 1.431-4.662 3.176m7.989.892c1.813 1.248 3.298 2.287 3.299 2.309.003.049-6.582 4.583-6.633 4.567-.106-.033-6.617-4.533-6.608-4.567.011-.037 6.581-4.577 6.625-4.577.011 0 1.504 1.021 3.317 2.268M9.8 14.4c1.184.814 2.174 1.48 2.2 1.48.026 0 1.018-.668 2.205-1.484s2.182-1.474 2.211-1.463c.072.028 2.242 1.628 2.252 1.661.012.039-6.598 4.463-6.668 4.463-.058 0-6.675-4.417-6.677-4.457-.001-.027 2.248-1.674 2.291-1.677.018-.002 1.002.663 2.186 1.477'
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
export default DataSVG;
