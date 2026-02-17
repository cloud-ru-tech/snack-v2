// DO NOT EDIT IT MANUALLY

import { forwardRef } from 'react';
import type { Ref } from 'react';
import type { ISvgIconProps } from '../../../../../../types';

const PurchasesSVG = forwardRef(({ size = 24, ...props }: ISvgIconProps, ref: Ref<SVGSVGElement>) => {
  const testId = '-purchases';
  const isCustomSize = typeof size === 'number';
  const sizePx = isCustomSize ? size : 24;
  const children = (
    <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} fill='none' {...props}>
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M3.24 12v8.76h17.52V3.24H3.24zm16-5.291v1.948l-.223-.218c-.273-.268-.579-.716-.701-1.027-.078-.197-.092-.308-.094-.742a19.23 19.23 0 0 0-.005-.51l-1.363-.3c-.078-.018-.09.005-.13.234-.168.965.099 1.985.746 2.846l.21.28-5.486.01c-3.018.006-5.495.002-5.505-.008-.01-.009.018-.068.062-.13.349-.494.57-1.345.568-2.187 0-.368-.055-.979-.09-1.008a37.388 37.388 0 0 0-1.329.201l-.12.022v.73c0 .656-.009.757-.091.994-.154.445-.449.83-.791 1.032l-.138.081V4.76h14.48zm0 8.291v4.24H4.76v-8.48h14.48zm-10-1.91c.001 1.158.028 1.447.179 1.883.14.402.324.688.661 1.026.527.53 1.068.737 1.92.736.85-.001 1.405-.213 1.918-.731.34-.344.523-.63.663-1.031.151-.436.178-.725.179-1.883V12h-1.52v1.115c0 .907-.012 1.152-.063 1.31-.174.538-.574.815-1.177.815-.603 0-1.003-.277-1.177-.815-.051-.158-.063-.403-.063-1.31V12H9.24z'
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
export default PurchasesSVG;
