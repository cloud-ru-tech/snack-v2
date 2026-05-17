// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const EducationSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-education';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.78 6.26C3.942 7.965 1.615 9.374 1.61 9.39c-.006.017.804.537 1.8 1.157l1.81 1.127.02 2.511.02 2.511 3.36 2.091A380 380 0 0 0 12 20.878c.011 0 1.532-.941 3.38-2.091l3.36-2.091.02-2.514.02-2.514.72-.451.72-.451.02 4.127.02 4.127h1.48l.01-4.607.01-4.607.341-.209.341-.209-5.171-3.1c-2.844-1.704-5.207-3.105-5.251-3.113-.052-.01-1.918 1.089-5.24 3.085m9.002.886a392 392 0 0 1 3.769 2.274c-.006.005-1.707 1.066-3.781 2.358L12 14.128l-3.779-2.353c-2.326-1.447-3.761-2.364-3.73-2.382L8.26 7.125a1951 1951 0 0 1 3.731-2.242c.007-.001 1.712 1.017 3.791 2.263M9.44 14.302c1.375.855 2.527 1.555 2.56 1.555s1.203-.712 2.6-1.582l2.59-1.611c.04-.023.05.305.05 1.585v1.614l-2.62 1.63-2.62 1.63-2.62-1.63-2.62-1.63v-3.232l.09.058z'
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
export default EducationSVG;
