// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const AiConciergeSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-ai-concierge';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M7.09 4.43 3.24 6.697V17.76H10v-1.52H4.76l.001-4.35V7.54l3.12-1.834L11 3.873l3.119 1.833 3.12 1.834v.73l.001.73h1.52V6.696l-3.856-2.268c-2.121-1.247-3.88-2.267-3.91-2.267-.03.001-1.787 1.022-3.904 2.269m.159 4.32.011.75h1.48l.011-.75.011-.75H7.238zm3 0 .011.75h1.48l.011-.75.011-.75h-1.524zm3 0 .011.75h1.48l.011-.75.011-.75h-1.524zm2.49 1.53q-1.699.148-2.94 1.397c-.598.601-.958 1.194-1.24 2.038a5.1 5.1 0 0 0-.292 1.805c-.001.67.069 1.057.336 1.859l.164.495-1.136 1.393a98 98 0 0 0-1.167 1.445c-.041.069 7.232.045 7.575-.025.913-.187 1.933-.626 2.561-1.101 1.545-1.168 2.289-2.768 2.122-4.564-.078-.833-.228-1.4-.527-1.997-.244-.484-.453-.77-.872-1.19-.92-.924-2.147-1.445-3.665-1.554a14 14 0 0 0-.578-.035 10 10 0 0 1-.341.034m-8.49 1.47.011.75h1.48l.011-.75.011-.75H7.238zm9.762.069c.471.071.756.15 1.129.311 1.06.457 1.767 1.313 2.007 2.43.101.469.101 1.433.001 1.8-.352 1.291-1.5 2.344-3.021 2.771-.294.083-.399.087-2.422.1l-2.115.013.175-.219c.096-.12.322-.397.502-.616l.327-.398-.143-.235a5.2 5.2 0 0 1-.556-1.277c-.098-.359-.109-.464-.108-1.039.001-.527.016-.697.087-.96.383-1.423 1.343-2.409 2.606-2.678.347-.074 1.049-.075 1.531-.003m.229 3.801v.62H16v1.52h2.76V15h-1.52z'
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
export default AiConciergeSVG;
