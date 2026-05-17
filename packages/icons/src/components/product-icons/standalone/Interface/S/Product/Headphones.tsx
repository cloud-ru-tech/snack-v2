// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const HeadphonesSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-headphones';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M11.34 3.28c-3.109.223-5.933 2.157-7.259 4.971a9.4 9.4 0 0 0-.747 2.429c-.064.382-.071.859-.084 5.25l-.013 4.83H9.24v-7.52H4.751l.02-1.09c.013-.754.039-1.193.083-1.424.289-1.517.943-2.768 2.004-3.828 1.77-1.77 4.218-2.494 6.692-1.978 2.187.456 4.143 2.041 5.06 4.1.48 1.077.592 1.643.619 3.13l.02 1.09H15.24v7.52h5.52v-4.55c0-2.858-.016-4.721-.042-5.01a8.6 8.6 0 0 0-2.495-5.344c-.778-.779-1.406-1.23-2.363-1.699a8.75 8.75 0 0 0-4.52-.877M7.76 17v2.24h-3v-4.48h3zm11.48 0v2.24h-2.48v-4.48h2.48z'
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
export default HeadphonesSVG;
