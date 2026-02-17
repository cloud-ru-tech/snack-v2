// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const SearchSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-search';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M9.892 3.283C7.634 3.456 5.541 4.75 4.31 6.731c-.459.739-.824 1.732-.974 2.649-.099.598-.099 1.642 0 2.24a7.295 7.295 0 0 0 4.889 5.761 7.245 7.245 0 0 0 6.54-1.026c.146-.107.281-.195.3-.195.019 0 1.021.986 2.227 2.19l2.192 2.19.515-.54.516-.54-2.195-2.2-2.194-2.2.158-.2c.246-.31.574-.854.776-1.286a7.203 7.203 0 0 0-1.443-8.191 7.155 7.155 0 0 0-4.577-2.102c-.551-.043-.564-.043-1.148.002m1.768 1.59a5.77 5.77 0 0 1 4.491 4.587c.093.493.093 1.587 0 2.08a5.802 5.802 0 0 1-2.848 3.975c-1.7.969-3.906.969-5.606 0a5.796 5.796 0 0 1-2.824-3.847c-.118-.544-.129-1.704-.022-2.235a5.788 5.788 0 0 1 1.591-2.991c.931-.93 1.98-1.439 3.418-1.657.294-.045 1.449.012 1.8.088'
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
export default SearchSVG;
