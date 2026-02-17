// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PlaceholderSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-placeholder';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.76 2.508c-.671.046-1.271.252-1.88.644-.24.154-6.23 6.099-6.558 6.508a3.612 3.612 0 0 0-.816 2.36c.004.875.276 1.647.816 2.32.273.341 6.256 6.297 6.498 6.469.637.453 1.37.683 2.18.683s1.543-.23 2.18-.683c.242-.172 6.225-6.128 6.498-6.469.547-.682.814-1.45.814-2.34 0-.89-.267-1.658-.814-2.34-.328-.409-6.318-6.354-6.558-6.508-.739-.476-1.557-.699-2.36-.644m.703 1.535c.13.023.372.107.537.186.291.139.399.243 3.464 3.307 3.064 3.065 3.168 3.173 3.307 3.464a2.28 2.28 0 0 1 0 2c-.139.29-.244.4-3.307 3.466-3.089 3.091-3.171 3.169-3.464 3.306A2.133 2.133 0 0 1 12 20c-.374 0-.644-.061-1-.228-.293-.137-.375-.215-3.464-3.306C4.473 13.4 4.368 13.29 4.229 13a2.28 2.28 0 0 1 0-2c.139-.291.243-.399 3.307-3.464C10.596 4.477 10.71 4.368 11 4.228a2.344 2.344 0 0 1 1.463-.185'
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
export default PlaceholderSVG;
