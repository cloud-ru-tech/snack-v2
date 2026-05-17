// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const LikeOutlineSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-like-outline';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.002 3.33c-.019.05-.81 1.845-1.757 3.99l-1.722 3.9-2.142.01-2.141.011v9.519h7.062c7.948 0 7.383.022 8.058-.308.327-.159.434-.239.762-.568.326-.327.41-.44.569-.764.102-.209.222-.515.267-.68.111-.415.817-7.862.781-8.24q-.148-1.517-1.468-1.867c-.214-.056-.567-.068-2.378-.082l-2.127-.017-.016-1.367c-.017-1.514-.021-1.541-.301-2.087-.102-.197-.247-.383-.491-.626-.29-.29-.407-.376-.722-.528-.207-.1-.49-.21-.629-.246-.274-.069-.913-.136-1.318-.139-.224-.001-.255.009-.287.089m1.518 1.615c.256.115.49.328.613.555.086.157.087.195.098 2.21l.012 2.05 2.788.002c2.051.002 2.826.015 2.929.05.176.06.28.255.28.526 0 .207-.661 7.34-.703 7.58-.08.465-.427.964-.822 1.183l-.215.119-4.37.011-4.37.01v-7.103l1.563-3.539c.859-1.946 1.588-3.6 1.619-3.673.055-.128.066-.134.208-.108.082.015.249.072.37.127M7.24 16v3.24H4.76v-6.48h2.48z'
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
export default LikeOutlineSVG;
