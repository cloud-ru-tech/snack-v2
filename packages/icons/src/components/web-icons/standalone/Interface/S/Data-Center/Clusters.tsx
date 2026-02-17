// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const ClustersSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-clusters';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.6 4.381 3.22 6.915v10.174l4.39 2.535 4.389 2.534 4.391-2.534 4.39-2.535V6.916l-4.395-2.538a1061.608 1061.608 0 0 0-4.4-2.534zM15.677 5.7l3.603 2.08V16.223l-3.617 2.088C13.673 19.46 12.025 20.4 12 20.4c-.026 0-1.674-.94-3.663-2.089L4.72 16.223V7.78l3.61-2.088c1.986-1.149 3.64-2.085 3.678-2.08.037.004 1.688.944 3.669 2.088M9.49 7.69 7 9.133V14.872l2.5 1.442 2.5 1.443 2.5-1.443 2.5-1.442v-5.74l-2.486-1.436a314.67 314.67 0 0 0-2.51-1.442c-.013-.003-1.144.643-2.514 1.436M13.776 9l1.701.98.001 2.02.001 2.02-1.662.96c-.914.528-1.703.976-1.752.995-.076.03-.365-.123-1.817-.96l-1.727-.995.001-2.02.001-2.02 1.708-.988c.94-.544 1.739-.985 1.776-.98.037.004.833.449 1.769.988'
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
export default ClustersSVG;
