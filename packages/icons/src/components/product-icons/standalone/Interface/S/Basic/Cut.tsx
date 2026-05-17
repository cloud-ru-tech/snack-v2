// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const CutSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-cut';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M6.096 3.28c-.398.043-.699.138-1.116.352-.291.149-.434.258-.744.566-.433.431-.655.772-.818 1.26a3.3 3.3 0 0 0 .271 2.682c.214.367.804.957 1.171 1.171.925.542 2.135.583 3.085.105l.273-.137 1.361 1.36L10.94 12l-1.364 1.364-1.363 1.363-.291-.146c-.457-.23-.814-.307-1.422-.307-.637 0-.98.08-1.511.353-.3.154-.441.261-.753.571-.432.43-.655.772-.816 1.257a3.3 3.3 0 0 0 .269 2.685c.214.367.804.957 1.171 1.171a3.3 3.3 0 0 0 3.28 0c.367-.214.957-.804 1.171-1.171.542-.925.583-2.135.105-3.085l-.137-.273 1.36-1.361L12 13.06l3.73 3.73 3.73 3.73.53-.53.53-.53-5.621-5.621-5.62-5.621.137-.273c.377-.749.437-1.672.162-2.498-.16-.478-.383-.821-.814-1.247-.307-.303-.458-.418-.75-.571a3.34 3.34 0 0 0-1.918-.349M16.47 6.47l-2.99 2.991.53.529.531.53 2.999-3 2.999-3L20.02 4a10 10 0 0 0-.54-.52c-.011 0-1.366 1.346-3.01 2.99M6.946 4.816A1.744 1.744 0 0 1 8.239 6.5q0 .69-.483 1.2a1.726 1.726 0 0 1-2.512 0C4.196 6.592 4.957 4.782 6.48 4.764a2 2 0 0 1 .466.052m0 11A1.744 1.744 0 0 1 8.239 17.5q0 .69-.483 1.2a1.726 1.726 0 0 1-2.512 0c-1.048-1.108-.287-2.918 1.236-2.936a2 2 0 0 1 .466.052'
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
export default CutSVG;
